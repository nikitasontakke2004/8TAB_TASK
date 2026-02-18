package com.mednet.servlet;

import com.mednet.dao.PrefixDAO;
import com.mednet.model.Prefix;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;
import java.io.*;
import java.util.Iterator;
import java.util.List;


@MultipartConfig
public class ExcelServlet extends HttpServlet {
    private PrefixDAO dao = new PrefixDAO();

    // doget=Exports data from Database to Excel (Download).
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter("action");
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Prefixes");


        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Prefix");
        header.createCell(1).setCellValue("Gender");
        header.createCell(2).setCellValue("PrefixOf");

        if ("download".equals(action)) {
            List<Prefix> list = dao.list();
            int rowNum = 1;
            for (Prefix p : list) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(p.getPrefix());
                row.createCell(1).setCellValue(p.getGender());
                row.createCell(2).setCellValue(p.getPrefixOf());
            }
        }

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=PrefixData.xlsx");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        workbook.close();
        out.close();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try {
            // Get the file from request
            Part filePart = request.getPart("excelFile"); // JS mein jo name diya hai
            InputStream fileContent = filePart.getInputStream();

            Workbook workbook = new XSSFWorkbook(fileContent);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            // Skip Header Row
            if (rowIterator.hasNext()) rowIterator.next();

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Prefix p = new Prefix();

                // Excel se data nikalna
                p.setPrefix(row.getCell(0).getStringCellValue());
                p.setGender(row.getCell(1).getStringCellValue());
                p.setPrefixOf(row.getCell(2).getStringCellValue());

                // Database mein save karna
                dao.save(p);
            }
            workbook.close();
            // ExtJS expects a JSON success response
            out.write("{ \"success\": true, \"message\": \"Excel uploaded successfully\" }");
        } catch (Exception e) {
            e.printStackTrace();
            out.write("{ \"success\": false, \"message\": \"Error: " + e.getMessage() + "\" }");
        }
    }
}
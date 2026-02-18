package com.mednet.servlet;

import java.io.*;

public class PDFService {

    public String generatePrefixPDF(String htmlContent) {
        File tempFile = null;
        try {

            String home = System.getProperty("user.home");
            String outputPath = home + File.separator + "Downloads" + File.separator + "PrefixReport.pdf";


            String scriptPath = "C:\\Users\\nikit\\Desktop\\7TAB\\Task\\src\\main\\resources\\generatePDF.js";
            String nodeCommand = "node";


            tempFile = File.createTempFile("pdf_template_", ".html");
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(tempFile))) {
                writer.write(htmlContent);
            }


            ProcessBuilder pb = new ProcessBuilder(nodeCommand, scriptPath, tempFile.getAbsolutePath(), outputPath);
            pb.redirectErrorStream(true);
            Process p = pb.start();


            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println("Node Output: " + line);
                    output.append(line);
                }
            }

            int exitCode = p.waitFor();

            if (exitCode == 0 && output.toString().contains("PDF_GENERATION_SUCCESS")) {
                return "Success! PDF saved in Downloads: " + outputPath;
            } else {
                return "Puppeteer Failed. Console Error: " + output.toString();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        } finally {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }
    }
}
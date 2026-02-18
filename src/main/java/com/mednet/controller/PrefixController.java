package com.mednet.controller;

import com.mednet.dao.PrefixDAO;
import com.mednet.model.Prefix;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/prefix") // tab6.js ke 'api/prefix/...' se match karne ke liye
public class PrefixController {

    private PrefixDAO dao = new PrefixDAO();

    // 1. List all records (JSON Array return karega)
    @GetMapping("/list")
    public List<Prefix> getPrefixes() {

        return dao.list(); // Jackson library ise automatically JSON bana degi
    }

    // 2. Save record (JSON Body receive karega)
    @PostMapping("/save")
    public String save(@RequestBody Prefix p) {

        dao.save(p);
        return "{\"success\": true}";
    }

    // 3. Delete record
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {
        dao.delete(id);
        return "{\"success\": true}";
    }
}
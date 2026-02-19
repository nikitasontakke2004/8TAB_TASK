package com.mednet.controller;

import com.mednet.model.Prefix;
import com.mednet.service.PrefixService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/prefix")
public class PrefixController {

    @Autowired // Automatically connects the PrefixService
    private PrefixService prefixService;

    // 1. List all records
    @GetMapping("/list")
    public List<Prefix> getPrefixes() {
        return prefixService.getAllPrefixes(); // Controller -> Service
    }

    // 2. Save record
    @PostMapping("/save")
    public String save(@RequestBody Prefix p) {
        prefixService.savePrefix(p); // Controller -> Service
        return "{\"success\": true}";
    }

    // 3. Delete record
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {
        prefixService.deletePrefix(id); // Controller -> Service
        return "{\"success\": true}";
    }
}

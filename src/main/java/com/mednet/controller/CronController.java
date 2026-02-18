package com.mednet.controller;

import com.mednet.service.DynamicJobService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.List; // Added missing import for the logs endpoint

@RestController
@RequestMapping("/api/cron") // Base path: /Task/api/cron
public class CronController {
    private final DynamicJobService dynamicJobService;

    public CronController(DynamicJobService dynamicJobService) {
        this.dynamicJobService = dynamicJobService;
    }

    @PostMapping("/schedule")
    public ResponseEntity<Map<String, Object>> schedule(@RequestBody Map<String, String> payload) {
        try {
            String cron = payload.get("cron");
            String message = payload.get("message");

            // Basic validation
            if (cron == null || cron.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Cron expression is empty"));
            }

            // Triggers the service logic to schedule and print to terminal
            dynamicJobService.scheduleATask("userJob1", message, cron);

            return ResponseEntity.ok(Map.of("success", true, "cron", cron));
        } catch (Exception e) {
            // Returns 500 if the cron format is invalid (e.g., missing 6th field)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/stop")
    public ResponseEntity<Map<String, Object>> stop() {
        dynamicJobService.stopTask("userJob1"); // Cancels the background thread
        return ResponseEntity.ok(Map.of("success", true, "message", "Task Stopped"));
    }

    @GetMapping("/logs")
    public ResponseEntity<List<Map<String, String>>> getLogs() {
        // Returns the list of execution timestamps and messages to the UI Grid
        return ResponseEntity.ok(dynamicJobService.getLogs());
    }
}
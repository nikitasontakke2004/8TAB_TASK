package com.mednet.service;

import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.CronTrigger; // The required trigger class
import java.util.concurrent.ScheduledFuture;
import java.util.*;
import java.text.SimpleDateFormat;

public class DynamicJobService {
    private final TaskScheduler taskScheduler;
    private final Map<String, ScheduledFuture<?>> scheduledTasks = new HashMap<>();
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private final List<Map<String, String>> executionLogs = Collections.synchronizedList(new ArrayList<>());

    public DynamicJobService(TaskScheduler taskScheduler) {
        this.taskScheduler = taskScheduler;
    }

    public void scheduleATask(String jobId, String message, String cronExpression) {
        stopTask(jobId); // Clean up previous trigger before starting new one

        try {
            // Using CronTrigger to handle 6-field expressions like */5 * * * * *
            CronTrigger trigger = new CronTrigger(cronExpression);

            ScheduledFuture<?> task = taskScheduler.schedule(() -> {
                String timestamp = dateFormat.format(new Date());
                String content = (message != null ? message : "Hello World");

                // Print to Terminal
                System.out.println("TERMINAL LOG: " + timestamp + " - " + content);
                System.out.flush();

                // Save for Screen Grid
                Map<String, String> entry = new HashMap<>();
                entry.put("timestamp", timestamp);
                entry.put("message", content);
                executionLogs.add(0, entry);

            }, trigger); // Apply the trigger here

            scheduledTasks.put(jobId, task);
            System.out.println("SUCCESS: CronTrigger activated for: " + cronExpression);

        } catch (IllegalArgumentException e) {
            System.err.println("CRON ERROR: Invalid expression. Ensure 6 fields are used.");
            throw e;
        }
    }

    public List<Map<String, String>> getLogs() {
        return new ArrayList<>(executionLogs);
    }

    public void stopTask(String jobId) {
        if (scheduledTasks.containsKey(jobId)) {
            scheduledTasks.get(jobId).cancel(true);
            scheduledTasks.remove(jobId);
            System.out.println("STOPPED: CronTrigger for '" + jobId + "' cancelled.");
        }
    }
}
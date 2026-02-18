var tab8 = Ext.create('Ext.panel.Panel', {
    title: 'Dynamic Cron Scheduler',
    layout: { type: 'hbox', align: 'stretch' },
    bodyPadding: 20,
    items: [
        {
            xtype: 'form',
            title: 'Basic Cron Configuration',
            flex: 1,
            margin: '0 10 0 0',
            bodyPadding: 15,
            frame: true,
            id: 'cronForm',
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Current Expression',
                    id: 'currentExpLabel',
                    value: 'None',
                    fieldStyle: 'font-weight: bold; color: #2c3e50; background-color: #e8f8f5; padding: 5px; border-radius: 4px;'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'CRON EXPRESSION',
                    name: 'cronExp',
                    id: 'cronInput',
                    emptyText: 'e.g., */5 * * * * *',
                    width: '100%',
                    labelAlign: 'top',
                    margin: '20 0 20 0'
                }
            ],
            buttons: [
                {
                    text: 'Clear',
                    style: 'background-color: #f0ad4e; color: white;', // Orange color
                    handler: function(btn) {
                        // Reliable way to reset the specific form fields
                        var form = btn.up('form').getForm();
                        form.reset();
                    }
                },
                {
                    text: 'Stop Schedule',
                    style: 'background-color: #d9534f; color: white;', // Red color
                    handler: function() {
                        tab8.getEl().mask('Stopping...');

                        Ext.Ajax.request({
                            url: 'api/cron/stop', // Calls CronController @PostMapping("/stop")
                            method: 'POST',
                            success: function(response) {
                                tab8.getEl().unmask();
                                Ext.getCmp('currentExpLabel').setValue('None');
                                Ext.toast('Schedule Stopped Successfully');
                            },
                            failure: function(response) {
                                tab8.getEl().unmask();
                                Ext.Msg.alert('Error', 'Failed to stop task. Status: ' + response.status);
                            }
                        });
                    }
                },
                {
                    text: 'Update Schedule',
                    style: 'background-color: #5cb85c; color: white;', // Green color
                    handler: function() {
                        var cronValue = Ext.getCmp('cronInput').getValue();
                        if(!cronValue) {
                            Ext.Msg.alert('Warning', 'Please enter a cron expression.');
                            return;
                        }

                        tab8.getEl().mask('Scheduling...');

                        Ext.Ajax.request({
                            url: 'api/cron/schedule', // Calls CronController @PostMapping("/schedule")
                            method: 'POST',
                            jsonData: {
                                cron: cronValue,
                                message: 'Hello World'
                            },
                            success: function(response) {
                                tab8.getEl().unmask();
                                Ext.getCmp('currentExpLabel').setValue(cronValue);
                                Ext.toast('Schedule Active!');
                            },
                            failure: function(response) {
                                tab8.getEl().unmask();
                                Ext.Msg.alert('Error', 'Failed to schedule. Status: ' + response.status);
                            }
                        });
                    }
                }
            ]
        },
        {
            xtype: 'grid',
            title: 'Hello World Log',
            flex: 1,
            id: 'logGrid',
            frame: true,
            store: Ext.create('Ext.data.Store', {
                fields: ['timestamp', 'message'],
                proxy: {
                    type: 'ajax',
                    url: 'api/cron/logs', // Calls CronController @GetMapping("/logs")
                    reader: {
                        type: 'json'
                    }
                },
                autoLoad: true
            }),
            columns: [
                { text: 'Timestamp', dataIndex: 'timestamp', width: 180 },
                { text: 'Message', dataIndex: 'message', flex: 1 }
            ],
            listeners: {
                render: function(grid) {
                    // Task to refresh the screen grid every 3 seconds to show background prints
                    var task = {
                        run: function() {
                            grid.getStore().load();
                        },
                        interval: 3000 // 3 seconds
                    };
                    Ext.TaskManager.start(task);
                }
            }
        }
    ]
});
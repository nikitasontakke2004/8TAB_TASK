var tab6 = Ext.create('Ext.panel.Panel', {
    title: 'Entry Screen (Web Service)',
    layout: 'border',
    refreshGrid: function() {
        var jsonPanel = Ext.getCmp('liveJsonPanel');

        Ext.Ajax.request({
            url: 'api/prefix/list',
            method: 'GET',
            success: function(response) {
                var data = Ext.decode(response.responseText);

                if (jsonPanel) {
                    var prettyJson = JSON.stringify(data, null, 4);
                    jsonPanel.update('<pre style="background: #1e1e1e; color: #82d8d8; padding: 15px; border-radius: 5px; font-family: monospace; overflow: auto; height: 100%; margin: 0; line-height: 1.5;">' +
                                     prettyJson + '</pre>');
                }
            },
            failure: function(response) {
                if (jsonPanel) {
                    jsonPanel.update('<div style="color:#ff6b6b; padding:15px; font-weight:bold;">' +
                                     'Status: ' + response.status + ' (Not Found)<br>' +
                                     'Check: http://localhost:8080/Task/api/prefix/list</div>');
                }
            }
        });
    },
    listeners: {
        render: function(panel) {
            panel.refreshGrid();
        }
    },
    items: [
        {
            xtype: 'form',
            region: 'north',
            cls: 'custom-form-panel',
            height: 130,
            bodyPadding: 20,
            layout: 'column',
            id: 'wsForm',
            defaults: {
                columnWidth: 0.23,
                margin: '0 10 0 0',
                labelAlign: 'top',
                cls: 'custom-field'
            },
            items: [
                {
                    xtype: 'combo', // Changed to combo
                    fieldLabel: 'Prefix',
                    name: 'prefix',
                    id: 'ws_prefix',
                    store: ['Mr.', 'Mrs.', 'Dr.'],
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    emptyText: 'Select Prefix'
                },
                {
                    xtype: 'combo', // Changed to combo
                    fieldLabel: 'Gender',
                    name: 'gender',
                    id: 'ws_gender',
                    store: ['Male', 'Female', 'Other'],
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    emptyText: 'Select Gender'
                },
                {
                    xtype: 'combo', // Changed to combo
                    fieldLabel: 'Prefix Of',
                    name: 'prefixOf',
                    id: 'ws_prefixOf',
                    store: ['S/O', 'H/O', 'D/O', 'W/O', 'M/O', 'F/O'],
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    emptyText: 'Select Relation'
                },
                {
                    xtype: 'button',
                    text: 'Save via REST',
                    cls: 'custom-save-btn',
                    height: 35,
                    margin: '25 0 0 0',
                    handler: function() {
                        var me = this.up('panel').up('panel');
                        var params = {
                            prefix: Ext.getCmp('ws_prefix').getValue(),
                            gender: Ext.getCmp('ws_gender').getValue(),
                            prefixOf: Ext.getCmp('ws_prefixOf').getValue()
                        };

                        if(!params.prefix || !params.gender) {
                            Ext.Msg.alert('Required', 'Please select Prefix and Gender');
                            return;
                        }

                        Ext.Ajax.request({
                            url: 'api/prefix/save',
                            method: 'POST',
                            jsonData: params,
                            success: function() {
                                Ext.Msg.alert('Success', 'Data Saved and JSON View Updated');
                                Ext.getCmp('wsForm').getForm().reset();
                                me.refreshGrid();
                            }
                        });
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'center',
            title: 'Raw JSON Response from Server',
            id: 'liveJsonPanel',
            bodyStyle: 'background: #1e1e1e;',
            autoScroll: true,
            html: '<p style="color: white; padding: 10px;">Waiting for server response...</p>'
        }
    ]
});
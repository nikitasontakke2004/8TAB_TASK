// Tab5_Excel.js

var tab5 = Ext.create('Ext.panel.Panel', {
    title: 'Excel Operations',
    padding: 20,
    layout: 'vbox',
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 20 0',
            items: [
                {
                    xtype: 'button',
                    text: 'Download Data to Excel',
                    iconCls: 'x-fa fa-download',
                    handler: function() {
                        // Direct URL hit for download
                        window.location.href = 'ExcelServlet?action=download';
                    }
                },
                {
                    xtype: 'button',
                    text: 'Download Empty Template',
                    margin: '0 0 0 10',
                    handler: function() {
                        window.location.href = 'ExcelServlet?action=template';
                    }
                }
            ]
        },
        {
            xtype: 'form',
            title: 'Upload Excel File',
            width: 400,
            bodyPadding: 10,
            frame: true,
            items: [{
                xtype: 'filefield',
                name: 'excelFile',
                fieldLabel: 'Select Excel',
                labelWidth: 80,
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: 'Browse...'
            }],
            buttons: [{
                text: 'Upload and Refresh',
                handler: function() {
                    var form = this.up('form').getForm();
                    if(form.isValid()){
                        form.submit({
                            url: 'ExcelServlet?action=upload',
                            waitMsg: 'Uploading your excel...',
                            success: function(fp, o) {
                                Ext.Msg.alert('Success', 'Data imported and list refreshed.');
                                // Tab 4 ki grid ko refresh karne ki logic yahan call kar sakte ho
                                if(typeof tab4 !== 'undefined') {
                                    tab4.refreshGrid();
                                }
                            },
                            failure: function(fp, o) {
                                Ext.Msg.alert('Failure', 'Error processing Excel file.');
                            }
                        });
                    }
                }
            }]
        }
    ]
});
var tab7 = Ext.create('Ext.panel.Panel', {
    title: 'Puppeteer PDF Report',
    padding: 20,
    items: [
        {
            xtype: 'displayfield',
            value: 'Click the button below to generate a PDF report of all Prefixes '
        },
        {
            xtype: 'button',
            text: 'Generate PDF Report',
            scale: 'large',
            iconCls: 'x-fa fa-file-pdf',
            handler: function() {

                var htmlTable = "<h1>Prefix Master Report</h1><table border='1'><tr><th>Prefix</th><th>Gender</th><th>PrefixOf</th></tr>";

                PrefixService.getAllPrefixes(function(data) {
                    data.forEach(function(item) {
                        htmlTable += "<tr><td>"+item.prefix+"</td><td>"+item.gender+"</td><td>"+item.prefixOf+"</td></tr>";
                    });
                    htmlTable += "</table>";

                    // DWR call to Java to start Puppeteer
                    PDFService.generatePrefixPDF(htmlTable, function(msg) {
                        Ext.Msg.alert('PDF Status', msg);
                    });
                });
            }
        }
    ]
});
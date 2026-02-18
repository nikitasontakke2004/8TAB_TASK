var tab4 = Ext.create('Ext.panel.Panel', {
    title: 'Entry Screen',
    layout: 'border',
    // Local function grid for refresh (DWR Call)
    refreshGrid: function() {
        var grid = this.down('grid');
        PrefixService.getAllPrefixes(function(data) {
            grid.getStore().loadData(data);
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
            height: 130,
            bodyPadding: '20 20 10 20',
            id: 'prefixForm',
            cls: 'custom-form-panel',
            layout: 'column',
            defaults: {
                columnWidth: 0.22,
                margin: '0 15 0 0',
                labelAlign: 'top',
                cls: 'custom-field'
            },
            items: [
                {
                    xtype: 'combo', // Changed to combo
                    fieldLabel: 'Prefix',
                    name: 'prefix',
                    id: 'f_prefix',
                    store: ['Mr.', 'Mrs.', 'Dr.'], // Your requested options
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    emptyText: 'Select Prefix'
                },
                {
                    xtype: 'combo', // Changed to combo
                    fieldLabel: 'Gender',
                    name: 'gender',
                    id: 'f_gender',
                    store: ['Male', 'Female', 'Other'], // Your requested options
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    emptyText: 'Select Gender'
                },
                {
                    xtype: 'combo', // Changed to combo
                    fieldLabel: 'Prefix Of',
                    name: 'prefixOf',
                    id: 'f_prefixOf',
                    store: ['S/O', 'H/O', 'D/O', 'W/O', 'M/O', 'F/O'], // Your requested options
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    emptyText: 'Select Relation'
                },
                {
                    xtype: 'button',
                    text: 'Save Record',
                    cls: 'custom-save-btn',
                    height: 35,
                    margin: '25 0 0 10',
                    handler: function() {
                        var p = Ext.getCmp('f_prefix').getValue();
                        var g = Ext.getCmp('f_gender').getValue();
                        var po = Ext.getCmp('f_prefixOf').getValue();

                        if(!p || !g) {
                            Ext.Msg.alert('Required', 'Please select Prefix and Gender');
                            return;
                        }

                        // DWR Call to Save remains the same
                        PrefixService.savePrefix(p, g, po, function() {
                            Ext.Msg.alert('Success', 'Data Saved Successfully via DWR');
                            Ext.getCmp('prefixForm').getForm().reset();
                            Ext.getCmp('prefixForm').up('panel').refreshGrid();
                        });
                    }
                }
            ]
        },
        {
            xtype: 'grid',
            region: 'center',
            cls: 'custom-grid',
            margin: '10 0 0 0',
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'prefix', 'gender', 'prefixOf'],
                proxy: { type: 'memory' }
            }),
            columns: [
                { text: 'Prefix', dataIndex: 'prefix', flex: 1 },
                { text: 'Gender', dataIndex: 'gender', flex: 1 },
                { text: 'Prefix Of', dataIndex: 'prefixOf', flex: 1 },
                {
                    xtype: 'actioncolumn',
                    width: 60,
                    align: 'center',
                    items: [{
                        icon: 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete?', function(btn) {
                                if(btn === 'yes') {
                                    PrefixService.deletePrefix(rec.get('id'), function() {
                                        grid.up('panel').refreshGrid();
                                    });
                                }
                            });
                        }
                    }]
                }
            ]
        }
    ]
});
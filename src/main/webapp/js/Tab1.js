var tab1 = {
    title: 'Dropdown',
    xtype: 'panel',
    padding: 20,
    bodyPadding: 15,
    layout: {
        type: 'vbox',
        align: 'start'
    },
    items: [
        {
            xtype: 'label',
            html: '1. HTML Native Select Component',
            cls: 'tab-header-text' // Using CSS class instead of inline style
        },

        {
            // Native HTML select
            xtype: 'component',
            id: 'nativeHtmlSelect',
            autoEl: {
                tag: 'select',
                cls: 'custom-html-select', // Applied CSS class
                children: [
                    { tag: 'option', html: '-- Select Department --', value: '' },
                    { tag: 'option', html: 'CARDIOLOGY', value: 'CARD' },
                    { tag: 'option', html: 'NURSING', value: 'NUR' },
                    { tag: 'option', html: 'RADIOLOGY', value: 'RAD' },
                    { tag: 'option', html: 'PATHOLOGY', value: 'PATH' }
                ]
            },
            listeners: {
                render: function(c) {
                    c.getEl().on('change', function(e, select) {
                        var val = select.value;
                        if(val) {
                            Ext.Msg.alert('HTML Select', 'Native Value Selected: ' + val);
                        }
                    });
                }
            }
        },
        {
            xtype: 'component',
            cls: 'custom-divider' // Professional divider class
        },
        {
            xtype: 'label',
            html: '2. Ext JS Combo (with Search/Filter)',
            cls: 'tab-header-text'
        },
        {
            //  Ext JS combo with search/filtering
            xtype: 'combobox',
            fieldLabel: 'Search Dept',
            labelWidth: 100,
            width: 300,
            queryMode: 'local',
            anyMatch: true,
            typeAhead: true,
            forceSelection: true,
            emptyText: 'Type to search...',
            store: Ext.create('Ext.data.Store', {
                fields: ['abbr', 'name'],
                data: [
                    { abbr: 'CARD', name: 'CARDIOLOGY' },
                    { abbr: 'NUR',  name: 'NURSING' },
                    { abbr: 'RAD',  name: 'RADIOLOGY' },
                    { abbr: 'PATH', name: 'PATHOLOGY' },
                    { abbr: 'INS',  name: 'INSURANCE' },
                    { abbr: 'ULT',  name: 'ULTRASOUND' },
                    { abbr: 'ONCO', name: 'RADIATION ONCOLOGY' }
                ]
            }),
            displayField: 'name',
            valueField: 'abbr'
        }
    ]
};
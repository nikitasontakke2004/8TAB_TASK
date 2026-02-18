var tab3 = {
    title: 'List',
    xtype: 'panel',
    layout: 'fit',
    items: [{
        xtype: 'grid',
        id: 'patientGrid',
        scrollable: true,
        store: Ext.create('Ext.data.Store', {
            fields: ['name', 'code', 'type', 'phone', 'dept', 'status', 'joinDate'],
            pageSize: 15,
            data: [
                { name: 'Ms. ABEENA JOSEPH', code: 'M11352', type: 'Staff', phone: '9876543210', dept: 'NURSING', status: 'Confirmed', joinDate: '01-01-2022' },
                { name: 'Dr. ABHIJITH P B', code: 'M11326', type: 'Doctor', phone: '9447001122', dept: 'RADIATION ONCOLOGY', status: 'Confirmed', joinDate: '19-01-2022' },
                { name: 'Mr. ABHIJITH V P', code: 'S53011', type: 'Staff', phone: '8899776655', dept: 'OUTSOURCE MAINTENANCE', status: 'Trainee', joinDate: '-' },
                { name: 'Dr. ABHISHEK JAIN', code: 'S50001', type: 'Doctor', phone: '7766554433', dept: 'ULTRASOUND', status: 'Confirmed', joinDate: '01-01-2022' },
                { name: 'Dr. ABHISHEK VAIDYA', code: 'CONSAB3461', type: 'Consultant', phone: '9960880354', dept: 'SURGICAL ONCOLOGY', status: 'Confirmed', joinDate: '-' },
                { name: 'Mrs. ABIGAIL GUPTA', code: 't12345678', type: 'Consultant', phone: '1234123412', dept: 'NURSING', status: 'Regular', joinDate: '03-09-2023' },
                { name: 'Mr. ABIN DEV T', code: 'M11535', type: 'Staff', phone: '9000111222', dept: 'INSURANCE', status: 'Confirmed', joinDate: '05-08-2022' },
                { name: 'Mr. ABIN JOSE', code: '007', type: 'Staff', phone: '9111222333', dept: 'PHYSIOTHERAPY', status: 'Confirmed', joinDate: '15-07-2021' },
                { name: 'Dr. ABRAHAM KHAN', code: 'M11738', type: 'Staff', phone: '9555666777', dept: 'PATHOLOGY', status: 'Contract', joinDate: '01-02-2023' }
            ]
        }),

        tbar: [
            {
                xtype: 'textfield',
                id: 'filter_name',
                emptyText: 'Search Name',
                width: 150,
                enableKeyEvents: true,
                listeners: { keyup: function() { this.up('grid').applyFilters(); } }
            },
            {
                xtype: 'textfield',
                id: 'filter_code',
                emptyText: 'Search Code',
                width: 100,
                enableKeyEvents: true,
                listeners: { keyup: function() { this.up('grid').applyFilters(); } }
            },
            {
                xtype: 'textfield',
                id: 'filter_phone',
                emptyText: 'Search Phone',
                width: 120,
                enableKeyEvents: true,
                listeners: { keyup: function() { this.up('grid').applyFilters(); } }
            },
            {
                xtype: 'combobox',
                id: 'filter_type',
                emptyText: 'User Type',
                width: 110,
                store: ['Staff', 'Doctor', 'Consultant'],
                listeners: { change: function() { this.up('grid').applyFilters(); } }
            },
            {
                xtype: 'combobox',
                id: 'filter_dept',
                emptyText: 'Department',
                width: 150,
                store: ['NURSING', 'RADIATION ONCOLOGY', 'ULTRASOUND', 'INSURANCE', 'PHYSIOTHERAPY', 'PATHOLOGY', 'SURGICAL ONCOLOGY'],
                listeners: { change: function() { this.up('grid').applyFilters(); } }
            },
            {
                text: 'Reset',
                ui: 'soft-red',
                handler: function(btn) {
                    var grid = btn.up('grid');
                    Ext.getCmp('filter_name').reset();
                    Ext.getCmp('filter_code').reset();
                    Ext.getCmp('filter_phone').reset();
                    Ext.getCmp('filter_type').reset();
                    Ext.getCmp('filter_dept').reset();
                    grid.getStore().clearFilter();
                }
            }
        ],

        columns: [
            { text: 'Name', dataIndex: 'name', flex: 1 },
            { text: 'Code', dataIndex: 'code', width: 100 },
            { text: 'User Type', dataIndex: 'type', width: 100 },
            { text: 'PHONE', dataIndex: 'phone', width: 120 },
            { text: 'Department', dataIndex: 'dept', width: 150 },
            { text: 'Status', dataIndex: 'status', width: 100 }
        ],

        // Central Filtering Logic
        applyFilters: function() {
            var store = this.getStore(),
                name = Ext.getCmp('filter_name').getValue().toLowerCase(),
                code = Ext.getCmp('filter_code').getValue().toLowerCase(),
                phone = Ext.getCmp('filter_phone').getValue(),
                type = Ext.getCmp('filter_type').getValue(),
                dept = Ext.getCmp('filter_dept').getValue();

            store.clearFilter();

            store.filterBy(function(record) {
                var isMatch = true;

                if (name && record.get('name').toLowerCase().indexOf(name) === -1) isMatch = false;
                if (code && record.get('code').toLowerCase().indexOf(code) === -1) isMatch = false;
                if (phone && record.get('phone').indexOf(phone) === -1) isMatch = false;
                if (type && record.get('type') !== type) isMatch = false;
                if (dept && record.get('dept') !== dept) isMatch = false;

                return isMatch;
            });
        },

        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2}'
        }
    }]
};
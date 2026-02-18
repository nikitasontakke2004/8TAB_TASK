// New app.js (Ext JS Entry Point)
Ext.application({
    name: 'MedNet',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                xtype: 'tabpanel',
                items: [tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8] // Add your tab variables here
            }]
        });
    }
});
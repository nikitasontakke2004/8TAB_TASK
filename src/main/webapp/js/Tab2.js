var tab2 = {
    title: 'Pop-Up',
    xtype: 'panel',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [{
        xtype: 'button',
        text: 'Patient Details',
        scale: 'large',
        ui: 'default-toolbar',
        width: 200,
        height: 60,
        style: {
            border: '2px solid #157fcc',
            borderRadius: '5px'
        },
        handler: function() {
            var win = Ext.create('Ext.window.Window', {
                title: 'Patient Details',
                width: 850,
                height: 700,
                modal: true,
                maximizable: true,
                layout: 'fit',
                constrain: true,
                closeAction: 'destroy',
                items: [{
                    xtype: 'form',
                    bodyPadding: 15,
                    scrollable: true,
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelAlign: 'top',
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'column',
                            defaults: {
                                columnWidth: 0.5,
                                margin: '0 10 10 0',
                                xtype: 'textfield',
                                labelAlign: 'top'
                            },
                            items: [
                                { fieldLabel: 'Name:', value: 'Nikita Sontakke' },
                                { fieldLabel: 'MRN:', value: 'MRN123456' },
                                { fieldLabel: 'DOB:', value: '11/05/2004' },
                                { fieldLabel: 'Age:', value: '21' },
                                { fieldLabel: 'Gender:', value: 'Female' },
                                { fieldLabel: 'Address:', value: 'Shegaon' },
                                { fieldLabel: 'Registration Date:', value: '01/01/2024' },
                                { fieldLabel: 'Status:', value: 'Active' }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Notes:',
                            value: 'Patient has hypertension.',
                            margin: '0 10 15 0'
                        },
                        {
                            xtype: 'label',
                            text: 'Patient Editor:',
                            style: 'display:block; font-weight:bold; margin-bottom:5px;'
                        },
                        {
                            xtype: 'htmleditor',
                            height: 250,
                            margin: '0 10 0 0',
                            // Updated this value to match your specific details
<<<<<<< HEAD
                            value: 'Name: Nikita Sontakke <br>' +
=======
                            value: 'Name: Nikita Sontakke<br>' +
>>>>>>> 631b62e5ef550963eff4a7910b5312a9c7610373
                                   'MRN: MRN123456<br>' +
                                   'DOB: 11/05/2004<br>' +
                                   'Age: 21<br>' +
                                   'Gender: Female<br>' +
                                   'Address: Shegaon<br>' +
                                   'Registration Date: 01/01/2024<br>' +
                                   'Status: Active'
                        }
                    ]
                }],
                buttons: [
                    {
                        text: 'Save',
                        ui: 'soft-blue',
                        handler: function() {
                            Ext.Msg.alert('Success', 'Data saved successfully.');
                        }
                    },
                    {
                        text: 'Close',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            });
            win.show();
        }
    }]
<<<<<<< HEAD
};
=======
};
>>>>>>> 631b62e5ef550963eff4a7910b5312a9c7610373

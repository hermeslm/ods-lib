CKEDITOR.plugins.add('autocomplete', {

    requires: ['richcombo'],

    init: function (editor) {

        //Init Ctrl + space key combination
        editor.config.autoCompleteTriggerKey = {
            keyCode: CKEDITOR.CTRL + 32
        };

        var autocompleteCommand = editor.addCommand('autocomplete', {
            exec: function (editor) {

                var dummyElement = editor.document
                    .createElement('span');
                editor.insertElement(dummyElement);

                var x = 0;
                var y = 0;

                var obj = dummyElement.$;

                while (obj.offsetParent) {
                    x += obj.offsetLeft;
                    y += obj.offsetTop;
                    obj = obj.offsetParent;
                }
                x += obj.offsetLeft;
                y += obj.offsetTop;

                dummyElement.remove();

                editor.contextMenu.show(editor.document
                    .getBody(), null, x, y);
            }
        });

        var items = [
            {
                "id": '@' + "patientName",
                "label": "Patient Name"
            },
            {
                "id": '@' + "patientDob",
                "label": "Patient DOB"
            },
            {
                "id": '@' + "patientSex",
                "label": "Patient Sex"
            },
            {
                "id": '@' + "patientMaritalStatus",
                "label": "Patient Marital Status"
            }
        ];

        var firstExecution = true;
        var dataElement = {};

        if (editor.contextMenu) {
            dataElement = {};
            editor.addMenuGroup('autoCompleteBoxGroup');
            $.each(items, function (i, item) {
                var suggestionBoxItem = "autoCompleteBoxItem" + i;
                dataElement[suggestionBoxItem] = CKEDITOR.TRISTATE_OFF;
                editor.addMenuItem(suggestionBoxItem,
                    {
                        id: item.id,
                        label: item.label,
                        group: 'autoCompleteBoxGroup',
                        icon: null,
                        onClick: function () {
                            var selection = editor.getSelection();
                            var element = selection.getStartElement();
                            var ranges = selection.getRanges();
                            ranges[0].setStart(element.getFirst(), 0);
                            ranges[0].setEnd(element.getFirst(), 0);
                            var data = editor.getData();
                            console.log(data);
                            editor.insertHtml('<span class="marker">' + this.id + '&nbsp;</span>');
                        },
                    });
            });

            if (firstExecution == true) {
                editor.contextMenu.addListener(function (element) {
                    return dataElement;
                });
                firstExecution = false;
            }
        }

        editor.ui.addRichCombo('autocomplete', {
            label: "Tokens",
            title: "Insert Tokens",
            voiceLabel: "Insert tokens",
            className: 'cke_format',
            multiSelect: false,
            panel:
                {
                    css: [CKEDITOR.skin.getPath( 'editor' ) ].concat( editor.config.contentsCss ),
                    voiceLabel: editor.lang.format.panelVoiceLabel
                },

            init: function () {
                //this.startGroup("Tokens");
                //this.add('value', 'drop_text', 'drop_label');
                for (var i=0; i < items.length; i++) {
                    this.add(items[i].id, items[i].label, items[i].label);
                }
            },

            onClick: function (value) {
                editor.focus();
                editor.fire('saveSnapshot');
                editor.insertHtml('<span class="marker">' + value + '&nbsp;</span>');
                editor.fire('saveSnapshot');
            }
        });

    },
    afterInit: function (editor) {
        editor.on('key', function (evt) {
            if (evt.data.keyCode == editor.config.autoCompleteTriggerKey.keyCode) {
                editor.execCommand('autocomplete');
            }
        });

        delete editor._.menuItems.paste;
    }
});
var buildListHasRunOnce = 0;

var buildList = function (editor) {

    if (buildListHasRunOnce == 1) {
        // Remove the old unordered list from the dom.
        // This is just to cleanup the old list within the iframe
        $(this._.panel._.iframe.$).contents().find("ul").remove();
        // reset list
        this._.items = {};
        this._.list._.items = {};
    }

    var suggestions = editor.config.autoComplete.suggestions;
    for (var i = 0; i < suggestions.length; i++) {
        this.add(suggestions[i].id, suggestions[i].label, suggestions[i].label);
    }

    if (buildListHasRunOnce == 1) {
        // Force CKEditor to commit the html it generates through this.add
        this._.committed = 0; // We have to set to false in order to trigger a complete commit()
        this.commit();
    }

    buildListHasRunOnce = 1;
};

CKEDITOR.plugins.add('autocomplete', {

    requires: ['richcombo'],

    init: function (editor) {

        // Init autoComplete
        var self = this;

        // key combination : Ctrl + space
        // prefix : '${' //'&nbsp;@'
        // suffix: '}'   //'&nbsp;'
        // items: []
        editor.config.autoComplete = {
            triggerKeyCode: CKEDITOR.CTRL + 32,
            prefix: '${',
            suffix: '}',
            suggestions: []
        };

        editor.addCommand('autocompleteCmd', {
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

        var firstExecution = true;
        var dataElement = {};

        editor.addCommand('reloadOptions', {
            exec: function (editor, options) {

                //We set suggestions to the config file.
                editor.config.autoComplete = options;

                editor.execCommand('reloadComboList');

                //If context menu si defined
                if (editor.contextMenu) {
                    dataElement = {};
                    editor.addMenuGroup('suggestionBoxGroup');
                    $.each(options.suggestions, function (i, suggestion) {

                        var suggestionBoxItem = "suggestionBoxItem" + i;
                        dataElement[suggestionBoxItem] = CKEDITOR.TRISTATE_OFF;
                        editor.addMenuItem(suggestionBoxItem, {
                            id: suggestion.id,
                            label: suggestion.label,
                            group: 'suggestionBoxGroup',
                            icon: null,
                            onClick: function () {

                                var selection = editor.getSelection();
                                var element = selection.getStartElement();
                                var ranges = selection.getRanges();
                                ranges[0].setStart(element.getFirst(), 0);
                                ranges[0].setEnd(element.getFirst(), 0);
                                // var data = editor.getData();
                                // console.log(data);
                                editor.insertHtml(getTemplate(this.id));
                            }
                        });
                    });

                    if (firstExecution) {
                        editor.contextMenu.addListener(function (element) {
                            return dataElement;
                        });
                        firstExecution = false;
                    }
                }
            }
        });

        editor.ui.addRichCombo('autoCompleteCombo', {
            label: "Tokens",
            title: "Insert Tokens",
            voiceLabel: "Insert tokens",
            className: 'cke_format',
            multiSelect: false,
            panel: {
                css: [CKEDITOR.skin.getPath('editor')].concat(editor.config.contentsCss),
                voiceLabel: editor.lang.format.panelVoiceLabel
            },
            init: function () {
                //this.startGroup("Tokens");
                //this.add('value', 'drop_text', 'drop_label');
                this.buildList();
                var self = this;
                editor.addCommand('reloadComboList', {

                    exec: function () {
                        self.buildList();
                    }
                });
            },
            buildList: function(){

                var rebuildList = CKEDITOR.tools.bind(buildList, this);
                rebuildList(editor);
            },
            onClick: function (value) {
                editor.focus();
                editor.fire('saveSnapshot');
                editor.insertHtml(getTemplate(value));
                editor.fire('saveSnapshot');
            },
            setData: function (suggestions) {
                // var suggestions = editor.config.autoComplete.suggestions;
                for (var i = 0; i < suggestions.length; i++) {
                    this.add(suggestions[i].id, suggestions[i].label, suggestions[i].label);
                }
            }
        });

        function getTemplate(value) {
            var prefix = editor.config.autoComplete.prefix;
            var suffix = editor.config.autoComplete.suffix;
            return '&nbsp;<span class="marker">' + prefix + value + suffix + '</span>&nbsp;'
        }
    },
    afterInit: function (editor) {

        editor.on('key', function (evt) {
            if (evt.data.keyCode === editor.config.autoComplete.triggerKeyCode) {
                editor.execCommand('autocompleteCmd');
            }
        });

        delete editor._.menuItems.paste;
    }
});
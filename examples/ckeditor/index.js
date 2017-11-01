var Index = {

    suggestions: [],

    init: function () {
        Index.bindEvents();
        $('#getNewSuggestionsButton1').click();
        Index.initCkEditor();
    },

    bindEvents: function () {
        $('#getNewSuggestionsButton1').on('click', function () {
            Index.getSuggestionsFromServer('data/suggestions1.json');
        });

        $('#getNewSuggestionsButton2').on('click', function () {
            Index.getSuggestionsFromServer('data/suggestions2.json');
        });
    },

    initCkEditor: function () {
        //Here "CKEDITOR.SHIFT + 51" is the key combination for '#'
        $('textarea#ckeditorBox').ckeditor({suggestionsTriggerKey: {keyCode: CKEDITOR.SHIFT + 51}});
        CKEDITOR.on('instanceReady', function (evt) {
            //Here 'Index.suggestions' is the Array which is holding the current list of suggestions
            CKEDITOR.instances.ckeditorBox.execCommand('reloadSuggetionBox', Index.suggestions);
        });
    },

    getSuggestionsFromServer: function (url) {
        Index.suggestions = [];

        var suggestions = [
            {
                "id": "text1",
                "label": "Text 1"
            },
            {
                "id": "text2",
                "label": "Text 2"
            },
            {
                "id": "text3",
                "label": "Text 2"
            },
            {
                "id": "text4",
                "label": "Text 4"
            }
        ];

        $.each(suggestions, function (index, suggestion) {
            Index.suggestions.push({
                "id": suggestion.id,
                "label": suggestion.label
            });
        });

        // CKEDITOR.instances.ckeditorBox.execCommand('reloadSuggetionBox', Index.suggestions);

    }
}

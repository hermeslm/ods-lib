var Index = {

    init: function () {
        Index.initCkEditor();
    },
    initCkEditor: function () {

        var items = [
            {
                "id": "patientName",
                "label": "Patient Name"
            },
            {
                "id": "patientDob",
                "label": "Patient DOB"
            },
            {
                "id": "patientSex",
                "label": "Patient Sex"
            },
            {
                "id": "patientMaritalStatus",
                "label": "Patient Marital Status"
            }
        ];

        CKEDITOR.on('instanceReady', function (evt) {
            //Here 'Index.suggestions' is the Array which is holding the current list of suggestions
            CKEDITOR.instances.ckeditorBox.execCommand('reloadSuggestions', items);
        });
    }
};
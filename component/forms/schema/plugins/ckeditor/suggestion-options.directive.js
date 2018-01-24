/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsSuggestionOptions', SuggestionOptionsDirective);

SuggestionOptionsDirective.$inject = ['OdsFormService', 'OdsCkeditor', '$timeout'];

function SuggestionOptionsDirective(OdsFormService, OdsCkeditor, $timeout) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/plugins/ckeditor/suggestion-options-properties.html',
        scope: {
            field: '=',
            config: '=',
            profile: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        if ($scope.config && $scope.config.ckeditor) {
            $scope.field.options.prefix = $scope.config.ckeditor.prefix ?
                $scope.config.ckeditor.prefix : OdsFormService.defaultCKEditorPrefix();
            $scope.field.options.suffix = $scope.config.ckeditor.suffix ?
                $scope.config.ckeditor.suffix : OdsFormService.defaultCKEditorSuffix();
            $scope.field.options.tokensUrl = $scope.config.ckeditor.tokensUrl ?
                $scope.config.ckeditor.tokensUrl : '';
            $scope.field.options.suggestions = $scope.config.ckeditor.suggestions ?
                $scope.config.ckeditor.suggestions : [];
        }

        $scope.options = initOptions();
        $scope.addOption = addOption;
        $scope.removeOption = removeOption;
        $scope.refreshOption = refreshOption;
        $scope.loadSuggestions = loadSuggestions;
        $scope.loadTokens = loadTokens;

        function initOptions() {

            var options = [];
            for (var i = 0; i < $scope.field.options.suggestions.length; i++) {
                var option = {
                    id: $scope.field.options.suggestions[i].id,
                    label: $scope.field.options.suggestions[i].label
                };
                options.push(option);
            }
            return options;
        }

        function addOption() {

            var option = {
                id: '',
                label: ''
            };

            $scope.options.push(option);
        }

        function removeOption(index) {

            $scope.options.suggestions.splice(index, 1);
        }

        function refreshOption() {

            OdsCkeditor.setOptions($scope.field.name, OdsCkeditor.initOptions($scope.field.options));
            OdsCkeditor.setOptions($scope.field.name + $scope.profile, OdsCkeditor.initOptions($scope.field.options));
        }

        function loadSuggestions(url) {

            OdsFormService.restResource(url).query(function (result) {
                $scope.options = result;
            });
        }

        function loadTokens(url) {

            OdsFormService.restResource(url).get(function (result) {
                $scope.field.options.tokens = result;
            });
        }

        $scope.$watch('options', function (model) {

            var options = [];
            for (var i = 0; i < model.length; i++) {
                var option = {};
                option.id = model[i].id;
                option.label = model[i].label;
                options.push(option);
            }
            $scope.field.options.suggestions = options;
        }, true);
    }
}
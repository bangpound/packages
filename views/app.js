/* globals angular, window */
(function (document) {
    'use strict';

    function Config($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }

    Config.$inject = ['$compileProvider'];

    function CapitalizeFilter() {
        return function (input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        };
    }

    function JsonDataLink(scope, element, attributes) {
        scope[attributes.ngModel] = angular.fromJson(element[0].textContent);
    }

    function JsonData() {
        return {
            restrict: 'A',
            link: JsonDataLink
        };
    }

    angular
        .module('satisBrowser', [])
        .config(Config)
        .filter('capitalize', CapitalizeFilter)
        .directive('jsonData', JsonData)
    ;

    angular.bootstrap(document, ['satisBrowser'], {
        strictDi: true
    });

}(window.document));

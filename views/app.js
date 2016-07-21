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


    function ScriptDirective($rootScope) {
        return {
            restrict: 'E',
            compile: function JsonDataCompile(tElement, tAttr) {
                if (tAttr.type === 'application/json' && tAttr.hasOwnProperty('ngModel')) {
                    $rootScope[tAttr.ngModel] = angular.fromJson(tElement[0].textContent);
                }
            }
        };
    }

    ScriptDirective.$inject = ['$rootScope'];

    angular
        .module('satisBrowser', [])
        .config(Config)
        .filter('capitalize', CapitalizeFilter)
        .directive('script', ScriptDirective)
    ;

    angular.bootstrap(document, ['satisBrowser'], {
        strictDi: true
    });

}(window.document));

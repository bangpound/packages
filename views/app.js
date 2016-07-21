/* globals angular, window */
(function (document) {
    'use strict';

    function Config($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }

    Config.$inject = ['$compileProvider'];

    function SatisDataProvider($document) {
        var dataElement = $document[0].getElementById('satis-data');

        if (dataElement !== null) {
            return JSON.parse(dataElement.textContent);
        }
    }

    SatisDataProvider.$inject = ['$document'];

    function CapitalizeFilter() {
        return function (input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        };
    }

    function MainController(satisData) {
        this.packages = satisData.packages;
        this.dependencies = satisData.dependencies;
        this.lastUpdate = satisData.lastUpdate;
    }

    MainController.$inject = ['satisData'];

    angular
        .module('satisBrowser', [])
        .config(Config)
        .factory('satisData', SatisDataProvider)
        .filter('capitalize', CapitalizeFilter)
        .controller('mainController', MainController)
    ;

    angular.bootstrap(document, ['satisBrowser'], {
        strictDi: true
    });

}(window.document));

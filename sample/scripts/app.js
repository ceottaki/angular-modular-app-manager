(function (angularModularAppManager, angular) {
    'use strict';

    if (angular === null) {
        // Since angular is not present, we log the error and stop loading the application.
        console.error("AngularJS has not been loaded correctly, this application will not work as intended.");

        // We could also handle this here by using some vanilla JS to explain to the user that the application isn't going to work.
        return;
    }

    if (angularModularAppManager === null) {
        // Since the modular app manager is not present, we log it and try to start the application anyhow.
        console.log("Angular Modular App Manager has not been loaded correctly, this application could fail loading correctly.");
        createAngularAppModule();

        return;
    }

    angularModularAppManager.createAngularModule(createAngularAppModule);

    function createAngularAppModule() {
        // Initialises the angular module.
        return angular.module('myApp', ['ngRoute']).config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
            $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
        }]);
    }
})(window['angularModularAppManager'] || null, window['angular'] || null);
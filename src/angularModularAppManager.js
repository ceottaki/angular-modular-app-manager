/*
 * Angular Modular App Manager
 * (c) 2016 Felipe Ceotto
 * License: MIT
 * 
 * Version: 0.9.0
 * 
 * This module allows AngularJS applications to be created and loaded in a
 * modular fashion, eliminating the risk of loading scripts relevant to the
 * application in the incorrect order, while also promoting best practices
 * for using the JavaScript Module Pattern.
 * 
 * For great advice on the module pattern, read
 * http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
 * 
 * Usage:
 * Add this file to your HTML in a way that it is loaded after AngularJS and
 * before your application files, for example:
 *     <script src="scripts/angular/angular.js"></script>
 *     <script src="scripts/AngularModularApp/angularModularApp.js"></script>
 *     <script src="scripts/app.js"></script>
 *     <script src="scripts/app.service.js"></script>
 *     <script src="scripts/app.controller.js"></script>
 * 
 * When bootstrapping your AngularJS application with angular.module, you
 * should wrap the call in a function that returns the angular module then
 * pass that function as the argument of the createAngularModule function
 * such as:
 *     function createMyAngularApp() {
 *         return angular.module('myApp', []);
 *     }
 * 
 *     angularModularAppManager.createAngularModule(createMyAngularApp);
 * 
 * When creating the other parts of your application such as services,
 * directives or controllers, where you would normally write something like
 * angular.module('myApp').controller(...) you should wrap the call in a
 * function that has the angular module as a parameter and pass that function
 * as the argument of the addNewModule function, such as:
 *     function createMyAppController(angularModule) {
 *         angularModule.controller('MyAppController', ['$scope', 'MyAppService', function ($scope, MyAppService) {
 *         }]);
 *     }
 * 
 *     angularModularAppManager.addNewModule(createMyAppController);
 * 
 * That's everything, there is no need to do anything else. This manager will
 * ensure that the function passed in to createAngularModule is called first
 * then all the other modules will be called, regardless of the order the files
 * have been loaded by the browser.
 * 
 * TODO: Add functionality to allow this manager to manage more than a single AngularJS app.
 */
var angularModularAppManager = (function (angular) {
    'use strict';

    // Define module that will be exposed.
    var manager = {
        // The appModule property returns the angular module when one has been created and is the equivalent of angular.module['myApp']. 
        appModule: null,
        // The createAngularModule function receives a function as its parameter that should have instructions to create an angular module and return it. 
        createAngularModule: onCreateAngularModule,
        // The addNewModule function receives a function as its parameter that should take an angular module as its parameter and use it to add services, controllers or directives to that module. 
        addNewModule: onAddNewModule
    };

    var loadedCallback = null;

    // Checks for the presence of AngularJS and logs an error if it is not present.
    // While AngularJS is not actually used by this module this is done for convenience in here.
    if (angular === null) {
        console.error("AngularJS has not been loaded correctly, this application will not work as intended.");
    }

    function onCreateAngularModule(angularModule) {
        if ((angularModule === undefined) || (angularModule === null)) {
            throw "Value of angularModule cannot be undefined or null.";
        }

        if (manager.appModule !== null) {
            return;
        }

        // If an angular module object has been passed in stores it, but if a function to create one has been passed in call it.
        if (typeof (angularModule) === 'object') {
            manager.appModule = angularModule;
        } else if (typeof (angularModule === 'function')) {
            manager.appModule = angularModule();
        } else {
            throw "Value of angularModule is not an object or a function.";
        }

        // If any other modules for services, controllers or directives have been added call those.
        if (typeof (loadedCallback) === 'function') {
            loadedCallback(manager.appModule);
        }
    }

    function onAddNewModule(newModuleCreationFunction) {
        // If an angular module has already been added just calls the new module's create function, otherwise add it to the callback to be called later.
        if (manager.appModule !== null) {
            newModuleCreationFunction(manager.appModule);
        } else {
            if (typeof (loadedCallback) === 'function') {
                var currentLoadedCallback = loadedCallback;
                loadedCallback = function (appModule) {
                    currentLoadedCallback(appModule);
                    newModuleCreationFunction(appModule);
                }
            } else {
                loadedCallback = newModuleCreationFunction;
            }
        }
    }

    return manager;
})(window['angular'] || null);
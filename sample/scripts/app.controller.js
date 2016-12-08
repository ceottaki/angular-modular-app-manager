(function (angularModularAppManager) {
    'use strict';

    if (angularModularAppManager === null) {
        // Since the modular app manager is not present, we log it and try to load the module anyhow.
        console.log("Angular Modular App Manager has not been loaded correctly, this application could fail loading correctly.");

        if ((window['angular'] || null) !== null) {
            createMyAppController(angular.module('myApp'));
        } else {
            // Angular is not present, we log the error and stop loading the application.
            console.error("AngularJS has not been loaded correctly, this application will not work as intended.");
        }

        return;
    }

    angularModularAppManager.addNewModule(createMyAppController);

    function createMyAppController(appModule) {
        appModule.controller('MyAppController', ['$scope', 'MyAppService', function ($scope, MyAppService) {
            var model = {
                name: 'world',
                saveName: onSaveName,
                removeSavedName: onRemoveSavedName,
                reloadSavedName: onReloadSavedName,
                isNameSaved: true,
                isSavedNameAbsent: true,
                nameChanged: onNameChanged
            };

            var savedName = model.name;

            function onSaveName() {
                MyAppService.saveName(model.name).then(function (successData) {
                    model.isNameSaved = true;
                    savedName = model.name;
                    model.isSavedNameAbsent = false;
                });
            }

            function onRemoveSavedName() {
                MyAppService.removeSavedName().then(function (successData) {
                    savedName = 'world';
                    model.isNameSaved = (model.name === savedName);
                    model.isSavedNameAbsent = true;
                });
            }

            function onReloadSavedName() {
                MyAppService.loadName().then(function (successData) {
                    model.name = successData.data || 'world';
                    savedName = model.name;
                    model.isNameSaved = true;
                    model.isSavedNameAbsent = successData.data === null;
                });
            }

            function onNameChanged() {
                model.isNameSaved = (model.name === savedName);
            }

            onReloadSavedName();
            $scope.model = model;
        }]);
    }
})(window['angularModularAppManager'] || null);
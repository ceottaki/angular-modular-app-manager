(function (angularModularAppManager, localStorage) {
    'use strict';

    if (angularModularAppManager === null) {
        // Since the modular app manager is not present, we log it and try to load the module anyhow.
        console.log("Angular Modular App Manager has not been loaded correctly, this application could fail loading correctly.");

        if ((window['angular'] || null) !== null) {
            createMyAppService(angular.module('myApp'));
        } else {
            // Angular is not present, we log the error and stop loading the application.
            console.error("AngularJS has not been loaded correctly, this application will not work as intended.");
        }

        return;
    }

    angularModularAppManager.addNewModule(createMyAppService);

    function createMyAppService(appModule) {
        appModule.service('MyAppService', ['$q', '$http', function ($q, $http) {
            var api = {
                loadName: onLoadName,
                saveName: onSaveName,
                removeSavedName: onRemoveSavedName
            };

            function onLoadName() {
                return $q(function(resolve, reject) {
                    if (localStorage === null) {
                        reject({ msg: 'Local storage is not available.' });
                        return;
                    }

                    var name = localStorage.getItem('name');
                    resolve({ data: name, msg: 'Name has been successfully loaded.' });
                });
            }

            function onSaveName(name) {
                return $q(function (resolve, reject) {
                    if (localStorage === null) {
                        reject({
                            msg: 'Local storage is not available.'
                        });
                        return;
                    }

                    localStorage.setItem('name', name);
                    resolve({
                        msg: 'Name has been successfully saved.'
                    });
                });
            }

            function onRemoveSavedName() {
                return $q(function(resolve, reject) {
                    if (localStorage === null) {
                        reject({ msg: 'Local storage is not available.' });
                        return;
                    }

                    localStorage.removeItem('name');
                    resolve({ msg: 'Name has been successfully removed.' });
                });
            }

            return api;
        }]);
    }
})(window['angularModularAppManager'] || null, window['localStorage'] || null);
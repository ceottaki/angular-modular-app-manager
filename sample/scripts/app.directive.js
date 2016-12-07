(function (angularModularAppManager) {
    'use strict';

    if (angularModularAppManager === null) {
        // Since the modular app manager is not present, we log it and try to load the module anyhow.
        console.log("Angular Modular App Manager has not been loaded correctly, this application could fail loading correctly.");

        if ((window['angular'] || null) !== null) {
            createMyAppDirective(angular.module('myApp'));
        } else {
            // Angular is not present, we log the error and stop loading the application.
            console.error("AngularJS has not been loaded correctly, this application will not work as intended.");
        }
        
        return;
    }

    angularModularAppManager.addNewModule(createMyAppDirective);

    function createMyAppDirective(appModule) {
        appModule.directive('myBootstrapTooltipContainer', [function () {
            var myBootstrapTooltipContainerDirective = {
                link: onLink
            };

            function onLink(scope, element, attrs, controller, transcludeFn) {
                if (typeof(element.tooltip) === 'function') {
                    element.find('[data-toggle="tooltip"]').tooltip();
                }
            }

            return myBootstrapTooltipContainerDirective;
        }]);
    }
})(window['angularModularAppManager'] || null);
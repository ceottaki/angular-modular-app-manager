angular-modular-app-manager
=======

This JavaScript module allows AngularJS applications to be created and loaded in a modular fashion, eliminating the risk of loading scripts relevant to the application in the incorrect order, while also promoting best practices for using the JavaScript Module Pattern.


## Usage

1. Install via [Bower](https://bower.io/):
  ```bash
  bower install angular-modular-app-manager --production
  ```
  or manually [download](https://github.com/ceottaki/angular-modular-app-manager/archive/master.zip).

2. Include the angular-modular-app-manager source file _after [AngularJS](https://angularjs.org/) but before your own source files_:
  ```html
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.9/angular.min.js"></script>
  <script src="bower_components/angular-modular-app-manager/dist/angularModularAppManager.min.js"></script>
  <script src="js/myAngularApp.js"></script>
  <script src="js/auth/auth.service.js"></script>
  <script src="js/auth/auth.controller.js"></script>
  ...
  ```
  This order will ensure all dependencies are resolved correctly.
  
3. When writting your AngularJS application, use the global angularModularAppManager object to bootstrap your application and add all of the modules (directives, services and controllers):
  ```javascript
  function bootstrapMyAngularApp() {
    return angular.module('myApp', []);
  }
  
  function createMyAppAuthController(angularModule) {
    angularModule.controller('AuthController', ['$scope', 'AuthService', function ($scope, AuthService) {
      // My controller code here.
    }]);
  }
  
  function createMyAppAuthService(angularModule) {
    angularModule.service('AuthService', ['$q', '$http', function ($q, $http) {
      // My service code here.
    }]);
  }
  
  angularModularAppManager.createAngularModule(createMyAngularApp);
  angularModularAppManager.addNewModule(createMyAppAuthController);
  angularModularAppManager.addNewModule(createMyAppAuthService);
```

As in the example above, when bootstrapping your AngularJS application with angular.module, you should wrap the call in a function that returns the angular module then pass that function (createMyAngularApp in the example) as the argument of the createAngularModule function.

When creating the other parts of your application such as services, directives or controllers, where you would normally write something like angular.module('myApp').controller(...) you should wrap the call in a function that has the angular module as a parameter and pass that function as the argument of the addNewModule function, such as the createMyAppAuthController and createMyAppAuthService functions in the example above.

Regarless of the order the modules are added, the angular modular app manager will ensure that your application is first bootstrapped then each module is initialised.


## Sample

In the repository and with the bower package you will see a simple [sample](https://github.com/ceottaki/angular-modular-app-manager/tree/master/sample) project that fully demonstrates how to use this module. The sample application scripts also demonstrate how to check for dependencies and initialise the application if this module is not present as a fallback. It is worth checking them out.


## Development

- Clone the repository or [download](https://github.com/ceottaki/angular-modular-app-manager/archive/master.zip) it
- Install dependencies: ```npm install```
- Run ```gulp```

Pull requests are welcome!


## License

MIT http://ceottaki.mit-license.org/


## Thanks

Thanks to Ben Cherry for a [great explanation](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html) on the JavaScript module pattern.


## TODO

Currently you can only load one angular application with this module, so next up will be to enable it to handle more than one angular application.
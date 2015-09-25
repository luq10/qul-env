# qul-env
 
Angular environment config

# Basic usage
```js
angular.module('app', ['qul.env'])
    .config(function(EnvProvider){
        EnvProvider.setConfig({
            'dev': {
                match: 'localhost',
                constants: {
                    API_URL: 'http://localhost:3001'
                }
            },
            'test': {
                match: '.dev.jazzy.pro',
                constants: {
                    API_URL: 'http://api.dev.example.com'
                }
            },
            'prod': {
                match: true,
                constants: {
                    API_URL: 'http://api.example.com'
                }
            }
        });
    })
    .service('Foo', function(Env){
        console.log(Env.API_URL);
    })
``` 
 

# Advanced Usage

If you want to use constants set in EnvProvider in other provider you must make some angular trick.
(See http://stackoverflow.com/questions/25644039/angular-inject-http-into-config-or-provider-into-run)

```js
(function(){
  'use strict';

  var _AnalyticsProvider;

  angular.module('app', [
    'angular-google-analytics',
    'qul.env'
  ])
    .config(function(EnvProvider){
        EnvProvider.setConfig({
            'dev': {
                match: 'localhost',
                constants: {
                    API_URL: 'http://localhost:3001',
                    GA_ACCOUNT: 'UA-XXXXXXXX-X'
                }
            },
            'test': {
                match: '.dev.jazzy.pro',
                constants: {
                    API_URL: 'http://api.dev.example.com',
                    GA_ACCOUNT: 'UA-XXXXXXXX-X'
                }
            },
            'prod': {
                match: true,
                constants: {
                    API_URL: 'http://api.example.com',
                    GA_ACCOUNT: 'UA-XXXXXXXX-X'
                }
            }
        });
    })
    .config(function(AnalyticsProvider){
      _AnalyticsProvider = AnalyticsProvider;
    })
    .run(function(Env){
      _AnalyticsProvider.setAccount(Env.GA_ACCOUNT);
    })
}());

```
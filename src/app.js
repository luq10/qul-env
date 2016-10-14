(function () {
  'use strict';

  angular.module('qul.env', [])
    .provider('Env', function () {
      /**
       *
       * @type {{}}
       */
      this.config = {};

      /**
       *
       * @param config
       *
       *
       * @example
       * <pre>
       * angular.module('app', ['qul.env'])
       *  .config(function(EnvProvider){
       *      EnvProvider.setConfig({
       *          'dev': {
       *              match: 'localhost',
       *              constants: {
       *                  API_URL: 'http://localhost:3001'
       *              }
       *          },
       *          'test': {
       *              match: '.dev.jazzy.pro',
       *              constants: {
       *                  API_URL: 'http://api.dev.example.com'
       *              }
       *          },
       *          'prod': {
       *              match: true,
       *              constants: {
       *                  API_URL: 'http://api.example.com'
       *              }
       *          }
       *      });
       *  })
       *  .service('Foo', function(Env){
       *      console.log(Env.API_URL);
       *  })
       * </pre>
       */
      this.setConfig = function (config) {
        for (var name in config) {
            config[name].constants.$name = name;
        }
        this.config = config;
      };

      /**
       *
       * @returns {{}}
       */
      this.$get = function ($location) {
        var env = (function (config, url) {
          for (var name in config) {
            if (true === new RegExp(config[name].match).test(url)) {
              return name;
            }
          }

          return 'prod';
        }(this.config, $location.absUrl()));

        return this.config[env].constants;
      }
    });
}());
(function () {
  'use strict';

  angular
    .module('<%= serviceName %>.module')
    .factory('<%= serviceName %>Service', <%= serviceName %>Service);

  <%= serviceName %>Service.$inject = ['$http', 'EnvironmentConfig'];

  function <%= serviceName %>Service($http, EnvironmentConfig) {
    return {
    };

  }

}());

(function () {
  'use strict';

  angular
    .module('<%= controllerName %>.module')
    .controller('<%= controllerName %>Controller', <%= controllerName %>Controller);

  <%= controllerName %>Controller.$inject = ['EnvironmentConfig'];

  function <%= controllerName %>Controller(EnvironmentConfig) {
    var vm = this;

  }

}());

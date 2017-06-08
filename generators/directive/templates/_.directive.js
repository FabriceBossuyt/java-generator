(function() {
  'use strict';

  angular
    .module('<%= moduleName %>.module', [])
    .directive('<%= directiveName %>', <%= directiveName %>);

  function <%= directiveName %>() {
    var directive = {
        require: [''],
        link: link, 
        templateUrl : '', 
        restrict: '', 
        scope :{}, 
        transclude:''
    };
    return directive;

    function link(scope, element, attr) {
      //add directive code here
    }
  }
}());
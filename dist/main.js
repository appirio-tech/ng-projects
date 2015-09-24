(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-api-services'];

  angular.module('appirio-tech-ng-projects', dependencies);

}).call(this);

angular.module("appirio-tech-ng-projects").run(["$templateCache", function($templateCache) {$templateCache.put("views/ng-projects.directive.html","<ul><li ng-repeat=\"project in vm.projects track by $index\"><ul class=\"header\"><li><p class=\"name\">{{ project.name || \'Unnamed Project\' }}</p></li><li><p>{{ vm.typeMap[project.projectType] || \'\' }}</p></li></ul><div class=\"preview\"></div><ul class=\"statuses\"><li class=\"icon-house\"><div ng-if=\"project.status == \'Submitted\'\" class=\"icon checkmark small\"></div><div ng-if=\"project.status == \'Incomplete\'\" class=\"icon warning small\"></div><avatar ng-if=\"project.status != \'Incomplete\' &amp;&amp; project.status != \'Submitted\'\" class=\"icon small\"></avatar></li><li class=\"message\">{{ vm.statusMap[project.status] || vm.statusMap[\'Incomplete\'] }}</li><li class=\"action\"><a ng-if=\"project.status == \'Incomplete\' || !project.status\" ui-sref=\"submit-work-features({ id: project.id })\">Continue</a><span ng-if=\"project.status == \'Submitted\'\"><a ui-sref=\"timeline({ workId: project.id })\">Awaiting estimate</a></span><a ng-if=\"project.status == \'Assigned\'\" ui-sref=\"timeline({ workId: project.id })\">Meet your copilot</a><a ng-if=\"project.status == \'Estimate\'\" ui-sref=\"timeline({ workId: project.id })\">View your quote and begin</a><a ng-if=\"project.status == \'Launched\'\" ui-sref=\"timeline({ workId: project.id })\">View project</a><a ng-if=\"project.status == \'Messaged\'\" ui-sref=\"timeline({ workId: project.id })\">View 1 unread message</a></li></ul></li></ul><a ui-sref=\"view-projects.assigned\" ng-show=\"vm.projects.length &lt; 1\">Manage your copilot projects</a>");}]);
(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/ng-projects.directive.html',
      controller: 'NgProjectsController as vm',
      scope: true
    };
  };

  angular.module('appirio-tech-ng-projects').directive('ngProjects', directive);

}).call(this);

(function() {
  'use strict';
  var NgProjectsController;

  NgProjectsController = function($scope, WorkAPIService) {
    var activate, getProjects, vm;
    vm = this;
    vm.projects = [];
    vm.loaded = false;
    vm.statusMap = {
      'Incomplete': 'Setup incomplete',
      'Submitted': 'Project submitted',
      'Assigned': 'Copilot assigned',
      'Estimate': 'Project approved',
      'Launched': 'Project launched',
      'Messaged': 'Project launched'
    };
    vm.typeMap = {
      'DESIGN': 'Design',
      'CODE': 'Code',
      'DESIGN_AND_CODE': 'Design/Code'
    };
    activate = function() {
      getProjects();
      return vm;
    };
    getProjects = function(params) {
      var resource;
      resource = WorkAPIService.get(params);
      resource.$promise.then(function(response) {
        return vm.projects = response;
      });
      resource.$promise["catch"](function(response) {});
      return resource.$promise["finally"](function() {
        return vm.loaded = true;
      });
    };
    return activate();
  };

  NgProjectsController.$inject = ['$scope', 'WorkAPIService'];

  angular.module('appirio-tech-ng-projects').controller('NgProjectsController', NgProjectsController);

}).call(this);

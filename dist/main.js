(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-api-services'];

  angular.module('appirio-tech-ng-projects', dependencies);

}).call(this);

angular.module("appirio-tech-ng-projects").run(["$templateCache", function($templateCache) {$templateCache.put("views/ng-projects.directive.html","<loader ng-show=\"vm.loading\"></loader><ul class=\"flex center wrap\"><li ng-repeat=\"project in vm.projects track by $index\"><header><a ui-sref=\"timeline({ workId: project.id })\"><h5>{{ project.name || \'Unnamed Project\' }}</h5></a><p class=\"type\">{{ vm.typeMap[project.projectType] }} - {{ project.status }}</p></header><main ng-if=\"project.status == \'Incomplete\'\" class=\"incomplete flex column middle center\"><div class=\"icon big warning\"></div><h6>Project submission incomplete</h6><button>continue setup</button></main><main ng-if=\"project.status == \'Submitted\'\" class=\"submitted flex column\"><div class=\"flex column middle center flex-grow\"><div class=\"icon big warning\"></div><h6>Project submitted</h6></div><footer><p>You are waiting for project approval</p><p>This should take about 1 day</p></footer></main><main ng-if=\"project.status == \'Assigned\'\" class=\"approved\"><hr/><h6>Meet your co-pilot</h6><avatar class=\"icon big\"></avatar><p class=\"name\">Copilot name missing from API blah blah blah</p><p class=\"secondary\">Co-Pilot</p></main><main ng-if=\"project.status == \'Estimate\'\" class=\"approved\"><hr/><h6>Quote Generated</h6><avatar class=\"icon big\"></avatar><p class=\"name\">Copilot name missing from API blah blah blah</p><p class=\"secondary\">Co-Pilot</p><a ui-sref=\"timeline({ workId: project.id })\" class=\"button action\">view quote</a></main><main ng-if=\"project.status == \'Approved\'\" class=\"launched flex column\"><div class=\"flex column middle center flex-grow\"><div class=\"icon big warning\"></div><h6>Project Approved</h6></div><footer><p>Blah blah blah blah</p><p>Blah blah blah blah</p></footer></main><main ng-if=\"project.status == \'Launched\'\" class=\"launched flex column\"><div class=\"flex column middle center flex-grow\"><div class=\"icon big warning\"></div><h6>Project launched</h6></div><footer><p>Design work is in progress</p><p>Get design submissions in several days.</p></footer></main><main ng-if=\"project.status == \'Complete\'\" class=\"complete flex column middle center\"><div class=\"icon big warning\"></div><h6>Project complete!</h6><button>deploy my app</button></main></li></ul><div ng-if=\"vm.projects.length == 0\" class=\"no-projects\"><p>You have not started any projects.</p></div>");}]);
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
    vm.loading = false;
    vm.statusMap = {
      'Incomplete': 'Setup incomplete',
      'Submitted': 'Project submitted',
      'Assigned': 'Copilot assigned',
      'Estimate': 'Project estimated',
      'Approved': 'Project approved',
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
      vm.loading = true;
      resource = WorkAPIService.get(params);
      resource.$promise.then(function(response) {
        return vm.projects = response;
      });
      resource.$promise["catch"](function(response) {});
      return resource.$promise["finally"](function() {
        return vm.loading = false;
      });
    };
    return activate();
  };

  NgProjectsController.$inject = ['$scope', 'WorkAPIService'];

  angular.module('appirio-tech-ng-projects').controller('NgProjectsController', NgProjectsController);

}).call(this);

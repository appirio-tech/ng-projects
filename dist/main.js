(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components'];

  angular.module('appirio-tech-ng-projects', dependencies);

}).call(this);

angular.module("appirio-tech-ng-projects").run(["$templateCache", function($templateCache) {$templateCache.put("views/ng-projects.directive.html","<ul><li ng-repeat=\"project in vm.projects track by $index\"><ul class=\"header\"><li><p class=\"name\">{{ project.name || \'n/a\' }}</p></li><li><p>{{ vm.typeMap[project.requestType] || \'n/a\' }}</p></li></ul><div class=\"preview\"></div><ul class=\"statuses\"><li class=\"icon-house\"><div ng-if=\"project.status == \'Submitted\'\" class=\"icon checkmark small\"></div><div ng-if=\"project.status == \'Incomplete\'\" class=\"icon warning small\"></div><avatar ng-if=\"project.status != \'Incomplete\' &amp;&amp; project.status != \'Submitted\'\" class=\"icon small\"></avatar></li><li class=\"message\">{{ vm.statusMap[project.status] || vm.statusMap[\'Incomplete\'] }}</li><li class=\"action\"><a ng-if=\"project.status == \'Incomplete\'\" ui-sref=\"submit-work({ id: project.id })\">Continue</a><span ng-if=\"project.status == \'Submitted\'\"><a ui-sref=\"timeline({ workId: project.id })\">Awaiting estimate</a></span><a ng-if=\"project.status == \'Assigned\'\" ui-sref=\"timeline({ workId: project.id })\">Meet your copilot</a><a ng-if=\"project.status == \'Estimate\'\" ui-sref=\"timeline({ workId: project.id })\">View your quote and begin</a><a ng-if=\"project.status == \'Launched\'\" ui-sref=\"timeline({ workId: project.id })\">View project</a><a ng-if=\"project.status == \'Messaged\'\" ui-sref=\"timeline({ workId: project.id })\">View 1 unread message</a></li></ul></li></ul><a ui-sref=\"view-projects.assigned\" ng-show=\"vm.projects.length &lt; 1\">Manage your copilot projects</a>");}]);
(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/ng-projects.directive.html',
      controller: 'NgProjectsController as vm'
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
      'Estimate': 'Project approved!',
      'Launched': 'Project launched',
      'Messaged': 'Project launched'
    };
    vm.typeMap = {
      'design': 'Design',
      'code': 'Code',
      'both': 'Design/Code'
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

(function() {
  'use strict';
  var srv, transformResponse;

  transformResponse = function(response) {
    var parsed, ref;
    parsed = JSON.parse(response);
    return (parsed != null ? (ref = parsed.result) != null ? ref.content : void 0 : void 0) || [];
  };

  srv = function($resource, API_URL) {
    var methods, params, url;
    url = API_URL + '/work/:workId';
    params = {
      workId: '@workId'
    };
    methods = {
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: transformResponse
      },
      get: {
        method: 'GET',
        isArray: true,
        transformResponse: transformResponse
      }
    };
    return $resource(url, params, methods);
  };

  srv.$inject = ['$resource', 'API_URL'];

  angular.module('appirio-tech-ng-projects').factory('WorkAPIService', srv);

}).call(this);

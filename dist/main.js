(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-api-services'];

  angular.module('appirio-tech-ng-projects', dependencies);

}).call(this);

angular.module("appirio-tech-ng-projects").run(["$templateCache", function($templateCache) {$templateCache.put("views/claimed-projects.directive.html","<loader ng-show=\"vm.loading\"></loader><ul class=\"flex wrap\"><li ng-repeat=\"project in vm.projects track by $index\" fitted-width=\"fitted-width\"><header><a ui-sref=\"timeline({ workId: project.id })\"><h5>{{ project.name || \'Unnamed Project\' }}</h5></a><p class=\"type\">{{ vm.typeMap[project.projectType] }} - 10/23/2015</p></header><hr/><main ng-if=\"project.status == \'Assigned\'\" class=\"flex column middle center\"><h6>Projected Claimed</h6><img src=\"/images/design.svg\" ng-if=\"project.projectType == \'DESIGN\'\" class=\"icon biggest\"/><img src=\"/images/development.svg\" ng-if=\"project.projectType == \'DESIGN_AND_CODE\'\" class=\"icon biggest\"/><a ui-sref=\"submit-work({ id: project.id })\" class=\"action button\">estimate</a></main><main ng-if=\"project.status == \'Estimate\'\" class=\"flex column middle center\"><h6>Projected Estimated</h6><img src=\"/images/define-feature.svg\" class=\"icon biggest\"/><p>Client is reviewing estimate.</p></main><main ng-if=\"project.status == \'Approved\'\" class=\"flex column middle center\"><h6>Project Approved</h6><img src=\"/images/brand-reqs.svg\" class=\"icon biggest\"/><a ui-sref=\"submit-work({ id: project.id })\" class=\"action button\">create challenges</a></main><main ng-if=\"project.status == \'Launched\'\" class=\"flex column middle center\"><img src=\"/images/features.svg\" class=\"icon biggest\"/><h6>Project launched</h6></main><main ng-if=\"project.status == \'Complete\'\" class=\"complete flex column middle center\"><img src=\"/images/features.svg\" class=\"icon biggest\"/><h6>Project complete</h6></main></li></ul><div ng-if=\"vm.projects.length == 0\" class=\"no-projects\"><p>You have not started any projects.</p></div>");
$templateCache.put("views/estimate-project.directive.html","<loader ng-show=\"vm.loading\"></loader><form ng-submit=\"vm.submit()\" ng-hide=\"vm.saved\"><div class=\"cost-estimate flex space-between wrap\"><div class=\"cost\"><p>Cost</p><div class=\"fields flex middle\"><input ng-model=\"vm.payload.price.min\" type=\"number\" placeholder=\"$\" required=\"true\" min=\"0\"/><p>to</p><input ng-model=\"vm.payload.price.max\" type=\"number\" placeholder=\"$\" required=\"true\" min=\"0\"/></div></div><div class=\"duration\"><p>Project Duration</p><div class=\"fields flex middle\"><input ng-model=\"vm.payload.duration.min\" type=\"number\" placeholder=\"$\" required=\"true\" min=\"0\"/><p>to</p><input ng-model=\"vm.payload.duration.max\" type=\"number\" placeholder=\"$\" required=\"true\" min=\"0\"/><p>weeks</p></div></div></div><button class=\"action wider\">save estimates</button></form><h3 ng-show=\"vm.saved\">Esimate saved</h3>");
$templateCache.put("views/ng-projects.directive.html","<loader ng-show=\"vm.loading\"></loader><ul class=\"flex wrap\"><li ng-repeat=\"project in vm.projects track by $index\" fitted-width=\"fitted-width\" class=\"elevated-bottom\"><header><a ui-sref=\"timeline({ workId: project.id })\"><h5>{{ project.name || \'Unnamed Project\' }}</h5></a><p class=\"type\">{{ vm.typeMap[project.projectType] }} - {{ project.status }}</p></header><main ng-if=\"project.status == \'Incomplete\'\" class=\"incomplete flex column middle center\"><img src=\"/images/project-incomplete.svg\" class=\"icon big\"/><h6>Project submission incomplete</h6><a ui-sref=\"submit-work({ id: project.id })\" class=\"button\">continue setup</a></main><main ng-if=\"project.status == \'Submitted\'\" class=\"submitted flex column\"><div class=\"flex column middle center flex-grow\"><img src=\"/images/project-submitted.svg\" class=\"icon big\"/><h6>Project submitted</h6></div><footer><p>You are waiting for project approval</p><p>This should take about 1 day</p></footer></main><main ng-if=\"project.status == \'Assigned\'\" class=\"assigned flex column\"><div class=\"flex column middle center flex-grow\"><h6>Meet your co-pilot</h6><avatar ng-src=\"{{project.copilot.avatar}}\" class=\"icon big\"></avatar><p>{{ project.copilot.handle || \'n/a\' }}</p></div><footer><a ui-sref=\"messaging({ id: project.id, threadId: \'threadfor-\' + project.id })\" class=\"button action\">send a message</a></footer></main><main ng-if=\"project.status == \'Estimate\'\" class=\"estimated flex column\"><div class=\"flex column middle center flex-grow\"><div class=\"icon big warning\"></div><h6>Quote Generated</h6></div><footer><a ui-sref=\"timeline({ workId: project.id })\" class=\"button action\">view quote</a></footer></main><main ng-if=\"project.status == \'Approved\'\" class=\"approved flex column\"><div class=\"flex column middle center flex-grow\"><img src=\"/images/project-approved.svg\" class=\"icon big\"/><h6>Project Approved</h6></div><footer><p>Blah blah blah blah</p><p>Blah blah blah blah</p></footer></main><main ng-if=\"project.status == \'Launched\'\" class=\"launched flex column\"><div class=\"flex column middle center flex-grow\"><img src=\"/images/project-launched.svg\" class=\"icon big\"/><h6>Project launched</h6></div><footer><p>Design work is in progress</p><p>Get design submissions in several days.</p></footer></main><main ng-if=\"project.status == \'Complete\'\" class=\"complete flex column middle center\"><div class=\"icon big warning\"></div><h6>Project complete!</h6><button>deploy my app</button></main></li></ul><div ng-if=\"vm.projects.length == 0\" class=\"no-projects\"><p>You have not started any projects.</p></div>");
$templateCache.put("views/open-projects.directive.html","<loader ng-show=\"vm.loading\"></loader><ul class=\"flex wrap\"><li ng-repeat=\"project in vm.projects track by $index\" fitted-width=\"fitted-width\"><header><a ui-sref=\"timeline({ workId: project.id })\"><h5>{{ project.name || \'Unnamed Project\' }}</h5></a><p class=\"type\">{{ vm.typeMap[project.projectType] }} - 10/23/2015</p></header><hr/><main class=\"flex column middle center\"><img src=\"/images/design.svg\" ng-if=\"project.projectType == \'DESIGN\'\" class=\"icon biggest\"/><img src=\"/images/development.svg\" ng-if=\"project.projectType == \'DESIGN_AND_CODE\'\" class=\"icon biggest\"/><a ui-sref=\"submit-work({ id: project.id })\" class=\"action button\">claim project</a></main></li></ul><div ng-if=\"vm.projects.length == 0\" class=\"no-projects\"><p>You have not started any projects.</p></div>");
$templateCache.put("views/project-details.directive.html","<loader ng-show=\"vm.loading\"></loader><div class=\"flex rows\"><div class=\"house nav\"><ul><li><button class=\"clean\">Project setup</button></li><li><button class=\"clean\">Features</button></li><li><button class=\"clean\">Design</button></li><li><button class=\"clean\">Development</button></li></ul></div><ul ng-hide=\"vm.loading\" class=\"requirements flex-grow\"><li><h3>Project Setup</h3><hr class=\"biggest\"/><h4>Uploaded documents</h4><a href=\"#\">abc123.doc (wip)</a><h4>iOS platform details</h4><ul class=\"platform flex space-between\"><li class=\"device\"><h6>Device</h6><ul><li ng-repeat=\"device in vm.project.deviceIds\" class=\"flex middle\"><img src=\"/images/icon-check.svg\" class=\"icon\"/><span>{{ vm.textMap[device] || device }}</span></li></ul></li><li class=\"orientation\"><h6>Orientation</h6><ul><li ng-repeat=\"orientation in vm.project.orientationIds\" class=\"flex middle\"><img src=\"/images/icon-check.svg\" class=\"icon\"/><span>{{ vm.textMap[orientation] || orientation }}</span></li></ul></li></ul><h4>Project type</h4><div ng-if=\"vm.project.projectType == \'DESIGN\'\" class=\"project-type\"><img src=\"/images/design.svg\" class=\"biggest\"/><p>Design</p></div><div ng-if=\"vm.project.projectType != \'DESIGN\'\" class=\"project-type\"><img src=\"/images/design-development.svg\" class=\"biggest\"/><p>Design &amp; Development</p></div></li><li><h3>Features</h3><hr class=\"biggest\"/><h4>Uploaded documents</h4><a href=\"#\">abc123.doc (wip)</a><h4>Features &amp; descriptions</h4><ul class=\"features-descriptions\"><li ng-repeat=\"feature in vm.project.features\"><p>{{ feature.title }}</p><p>{{ feature.description }}</p><hr/></li></ul></li><li><h3>Design</h3><hr class=\"biggest\"/><h4>Uploaded documents</h4><a href=\"#\">abc123.doc (wip)</a><h4>URL to get styles</h4><a href=\"{{ url }}\" ng-repeat=\"url in vm.project.designUrls\" target=\"_blank\">{{ url }}</a><h4>Fonts</h4><div class=\"flex middle\"><div class=\"big-a\">A</div><span>{{ vm.project.fontIds.join(\', \') }}</span></div><h4>Colors</h4><p>{{ vm.project.colorSwatchIds.join(\', \') }}</p><h4>Icons</h4><div ng-repeat=\"icon in vm.project.iconsetIds\" class=\"flex middle\"><img src=\"/images/{{ vm.imageMap[icon] }}.svg\" class=\"icon biggest\"/><span>{{ vm.textMap[icon] }}</span></div></li><li><h3>Development</h3><hr class=\"biggest\"/><h4>Uploaded Specs</h4><a href=\"#\">abc123.doc (wip)</a><h4>What level of security is needed?</h4><p>Security level needed: {{ vm.project.securityLevel }}</p><h4>Access to data offline?</h4><p ng-if=\"vm.project.offlineAccess\">Yes, access to offline data is needed.</p><p ng-if=\"!vm.project.offlineAccess\">No, access to offline data is not needed.</p><h4>Is there any level of personal information? (stored or transmitted)?</h4><p ng-if=\"vm.project.usesPersonalInformation\">Yes, storing and/or transmitting personal information is needed.</p><p ng-if=\"!vm.project.usesPersonalInformation\">No, storing and/or transmitting personal information is not needed.</p><h4>How many 3rd party integrations?</h4><p>There are {{ vm.project.numberOfApiIntegrations }} integrations needed.</p></li></ul></div>");}]);
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

  NgProjectsController = function($scope, WorkAPIService, ProjectsAPIService) {
    var activate, getProjects, orderProjectsByCreationDate, vm;
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
    orderProjectsByCreationDate = function(projects) {
      var orderedProjects;
      orderedProjects = projects != null ? projects.sort(function(previous, next) {
        return new Date(next.createdAt) - new Date(previous.createdAt);
      }) : void 0;
      return orderedProjects;
    };
    getProjects = function(params) {
      var resource;
      vm.loading = true;
      resource = ProjectsAPIService.query();
      resource.$promise.then(function(response) {
        return vm.projects = orderProjectsByCreationDate(response);
      });
      resource.$promise["catch"](function(response) {});
      return resource.$promise["finally"](function() {
        return vm.loading = false;
      });
    };
    return activate();
  };

  NgProjectsController.$inject = ['$scope', 'WorkAPIService', 'ProjectsAPIService'];

  angular.module('appirio-tech-ng-projects').controller('NgProjectsController', NgProjectsController);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/open-projects.directive.html',
      controller: 'OpenProjectsController as vm',
      scope: true
    };
  };

  angular.module('appirio-tech-ng-projects').directive('openProjects', directive);

}).call(this);

(function() {
  'use strict';
  var OpenProjectsController;

  OpenProjectsController = function($scope, WorkAPIService) {
    var activate, getProjects, vm;
    vm = this;
    vm.projects = [];
    vm.loading = false;
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

  OpenProjectsController.$inject = ['$scope', 'WorkAPIService'];

  angular.module('appirio-tech-ng-projects').controller('OpenProjectsController', OpenProjectsController);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/claimed-projects.directive.html',
      controller: 'ClaimedProjectsController as vm',
      scope: true
    };
  };

  angular.module('appirio-tech-ng-projects').directive('claimedProjects', directive);

}).call(this);

(function() {
  'use strict';
  var ClaimedProjectsController;

  ClaimedProjectsController = function($scope, WorkAPIService) {
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

  ClaimedProjectsController.$inject = ['$scope', 'WorkAPIService'];

  angular.module('appirio-tech-ng-projects').controller('ClaimedProjectsController', ClaimedProjectsController);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/estimate-project.directive.html',
      controller: 'EstimateProjectController as vm',
      scope: {
        projectId: '@projectId'
      }
    };
  };

  angular.module('appirio-tech-ng-projects').directive('estimateProject', directive);

}).call(this);

(function() {
  'use strict';
  var EstimateProjectController;

  EstimateProjectController = function($scope, ProjectEstimatesAPIService) {
    var activate, getProjects, vm;
    vm = this;
    vm.projects = [];
    vm.loading = false;
    vm.saved = false;
    vm.payload = {
      price: {
        min: 0,
        max: 0
      },
      duration: {
        min: 0,
        max: 0,
        unit: 'week'
      }
    };
    vm.submit = function() {
      var params, resource;
      vm.loading = true;
      params = {
        id: $scope.projectId
      };
      resource = ProjectEstimatesAPIService.post(params, vm.payload);
      resource.$promise.then(function() {
        return vm.saved = true;
      });
      return resource.$promise["finally"](function() {
        return vm.loading = false;
      });
    };
    activate = function() {
      return vm;
    };
    getProjects = function(params) {};
    return activate();
  };

  EstimateProjectController.$inject = ['$scope', 'ProjectEstimatesAPIService'];

  angular.module('appirio-tech-ng-projects').controller('EstimateProjectController', EstimateProjectController);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/project-details.directive.html',
      controller: 'ProjectDetailsController as vm',
      scope: {
        id: '@projectId'
      }
    };
  };

  angular.module('appirio-tech-ng-projects').directive('projectDetails', directive);

}).call(this);

(function() {
  'use strict';
  var ProjectDetailsController;

  ProjectDetailsController = function($scope, ProjectsAPIService) {
    var activate, vm;
    vm = this;
    vm.projects = [];
    vm.loading = false;
    vm.textMap = {
      'IWATCH': 'iWatch',
      'IPHONE': 'iPhone',
      'IPad': 'iPad',
      'PORTRAIT': 'Portrait',
      'LANDSCAPE': 'Landscape',
      'FLAT_COLORS': 'FLAT, COLORS',
      'SOLID_LINE': 'SOLID LINE',
      'THIN_LINE': 'THIN LINE'
    };
    vm.imageMap = {
      'FLAT_COLORS': 'icon-flat-color',
      'SOLID_LINE': 'icon-solid',
      'THIN_LINE': 'icon-solid'
    };
    activate = function() {
      var params, resource;
      vm.loading = true;
      params = {
        id: $scope.id
      };
      resource = ProjectsAPIService.get(params);
      resource.$promise.then(function(response) {
        return vm.project = response;
      });
      resource.$promise["catch"](function(response) {});
      resource.$promise["finally"](function() {
        return vm.loading = false;
      });
      return vm;
    };
    return activate();
  };

  ProjectDetailsController.$inject = ['$scope', 'ProjectsAPIService'];

  angular.module('appirio-tech-ng-projects').controller('ProjectDetailsController', ProjectDetailsController);

}).call(this);

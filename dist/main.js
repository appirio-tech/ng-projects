(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-api-services'];

  angular.module('appirio-tech-ng-projects', dependencies);

}).call(this);

angular.module("appirio-tech-ng-projects").run(["$templateCache", function($templateCache) {$templateCache.put("views/claimed-projects.directive.html","<loader ng-show=\"vm.loading\"></loader><ul class=\"flex wrap\"><li ng-repeat=\"project in vm.projects track by $index\" fitted-width=\"fitted-width\"><project-card class=\"elevated-bottom\"><card-header><a ui-sref=\"copilot-project-details({ id: project.id })\"><h5>{{ project.name || \'Unnamed Project\' }}</h5></a><p class=\"type\">{{ vm.typeMap[project.projectType] }} - {{project.createdAt | date:\'MM/dd/yyyy\'}}</p></card-header><card-main ng-if=\"project.status == \'ASSIGNED\'\" class=\"flex column\"><main class=\"solid flex column middle center flex-grow\"><img src=\"/images/project-claimed.svg\" class=\"icon biggest\"/><label>Project Claimed</label></main><footer class=\"flex bottom center\"><a ui-sref=\"copilot-project-details({ id: project.id })\" class=\"action button\">estimate</a></footer></card-main><card-main ng-if=\"project.status == \'ESTIMATED\'\" class=\"flex column\"><main class=\"solid flex column middle center flex-grow\"><img src=\"/images/quote-generated.svg\" class=\"icon biggest\"/><label>Projected Estimated</label></main><footer class=\"flex bottom center\"><p>Client is reviewing estimate</p></footer></card-main><card-main ng-if=\"project.status == \'APPROVED\'\" class=\"flex column\"><main class=\"solid flex column middle center flex-grow\"><img src=\"/images/project-approved.svg\" class=\"icon biggest\"/><label>Project Approved</label></main><footer class=\"flex bottom center\"><a ui-sref=\"copilot-project-details({ id: project.id })\" class=\"action button\">view project</a></footer></card-main><card-main ng-if=\"project.status == \'LAUNCHED\'\" class=\"flex column\"><main class=\"solid flex column middle center flex-grow\"><img src=\"/images/project-launched.svg\" class=\"icon biggest\"/><label>Project launched</label></main><footer class=\"flex bottom center\"><p>Check back later for updates</p></footer></card-main><card-main ng-if=\"project.status == \'COMPLETE\'\" class=\"complete flex column middle center\"><img src=\"/images/project-complete.svg\" class=\"icon biggest\"/><label>Project complete</label></card-main></project-card></li></ul><div ng-hide=\"vm.loading || vm.projects.length &gt; 0\" class=\"no-projects\"><p>You have not claimed any projects yet.</p></div>");
$templateCache.put("views/estimate-project.directive.html","<main ng-hide=\"vm.costEstimate\"><h3>Project Estimate</h3><hr class=\"biggest\"/><form ng-submit=\"vm.submit()\"><div class=\"cost-estimate flex space-between wrap\"><div class=\"cost\"><label>Cost</label><div class=\"fields flex middle\"><input ng-model=\"vm.payload.price.min\" type=\"number\" placeholder=\"$\" required=\"true\" min=\"0\"/><p>to</p><input ng-model=\"vm.payload.price.max\" type=\"number\" placeholder=\"$\" required=\"true\" min=\"0\"/></div></div><div class=\"duration\"><label>Project Duration</label><div class=\"fields flex middle\"><input ng-model=\"vm.payload.duration.min\" type=\"number\" placeholder=\"$\" required=\"true\" min=\"0\"/><p>to</p><input ng-model=\"vm.payload.duration.max\" type=\"number\" placeholder=\"$\" required=\"true\" min=\"0\"/><p>weeks</p></div></div></div><button class=\"action wider\">save estimates</button></form></main><div ng-show=\"vm.costEstimate\" class=\"success-message\"><div class=\"flex middle\"><div class=\"icon checkmark small\"></div><h3>Project Estimates</h3></div><hr class=\"biggest\"/><div class=\"estimates flex space-between\"><div class=\"costs\"><h6>Costs</h6><p>${{ vm.costEstimate.price.min }} - ${{ vm.costEstimate.price.max }}</p></div><div class=\"duration\"><h6>Duration</h6><p>{{ vm.costEstimate.duration.min }} - {{ vm.costEstimate.duration.max }} {{ vm.costEstimate.duration.unit }}s</p></div></div></div><loader ng-show=\"vm.loading\"></loader>");
$templateCache.put("views/ng-projects.directive.html","<loader ng-show=\"vm.loading\"></loader><ul class=\"flex wrap\"><li ng-repeat=\"project in vm.projects track by $index\" fitted-width=\"fitted-width\"><project-card class=\"elevated-bottom\"><card-header><div class=\"project-name\"><a ng-if=\"project.status != \'INCOMPLETE\' \" ui-sref=\"timeline({ workId: project.id })\"><h5>{{ project.name || \'unnamed project\' }}</h5></a><a ng-if=\"project.status == \'INCOMPLETE\' \" ui-sref=\"submit-work({ id: project.id })\"><h5>{{ project.name || \'unnamed project\' }}</h5></a><p class=\"type\">{{ vm.typeMap[project.projectType] }} - {{ project.status }}</p></div><button ng-if=\"project.copilot != null\" class=\"clean message-notification\"><a ui-sref=\"messaging({id: project.id, threadId: project.projectThread.id})\"><avatar avatar-url=\"{{project.copilot.avatar}}\" class=\"icon\"></avatar><div ng-if=\"project.projectThread.unreadCount &gt; 0\" class=\"notification absolute\">{{project.projectThread.unreadCount}}</div></a></button></card-header><card-main ng-if=\"project.status == \'INCOMPLETE\'\" class=\"flex center middle incomplete\"><main class=\"flex column middle center flex-grow\"><img src=\"/images/project-incomplete.svg\" class=\"icon biggest\"/><label>project setup incomplete</label><a ui-sref=\"submit-work({ id: project.id })\" class=\"button hollow\">continue setup</a></main></card-main><card-main ng-if=\"project.status == \'SUBMITTED\'\" class=\"flex column submitted\"><main class=\"solid flex column middle center\"><img src=\"/images/project-submitted.svg\" class=\"icon biggest\"/><label>project submitted</label></main><footer class=\"flex-grow flex column end\"><p>You are waiting for project approval</p><p class=\"secondary\">This should take about 1 day</p></footer></card-main><card-main ng-if=\"project.status == \'ASSIGNED\'\" class=\"flex column assigned\"><div class=\"flex column middle center flex-grow\"><h6>Meet your co-pilot</h6><avatar avatar-url=\"{{ project.copilot.avatar }}\" class=\"icon big\"></avatar><p>{{ project.copilot.handle || \'n/a\' }}</p></div><footer class=\"flex-grow flex column end\"><a ui-sref=\"messaging({ id: project.id, threadId: \'threadfor-\' + project.id })\" class=\"button action\">send a message</a></footer></card-main><card-main ng-if=\"project.status == \'ESTIMATED\'\"><main class=\"solid flex column middle center\"><img src=\"/images/quote-generated.svg\" class=\"icon biggest\"/><label>quote generated</label></main><footer><a ui-sref=\"timeline({ workId: project.id })\" class=\"button action\">view quote</a></footer></card-main><card-main ng-if=\"project.status == \'APPROVED\'\" class=\"flex column approved\"><main class=\"solid flex column middle center\"><img src=\"/images/project-approved.svg\" class=\"icon biggest\"/><label>quote approved</label></main><footer><p>Waiting for project launch</p><p class=\"secondary\">You\'ll be notified when the project starts</p></footer></card-main><card-main ng-if=\"project.status == \'LAUNCHED\' \" class=\"flex column launched\"><main class=\"solid flex column middle center\"><img src=\"/images/project-launched.svg\" class=\"icon biggest\"/><label>Project launched</label></main><footer class=\"flex-grow flex column end\"><p>Design phase starts in several days.</p></footer></card-main><card-main ng-if=\"project.status == \'COMPLETE\'\" class=\"complete flex center middle\"><main class=\"flex column middle center flex-grow\"><img src=\"/images/project-complete.svg\" class=\"icon biggest\"/><label>project complete!</label><a ui-sref=\"timeline({ workId: project.id })\" class=\"button hollow\">deploy my app</a></main></card-main><card-main ng-if=\"project.status == \'CHOOSE_WINNERS\'\" class=\"flex column\"><submission-card phase=\"{{project.activeWorkStep.name}}\" class=\"flex flex-grow column\"></submission-card></card-main><card-main ng-if=\"project.status == \'WINNERS_SELECTED\' &amp;&amp; project.activeWorkStep.name == \'Final Designs\' \" class=\"flex column winner\"><main class=\"flex column middle center flex-grow\"><div class=\"house\"><avatar class=\"icon biggest\"></avatar></div><p class=\"name\">{{project.activeWorkStep.winners[0].handle}}</p><p class=\"winner-text\">winner!</p></main><footer class=\"flex-grow flex column end\"><p>{{project.activeWorkStep.nextPhase.name}} phase next</p></footer></card-main><card-main ng-if=\"project.status == \'WINNERS_SELECTED\' &amp;&amp; project.activeWorkStep.name == \'Design Concepts\'\" class=\"flex column winners\"><main><ul class=\"flex column\"><li ng-repeat=\"winner in project.activeWorkStep.winners\" class=\"winner flex middle\"><avatar class=\"icon big\"></avatar><p class=\"name flex-grow\">{{ winner.handle }}</p><div class=\"rank\"><div class=\"value\">{{ winner.rank }}</div><div class=\"unit\">place</div></div></li></ul></main><footer class=\"flex-grow flex column end\"><p>{{ project.activeWorkStep.nextPhase.name }} phase next</p></footer></card-main><card-main ng-if=\"project.status == \'STEP_OPEN\'\" class=\"flex column\"><main class=\"solid flex column middle center\"><img src=\"/images/project-submitted.svg\" class=\"icon biggest\"/><label ng-if=\"project.activeWorkStep.name == \'Design Concepts\' ||  project.activeWorkStep.name == \'Final Designs\'\">Awaiting {{project.activeWorkStep.name}}</label><label ng-if=\"project.activeWorkStep.name == \'Final Fixes\'\">Awaiting final deliverables</label></main><footer class=\"flex-grow flex column end\"><p ng-if=\"project.activeWorkStep.name == \'Design Concepts\' ||  project.activeWorkStep.name == \'Final Designs\'\">Receive submissions in several days</p><p ng-if=\"project.activeWorkStep.name == \'Final Fixes\'\">Receive final submissions in several days</p></footer></card-main></project-card></li></ul><div ng-hide=\"vm.loading || vm.projects.length &gt; 0\" class=\"no-projects\"><p>You have not started any projects.</p></div>");
$templateCache.put("views/open-projects.directive.html","<loader ng-show=\"vm.loading\"></loader><ul class=\"flex wrap\"><li ng-repeat=\"project in vm.projects track by $index\" fitted-width=\"fitted-width\"><project-card class=\"elevated-bottom\"><card-header><a ui-sref=\"copilot-project-details({ id: project.id })\"><h5>{{ project.name || \'Unnamed Project\' }}</h5></a><p class=\"type\">{{ project.createdAt | date:\'MM/dd/yyyy\' }}</p></card-header><card-main class=\"flex column\"><main class=\"solid flex column middle center\"><img src=\"/images/design-colored.svg\" ng-if=\"project.projectType == \'DESIGN\'\"/><img src=\"/images/design-development-colored.svg\" ng-if=\"project.projectType == \'DESIGN_AND_CODE\'\"/><label>{{ vm.typeMap[project.projectType] }}</label></main><footer class=\"flex bottom center\"><a ui-sref=\"copilot-project-details({ id: project.id })\" class=\"action button\">view project</a></footer></card-main></project-card></li></ul><div ng-hide=\"vm.loading || vm.projects.length &gt; 0\" class=\"no-projects\"><p>There are no open projects.</p></div>");
$templateCache.put("views/project-details.directive.html","<loader ng-show=\"vm.loading\"></loader><div ng-class=\"{ active: vm.showConfirmClaim }\" class=\"confirm claim flex middle center\"><p ng-hide=\"vm.claimed\">Are you sure you want to claim this project?</p><div ng-show=\"vm.claimed\" class=\"flex bottom\"><div class=\"icon checkmark-white small\"></div><h5>Project claimed!</h5></div><button ng-click=\"vm.claim()\" ng-hide=\"vm.claiming || vm.claimed\" class=\"hollow\">yes, claim it!</button><button ng-click=\"vm.showConfirmClaim = !vm.showConfirmClaim\" ng-hide=\"vm.claiming || vm.claimed\" class=\"hollow\">cancel</button><div ng-show=\"vm.claiming\" class=\"loader-house\"><loader></loader></div></div><div ng-class=\"{ active: vm.showConfirmLaunch }\" class=\"confirm launch flex middle center\"><p ng-hide=\"vm.launched\">Are you sure you want to launch this project?</p><div ng-show=\"vm.launched\" class=\"flex bottom\"><div class=\"icon checkmark-white small\"></div><h5>Project launched!</h5></div><button ng-click=\"vm.launch()\" ng-hide=\"vm.launching || vm.launched\" class=\"hollow\">yes, launch it!</button><button ng-click=\"vm.showConfirmlaunch = !vm.showConfirmlaunch\" ng-hide=\"vm.launching || vm.launched\" class=\"hollow\">cancel</button><div ng-show=\"vm.launching\" class=\"loader-house\"><loader></loader></div></div><estimate-project project-id=\"{{ vm.id }}\" ng-if=\"vm.userType == \'COPILOT\'\" ng-class=\"{ active: vm.claimed }\" class=\"dark-bg\"></estimate-project><div class=\"flex rows\"><div class=\"house nav\"><button ng-if=\"vm.userType == \'COPILOT\' &amp;&amp; !vm.claimed\" ng-hide=\"vm.showConfirmClaim\" ng-click=\"vm.showConfirmClaim = !vm.showConfirmClaim\" class=\"action claim\">claim project</button><button ng-if=\"vm.userType == \'COPILOT\' &amp;&amp; vm.estimateAccepted\" ng-hide=\"vm.showConfirmLaunch\" ng-click=\"vm.showConfirmLaunch = !vm.showConfirmLaunch; vm.showConfirmClaim = false\" class=\"action launch\">launch project</button><ul><li><button scroll-element=\"projectSetup\" class=\"clean\">Project setup</button></li><li><button scroll-element=\"features\" class=\"clean\">Features</button></li><li><button scroll-element=\"design\" class=\"clean\">Design</button></li><li><button scroll-element=\"development\" class=\"clean\">Development</button></li></ul></div><ul ng-hide=\"vm.loading\" class=\"requirements flex-grow\"><li id=\"projectSetup\"><h3>Project Setup</h3><hr class=\"biggest\"/><h4>iOS platform details</h4><ul class=\"platform flex space-between\"><li class=\"device\"><h5>Device</h5><ul><li ng-repeat=\"device in vm.project.deviceIds\" class=\"flex middle\"><img ng-src=\"/images/icon-check.svg\" class=\"icon small\"/><span>{{ vm.textMap[device] || device }}</span></li></ul></li><li class=\"orientation\"><h5>Orientation</h5><ul><li ng-repeat=\"orientation in vm.project.orientationIds\" class=\"flex middle\"><img ng-src=\"/images/icon-check.svg\" class=\"icon small\"/><span>{{ vm.textMap[orientation] || orientation }}</span></li></ul></li></ul><h4>Project type</h4><div ng-if=\"vm.project.projectType == \'DESIGN\'\" class=\"project-type flex middle\"><img ng-src=\"/images/design-colored.svg\" class=\"biggest\"/><p>Design</p></div><div ng-if=\"vm.project.projectType != \'DESIGN\'\" class=\"project-type flex middle\"><img ng-src=\"/images/design-development-colored.svg\" class=\"biggest\"/><p>Design &amp; Development</p></div></li><li id=\"features\"><h3>Features</h3><hr class=\"biggest\"/><h4 ng-if=\"vm.project.files.features.length\">Uploaded features documents</h4><ul class=\"features-files\"><li ng-repeat=\"file in vm.project.files.features\"><a ng-if=\"file.downloadUrl\" href=\"{{file.downloadUrl}}\">{{file.filename}}</a></li></ul><h4>Features &amp; descriptions</h4><ul class=\"features-descriptions\"><li ng-repeat=\"feature in vm.project.features\"><p>{{ feature.title }}</p><p>{{ feature.description }}</p><hr/></li></ul></li><li id=\"design\"><h3>Design</h3><hr class=\"biggest\"/><h4 ng-if=\"vm.project.files.visuals.length\">Uploaded design documents</h4><ul class=\"design-files\"><li ng-repeat=\"file in vm.project.files.visuals\"><a ng-if=\"file.downloadUrl\" href=\"{{file.downloadUrl}}\">{{file.filename}}</a></li></ul><h4>URL to get styles</h4><a href=\"{{ url }}\" ng-repeat=\"url in vm.project.designUrls\" target=\"_blank\">{{ url }}</a><h4>Fonts</h4><div class=\"flex middle\"><div class=\"big-a\">A</div><span>{{ vm.project.fontIds.join(\', \') }}</span></div><h4>Colors</h4><ul class=\"color-swatches\"><li ng-repeat=\"color in vm.project.colorSwatchIds\"><img ng-src=\"/images/{{ vm.imageMap[color] }}.png\"/></li></ul><h4>Icons</h4><div ng-repeat=\"icon in vm.project.iconsetIds\" class=\"flex middle\"><img ng-src=\"/images/{{ vm.imageMap[icon] }}.svg\" class=\"icon biggest\"/><span>{{ vm.textMap[icon] }}</span></div></li><li id=\"development\"><h3>Development</h3><hr class=\"biggest\"/><h4 ng-if=\"vm.project.files.development.length\">Uploaded development documents</h4><ul class=\"development-files\"><li ng-repeat=\"file in vm.project.files.development\"><a ng-if=\"file.downloadUrl\" href=\"{{file.downloadUrl}}\">{{file.filename}}</a></li></ul><h4>What level of security is needed?</h4><p>Security level needed: {{ vm.project.securityLevel }}</p><h4>Access to data offline?</h4><p ng-if=\"vm.project.offlineAccess\">Yes, access to offline data is needed.</p><p ng-if=\"!vm.project.offlineAccess\">No, access to offline data is not needed.</p><h4>Is there any level of personal information? (stored or transmitted)?</h4><p ng-if=\"vm.project.usesPersonalInformation\">Yes, storing and/or transmitting personal information is needed.</p><p ng-if=\"!vm.project.usesPersonalInformation\">No, storing and/or transmitting personal information is not needed.</p><h4>How many 3rd party integrations?</h4><p>There are {{ vm.project.numberOfApiIntegrations }} integrations needed.</p></li></ul></div>");
$templateCache.put("views/submission-card.directive.html","<main class=\"solid flex column middle center\"><img src=\"/images/icon-download.svg\" class=\"icon biggest\"/><label ng-if=\"vm.phase == \'Design Concepts\'\">submissions received</label><label ng-if=\"vm.phase == \'Final Designs\'\">submissions received</label></main><footer class=\"flex-grow flex column end middle\"><a ui-sref=\"timeline({ workId: project.id })\" class=\"button action\">choose winners</a><p>{{ vm.end }} left to choose winners</p></footer>");}]);
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
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/claimed-projects.directive.html',
      controller: 'ClaimedProjectsController as vm',
      scope: {
        copilotId: '@copilotId'
      }
    };
  };

  angular.module('appirio-tech-ng-projects').directive('claimedProjects', directive);

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
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/project-details.directive.html',
      controller: 'ProjectDetailsController as vm',
      scope: {
        id: '@projectId',
        copilotId: '@copilotId'
      }
    };
  };

  angular.module('appirio-tech-ng-projects').directive('projectDetails', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submission-card.directive.html',
      controller: 'SubmissionCardController as vm',
      scope: {
        phase: '@phase',
        end: '@end'
      }
    };
  };

  angular.module('appirio-tech-ng-projects').directive('submissionCard', directive);

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
      'INCOMPLETE': 'Setup incomplete',
      'SUBMITTED': 'Project submitted',
      'ASSIGNED': 'Copilot assigned',
      'ESTIMATED': 'Project estimated',
      'APPROVED': 'Project approved',
      'LAUNCHED': 'Project launched',
      'MESSAGED': 'Project launched',
      'COMPLETE': 'Project completed'
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
  var OpenProjectsController;

  OpenProjectsController = function($scope, CopilotUnclaimedProjectsAPIService) {
    var activate, getProjects, orderProjectsByCreationDate, vm;
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
    orderProjectsByCreationDate = function(projects) {
      var orderedProjects;
      return orderedProjects = projects != null ? projects.sort(function(previous, next) {
        return new Date(next.createdAt) - new Date(previous.createdAt);
      }) : void 0;
    };
    getProjects = function() {
      var resource;
      vm.loading = true;
      resource = CopilotUnclaimedProjectsAPIService.query();
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

  OpenProjectsController.$inject = ['$scope', 'CopilotUnclaimedProjectsAPIService'];

  angular.module('appirio-tech-ng-projects').controller('OpenProjectsController', OpenProjectsController);

}).call(this);

(function() {
  'use strict';
  var ClaimedProjectsController;

  ClaimedProjectsController = function($scope, ProjectsAPIService) {
    var activate, setProjects, vm;
    vm = this;
    vm.projects = [];
    vm.loading = false;
    vm.statusMap = {
      'INCOMPLETE': 'Setup incomplete',
      'SUBMITTED': 'Project submitted',
      'ASSIGNED': 'Copilot assigned',
      'ESTIMATE': 'Project estimated',
      'APPROVED': 'Project approved',
      'LAUNCHED': 'Project launched',
      'MESSAGED': 'Project launched'
    };
    vm.typeMap = {
      'DESIGN': 'Design',
      'CODE': 'Code',
      'DESIGN_AND_CODE': 'Design/Code'
    };
    activate = function() {
      $scope.$watch('copilotId', function() {
        return setProjects();
      });
      return vm;
    };
    setProjects = function() {
      var params, resource;
      if ($scope.copilotId) {
        vm.loading = true;
        params = {
          filter: "copilotId=" + $scope.copilotId
        };
        resource = ProjectsAPIService.query(params);
        resource.$promise.then(function(response) {
          return vm.projects = response;
        });
        resource.$promise["catch"](function(response) {});
        return resource.$promise["finally"](function() {
          return vm.loading = false;
        });
      }
    };
    return activate();
  };

  ClaimedProjectsController.$inject = ['$scope', 'ProjectsAPIService'];

  angular.module('appirio-tech-ng-projects').controller('ClaimedProjectsController', ClaimedProjectsController);

}).call(this);

(function() {
  'use strict';
  var EstimateProjectController;

  EstimateProjectController = function($scope, ProjectsAPIService, ProjectEstimatesAPIService) {
    var activate, vm;
    vm = this;
    vm.projects = [];
    vm.loading = false;
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
      resource = ProjectEstimatesAPIService.post(params, {
        param: vm.payload
      });
      resource.$promise.then(function() {
        return vm.costEstimate = vm.payload;
      });
      return resource.$promise["finally"](function() {
        return vm.loading = false;
      });
    };
    activate = function() {
      var params, resource;
      vm.loading = true;
      params = {
        id: $scope.projectId
      };
      resource = ProjectsAPIService.get(params);
      resource.$promise.then(function(response) {
        return vm.costEstimate = response.costEstimate;
      });
      resource.$promise["finally"](function() {
        return vm.loading = false;
      });
      return vm;
    };
    return activate();
  };

  EstimateProjectController.$inject = ['$scope', 'ProjectsAPIService', 'ProjectEstimatesAPIService'];

  angular.module('appirio-tech-ng-projects').controller('EstimateProjectController', EstimateProjectController);

}).call(this);

(function() {
  'use strict';
  var ProjectDetailsController;

  ProjectDetailsController = function($scope, ProjectsAPIService, CopilotProjectDetailsAPIService) {
    var activate, vm;
    vm = this;
    vm.projects = [];
    vm.loading = false;
    vm.id = $scope.id;
    vm.showConfirmClaim = false;
    vm.showConfirmLaunch = false;
    vm.claiming = false;
    vm.claimed = false;
    vm.launching = false;
    vm.launched = false;
    vm.estimateAccepted = false;
    vm.userType = 'CUSTOMER';
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
      'THIN_LINE': 'icon-outlined',
      'BLUE': 'colors-blue',
      'RED': 'colors-red',
      'GREEN': 'colors-green',
      'ORANGE': 'colors-orange'
    };
    vm.claim = function() {
      var params, payload, resource;
      payload = {
        id: $scope.id
      };
      params = {
        userId: $scope.copilotId
      };
      resource = CopilotProjectDetailsAPIService.post(params, payload);
      vm.claiming = true;
      resource.$promise.then(function(response) {
        return vm.claimed = true;
      });
      resource.$promise["catch"](function(response) {});
      return resource.$promise["finally"](function() {
        return vm.claiming = false;
      });
    };
    vm.launch = function() {
      var params, payload, resource;
      params = {
        projectId: $scope.id,
        userId: $scope.copilotId
      };
      payload = {
        status: 'LAUNCHED'
      };
      resource = CopilotProjectDetailsAPIService.put(params, payload);
      vm.launching = true;
      resource.$promise.then(function(response) {
        return vm.launched = true;
      });
      resource.$promise["catch"](function(response) {});
      return resource.$promise["finally"](function() {
        return vm.launching = false;
      });
    };
    activate = function() {
      var params, resource;
      $scope.$watch('copilotId', function() {
        if ($scope.copilotId) {
          return vm.userType = 'COPILOT';
        }
      });
      vm.loading = true;
      params = {
        id: $scope.id
      };
      resource = ProjectsAPIService.get(params);
      resource.$promise.then(function(response) {
        vm.project = response;
        vm.claimed = response.copilotId !== 'unassigned';
        vm.launched = response.status === 'LAUNCHED';
        return vm.estimateAccepted = response.status === 'APPROVED';
      });
      resource.$promise["catch"](function(response) {});
      resource.$promise["finally"](function() {
        return vm.loading = false;
      });
      return vm;
    };
    return activate();
  };

  ProjectDetailsController.$inject = ['$scope', 'ProjectsAPIService', 'CopilotProjectDetailsAPIService'];

  angular.module('appirio-tech-ng-projects').controller('ProjectDetailsController', ProjectDetailsController);

}).call(this);

(function() {
  'use strict';
  var SubmissionCardController;

  SubmissionCardController = function($scope) {
    var activate, vm;
    vm = this;
    activate = function() {
      vm.phase = $scope.phase || 'DESIGN';
      vm.end = $scope.end || 'xx hours';
      return vm;
    };
    return activate();
  };

  SubmissionCardController.$inject = ['$scope'];

  angular.module('appirio-tech-ng-projects').controller('SubmissionCardController', SubmissionCardController);

}).call(this);

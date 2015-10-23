angular.module("app.constants", [])

.constant("API_URL", "https://api.topcoder.com")

.constant("AVATAR_URL", "https://www.topcoder.com")

.constant("SUBMISSION_URL", "https://studio.topcoder.com")

.constant("AUTH0_CLIENT_ID", "abc123")

.constant("AUTH0_DOMAIN", "topcoder.auth0.com")

.constant("AUTH0_TOKEN_NAME", "userJWTToken")

.constant("AUTH0_REFRESH_TOKEN_NAME", "userRefreshJWTToken")

;
(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-projects'];

  angular.module('example', dependencies);

}).call(this);

angular.module("example").run(["$templateCache", function($templateCache) {$templateCache.put("views/claimed-projects.example.html","<claimed-projects copilot-id=\"123\"></claimed-projects>");
$templateCache.put("views/estimate-project.example.html","<estimate-project project-id=\"123\"></estimate-project>");
$templateCache.put("views/open-projects.example.html","<open-projects copilot-id=\"123\"></open-projects>");
$templateCache.put("views/project-details.example.html","<div class=\"project-details-layout\"><project-details project-id=\"123\"></project-details></div>");
$templateCache.put("views/projects.example.html","<ng-projects></ng-projects>");}]);
(function() {
  'use strict';
  var config;

  config = function($stateProvider) {
    var key, results, state, states;
    states = {};
    states['projects'] = {
      url: '/',
      title: 'projects',
      templateUrl: 'views/projects.example.html'
    };
    states['open-projects'] = {
      url: '/open-projects',
      title: 'open projects',
      templateUrl: 'views/open-projects.example.html'
    };
    states['claimed-projects'] = {
      url: '/claimed-projects',
      title: 'claimed projects',
      templateUrl: 'views/claimed-projects.example.html'
    };
    states['estimate-project'] = {
      url: '/estimate-project',
      title: 'estimate project',
      templateUrl: 'views/estimate-project.example.html'
    };
    states['project-details'] = {
      url: '/project-details',
      title: 'project details',
      templateUrl: 'views/project-details.example.html'
    };
    results = [];
    for (key in states) {
      state = states[key];
      results.push($stateProvider.state(key, state));
    }
    return results;
  };

  config.$inject = ['$stateProvider'];

  angular.module('example').config(config).run();

}).call(this);

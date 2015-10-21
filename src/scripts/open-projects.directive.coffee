'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/open-projects.directive.html'
  controller  : 'OpenProjectsController as vm'
  scope       :
    projectId : '@projectId'

angular.module('appirio-tech-ng-projects').directive 'openProjects', directive

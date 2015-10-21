'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/open-projects.directive.html'
  controller  : 'OpenProjectsController as vm'
  scope       : true

angular.module('appirio-tech-ng-projects').directive 'openProjects', directive

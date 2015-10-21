'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/claimed-projects.directive.html'
  controller  : 'ClaimedProjectsController as vm'
  scope       : true

angular.module('appirio-tech-ng-projects').directive 'claimedProjects', directive

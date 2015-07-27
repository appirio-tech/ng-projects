'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/projects.directive.html'
  controller  : 'ProjectsController as vm'

angular.module('appirio-tech-ng-projects').directive 'projects', directive

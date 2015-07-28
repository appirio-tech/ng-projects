'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/ng-projects.directive.html'
  controller  : 'NgProjectsController as vm'

angular.module('appirio-tech-ng-projects').directive 'ngProjects', directive

'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/projects.directive.html'

angular.module('appirio-tech-ng-projects').directive 'projects', directive

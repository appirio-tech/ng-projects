'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/projects.directive.html'
  controller  : 'ProjectsController as vm'
  scope       :
    workId    : '@workId'

angular.module('appirio-tech-ng-projects').directive 'projects', directive

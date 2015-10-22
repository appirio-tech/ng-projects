'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/project-details.directive.html'
  controller  : 'ProjectDetailsController as vm'
  scope       :
    id: '@projectId'

angular.module('appirio-tech-ng-projects').directive 'projectDetails', directive

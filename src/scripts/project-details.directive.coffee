'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/project-details.directive.html'
  controller  : 'ProjectDetailsController as vm'
  scope       :
    id      : '@projectId'
    userType: '@userType'

angular.module('appirio-tech-ng-projects').directive 'projectDetails', directive

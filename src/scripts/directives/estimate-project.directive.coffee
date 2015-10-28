'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/estimate-project.directive.html'
  controller  : 'EstimateProjectController as vm'
  scope       :
    projectId : '@projectId'

angular.module('appirio-tech-ng-projects').directive 'estimateProject', directive

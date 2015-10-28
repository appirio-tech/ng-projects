'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/estimate-project.directive.html'
  controller  : 'EstimateProjectController as vm'
  scope       :
    projectId : '@projectId'
    onEstimated: '&onEstimated'

angular.module('appirio-tech-ng-projects').directive 'estimateProject', directive

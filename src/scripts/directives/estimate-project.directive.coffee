'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/estimate-project.directive.jade')()
  controller  : 'EstimateProjectController as vm'
  scope       :
    projectId : '@'
    permissions: '='

angular.module('appirio-tech-ng-projects').directive 'estimateProject', directive

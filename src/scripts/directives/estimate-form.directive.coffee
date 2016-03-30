'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/estimate-form.directive.html'
  controller  : 'EstimateFormController as vm'
  scope       :
    estimateType:  '@'
    projectId:     '@'
    estimates:     '='
    loading:       '='
    canUpdate:     '='

angular.module('appirio-tech-ng-projects').directive 'estimateForm', directive

'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/estimate-detail.directive.html'
  scope       :
    estimates: '='

angular.module('appirio-tech-ng-projects').directive 'estimateDetail', directive
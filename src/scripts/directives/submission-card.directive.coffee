'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submission-card.directive.html'
  controller  : 'SubmissionCardController as vm'
  scope       :
    phase: '@phase'
    end: '@end'
    id: '@id'
    stepId: '@stepId'

angular.module('appirio-tech-ng-projects').directive 'submissionCard', directive

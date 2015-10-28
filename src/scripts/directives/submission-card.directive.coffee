'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submission-card.directive.html'
  controller  : 'SubmissionCardController as vm'
  scope       :
    phase: '@phase'
    end: '@end'

angular.module('appirio-tech-ng-projects').directive 'submissionCard', directive

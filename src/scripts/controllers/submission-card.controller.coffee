'use strict'

SubmissionCardController = ($scope) ->
  vm = this

  activate = ->
    vm.phase = $scope.phase || 'DESIGN'
    vm.end   = $scope.end || 'xx hours'

    vm

  activate()

SubmissionCardController.$inject = ['$scope']

angular.module('appirio-tech-ng-projects').controller 'SubmissionCardController', SubmissionCardController

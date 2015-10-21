'use strict'

EstimateProjectController = ($scope, CopilotProjectDetailsAPIService) ->
  vm          = this
  vm.projects = []
  vm.loading  = false
  vm.saved    = false
  vm.payload  =
    price:
      min: 0
      max: 0
    duration:
      min: 0
      max: 0

  vm.submit = ->
    vm.loading = true
    params     = projectId: $scope.projectId
    resource   = CopilotProjectDetailsAPIService.put params, vm.payload

    resource.$promise.then ->
      vm.saved = true

    resource.$promise.finally ->
      vm.loading = false

  activate = ->
    vm

  getProjects = (params) ->

  activate()

EstimateProjectController.$inject = ['$scope', 'CopilotProjectDetailsAPIService']

angular.module('appirio-tech-ng-projects').controller 'EstimateProjectController', EstimateProjectController

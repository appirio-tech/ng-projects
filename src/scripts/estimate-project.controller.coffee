'use strict'

EstimateProjectController = ($scope, ProjectEstimatesAPIService) ->
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
      unit: 'week'

  vm.submit = ->
    vm.loading = true
    params     = id: $scope.projectId
    resource   = ProjectEstimatesAPIService.post params, vm.payload

    resource.$promise.then ->
      vm.saved = true

    resource.$promise.finally ->
      vm.loading = false

  activate = ->
    vm

  getProjects = (params) ->

  activate()

EstimateProjectController.$inject = ['$scope', 'ProjectEstimatesAPIService']

angular.module('appirio-tech-ng-projects').controller 'EstimateProjectController', EstimateProjectController

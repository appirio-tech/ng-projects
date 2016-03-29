'use strict'

EstimateProjectController = ($scope, ProjectsAPIService, ProjectEstimatesAPIService) ->
  vm             = this
  vm.projects    = []
  vm.loading     = false
  vm.permissions = $scope.permissions
  vm.canUpdate   = vm.permissions?.indexOf('UPDATE') > -1

  activate = ->
    vm.loading = true
    params     = id: $scope.projectId
    resource   = ProjectsAPIService.get params

    resource.$promise.then (response) ->
      vm.costEstimate = response.costEstimate
      vm.projectType = response.projectType

    resource.$promise.finally ->
      vm.loading = false

    vm

  activate()

EstimateProjectController.$inject = ['$scope', 'ProjectsAPIService', 'ProjectEstimatesAPIService']

angular.module('appirio-tech-ng-projects').controller 'EstimateProjectController', EstimateProjectController

'use strict'

EstimateFormController = ($scope, ProjectEstimatesAPIService) ->
  vm              = this
  vm.projectId    = $scope.projectId
  vm.estimateType = $scope.estimateType
  vm.canUpdate    = $scope.canUpdate

  vm.payload =
    estimateType: vm.estimateType
    estimateMin:  0
    estimateMax:  0
    durationMin:  0
    durationMax:  0
    durationUnit: 'WEEK'

  vm.submit = ->
    $scope.loading = true

    params     = id: vm.projectId

    resource   = ProjectEstimatesAPIService.post params, vm.payload

    resource.$promise.then ->
      $scope.estimates[vm.estimateType] = vm.payload

    resource.$promise.finally ->
      $scope.loading = false

  vm

EstimateFormController.$inject = ['$scope', 'ProjectEstimatesAPIService']

angular.module('appirio-tech-ng-projects').controller 'EstimateFormController', EstimateFormController
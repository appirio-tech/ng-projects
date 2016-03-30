'use strict'

EstimateFormController = ($scope) ->
  vm = this
  vm.projectId = $scope.projectId
  vm.estimateType = $scope.estimateType
  # vm.costEstimate = $scope.costEstimate
  vm.loading = $scope.loading
  vm.canUpdate = $scope.canUpdate

  vm.payload =
    estimateType: vm.estimateType
    estimateMin:  0
    estimateMax:  0
    durationMin:  0
    durationMax:  0
    durationUnit: 'WEEK'

  vm.submit = ->
    $scope.costEstimates[vm.estimateType] = vm.payload
    vm.loading = true
    params     = id: vm.projectId
    resource   = ProjectEstimatesAPIService.post params, vm.payload

    resource.$promise.then ->

    resource.$promise.finally ->
      vm.loading = false

  vm

EstimateFormController.$inject = ['$scope']

angular.module('appirio-tech-ng-projects').controller 'EstimateFormController', EstimateFormController
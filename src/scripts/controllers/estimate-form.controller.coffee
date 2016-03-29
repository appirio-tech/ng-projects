'use strict'

EstimateFormController = ($scope) ->
  vm = this
  vm.projectId = $scope.projectId
  vm.costEstimate = $scope.costEstimate

  vm.payload     =
    price:
      min: 0
      max: 0
    duration:
      min: 0
      max: 0
      unit: 'week'

  vm.submit = ->
    vm.loading = true
    params     = id: vm.projectId
    resource   = ProjectEstimatesAPIService.post params, param: vm.payload

    resource.$promise.then ->
      vm.costEstimate = vm.payload

    resource.$promise.finally ->
      vm.loading = false

  vm

EstimateFormController.$inject = ['$scope']

angular.module('appirio-tech-ng-projects').controller 'EstimateFormController', EstimateFormController
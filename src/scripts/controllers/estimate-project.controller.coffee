'use strict'

find = require 'lodash/find'

EstimateProjectController = ($scope, ProjectsAPIService) ->
  vm             = this
  vm.projects    = []
  vm.loading     = false
  vm.permissions = $scope.permissions
  vm.projectId   = $scope.projectId
  vm.canUpdate   = vm.permissions?.indexOf('UPDATE') > -1
  vm.estimates   = {}

  vm.hasAllEstimates = ->
    if vm.projectType == 'DESIGN'
      vm.estimates['DESIGN']
    else
      vm.estimates['DESIGN'] && vm.estimates['CODE']

  parseEstimates = (estimates) ->
    vm.estimates['CODE'] = find estimates, (estimate) ->
      estimate.estimateType == 'CODE'

    vm.estimates['DESIGN'] = find estimates, (estimate) ->
      estimate.estimateType == 'DESIGN'

  activate = ->
    vm.loading = true
    params     = id: vm.projectId
    resource   = ProjectsAPIService.get params

    resource.$promise.then (response) ->
      if response.estimates then parseEstimates response.estimates
      vm.projectType = response.projectType

    resource.$promise.finally ->
      vm.loading = false

    vm

  activate()

EstimateProjectController.$inject = ['$scope', 'ProjectsAPIService']

angular.module('appirio-tech-ng-projects').controller 'EstimateProjectController', EstimateProjectController

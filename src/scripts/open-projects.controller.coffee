'use strict'

OpenProjectsController = ($scope, ProjectsAPIService, CopilotProjectDetailsAPIService) ->
  vm          = this
  vm.projects = []
  vm.loading  = false
  vm.claimed  = {}
  vm.claiming = {}
  vm.typeMap  =
    'DESIGN'       : 'Design'
    'CODE'         : 'Code'
    'DESIGN_AND_CODE': 'Design/Code'

  activate = ->
    getProjects()

    vm

  vm.claim = (id) ->
    vm.claiming[id] = true
    payload  = id: id
    params   = userId: $scope.copilotId
    resource = CopilotProjectDetailsAPIService.post params, payload

    resource.$promise.then (response) ->
      vm.claimed[id] = true

    resource.$promise.finally ->
      vm.claiming[id] = false

  getProjects = ->
    vm.loading = true

    params =
      filter: 'copilotId=unassigned'

    resource = ProjectsAPIService.query params

    resource.$promise.then (response) ->
      vm.projects = response

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.loading = false

  activate()

OpenProjectsController.$inject = ['$scope', 'ProjectsAPIService', 'CopilotProjectDetailsAPIService']

angular.module('appirio-tech-ng-projects').controller 'OpenProjectsController', OpenProjectsController

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

  vm.claim = (projectId) ->
    vm.claiming[projectId] = true
    payload  = id: projectId
    params   = userId: $scope.copilotId
    resource = CopilotProjectDetailsAPIService.post params, payload

    resource.$promise.then (response) ->
      vm.claimed[projectId] = true

    resource.$promise.finally ->
      vm.claiming[projectId] = false

  getProjects = ->
    vm.loading = true

    params =
      filter: 'status=Submitted'

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

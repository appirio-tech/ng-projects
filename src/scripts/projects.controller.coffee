'use strict'




ProjectsController = ($scope, WorkAPIService) ->
  vm          = this
  vm.projects = []
  vm.loaded   = false

  vm.statusMap =
    'Incomplete': 'Setup incomplete'
    'Submitted' : 'Project submitted'
    'Assigned'  : 'Copilot assigned'
    'Estimate'  : 'Project approved!'
    'Launched'  : 'Project launched'
    'Messaged'  : 'Project launched'

  vm.typeMap =
    'design': 'Design'
    'code'  : 'Code'
    'both'  : 'Design/Code'

  activate = ->
    params =
      workId: $scope.workId

    getProjects params

    vm

  getProjects = (params) ->
    resource = WorkAPIService.get params

    resource.$promise.then (response) ->
      vm.projects = response

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.loaded = true

  activate()

ProjectsController.$inject = ['$scope', 'WorkAPIService']

angular.module('appirio-tech-ng-projects').controller 'ProjectsController', ProjectsController

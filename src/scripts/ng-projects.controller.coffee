'use strict'

NgProjectsController = ($scope, WorkAPIService) ->
  vm          = this
  vm.projects = []
  vm.loaded   = false

  vm.statusMap =
    'INCOMPLETE': 'Setup incomplete'
    'SUBMITTED' : 'Project submitted'
    'ASSIGNED'  : 'Copilot assigned'
    'ESTIMATED' : 'Project approved'
    'LAUNCHED'  : 'Project launched'
    'MESSAGED'  : 'Project launched'

  vm.typeMap =
    'DESIGN'          : 'Design'
    'CODE'            : 'Code'
    'DESIGN_AND_CODE' : 'Design/Code'

  activate = ->
    getProjects()

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

NgProjectsController.$inject = ['$scope', 'WorkAPIService']

angular.module('appirio-tech-ng-projects').controller 'NgProjectsController', NgProjectsController

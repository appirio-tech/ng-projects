'use strict'

NgProjectsController = ($scope, WorkAPIService) ->
  vm          = this
  vm.projects = []
  vm.loaded   = false

  vm.statusMap =
    'Incomplete': 'Setup incomplete'
    'Submitted' : 'Project submitted'
    'Assigned'  : 'Copilot assigned'
    'Estimate'  : 'Project estimated'
    'Approved'  : 'Project approved'
    'Launched'  : 'Project launched'
    'Messaged'  : 'Project launched'

  vm.typeMap =
    'design'       : 'Design'
    'code'         : 'Code'
    'designAndCode': 'Design/Code'

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

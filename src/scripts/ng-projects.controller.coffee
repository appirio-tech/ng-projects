'use strict'

NgProjectsController = ($scope, WorkAPIService) ->
  vm          = this
  vm.projects = []
  vm.loading  = false

  vm.statusMap =
    'Incomplete': 'Setup incomplete'
    'Submitted' : 'Project submitted'
    'Assigned'  : 'Copilot assigned'
    'Estimate'  : 'Project estimated'
    'Approved'  : 'Project approved'
    'Launched'  : 'Project launched'
    'Messaged'  : 'Project launched'

  vm.typeMap =
    'DESIGN'       : 'Design'
    'CODE'         : 'Code'
    'DESIGN_AND_CODE': 'Design/Code'

  activate = ->
    getProjects()

    vm

  getProjects = (params) ->
    vm.loading = true

    resource = WorkAPIService.get params

    resource.$promise.then (response) ->
      vm.projects = response

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.loading = false

  activate()

NgProjectsController.$inject = ['$scope', 'WorkAPIService']

angular.module('appirio-tech-ng-projects').controller 'NgProjectsController', NgProjectsController

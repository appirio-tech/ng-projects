'use strict'

OpenProjectsController = ($scope, WorkAPIService) ->
  vm          = this
  vm.projects = []
  vm.loading  = false
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

OpenProjectsController.$inject = ['$scope', 'WorkAPIService']

angular.module('appirio-tech-ng-projects').controller 'OpenProjectsController', OpenProjectsController

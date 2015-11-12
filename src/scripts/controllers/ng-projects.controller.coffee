'use strict'

NgProjectsController = ($scope, WorkAPIService, ProjectsAPIService) ->
  vm          = this
  vm.projects = []
  vm.loading  = false

  vm.statusMap =
    'INCOMPLETE': 'Setup Incomplete'
    'SUBMITTED' : 'Project Submitted'
    'ASSIGNED'  : 'Copilot Assigned'
    'ESTIMATED' : 'Project Estimated'
    'APPROVED'  : 'Project Approved'
    'LAUNCHED'  : 'Project Launched'
    'MESSAGED'  : 'Project Launched'
    'COMPLETE'  : 'Project Completed'

  vm.typeMap =
    'DESIGN'       : 'Design'
    'CODE'         : 'Code'
    'DESIGN_AND_CODE': 'Design/Code'

  activate = ->
    getProjects()

    vm

  orderProjectsByCreationDate = (projects) ->
    orderedProjects = projects?.sort (previous, next) ->
      new Date(next.createdAt) - new Date(previous.createdAt)

    orderedProjects

  getProjects = (params) ->
    vm.loading = true

    resource = ProjectsAPIService.query()

    resource.$promise.then (response) ->
      vm.projects = orderProjectsByCreationDate response

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.loading = false

  activate()

NgProjectsController.$inject = ['$scope', 'WorkAPIService', 'ProjectsAPIService']

angular.module('appirio-tech-ng-projects').controller 'NgProjectsController', NgProjectsController

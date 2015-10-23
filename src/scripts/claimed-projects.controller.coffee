'use strict'

ClaimedProjectsController = ($scope, ProjectsAPIService, UserV3Service) ->
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
    vm.loading = true

    $scope.$watch UserV3Service.getCurrentUser, ->
      user = UserV3Service.getCurrentUser()

      setProjects(user.id) if user

    vm

  setProjects = (copilotId) ->
    params =
      filter: "copilotId=#{copilotId}"

    resource = ProjectsAPIService.query params

    resource.$promise.then (response) ->
      vm.projects = response

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.loading = false

  activate()

ClaimedProjectsController.$inject = ['$scope', 'ProjectsAPIService', 'UserV3Service']

angular.module('appirio-tech-ng-projects').controller 'ClaimedProjectsController', ClaimedProjectsController

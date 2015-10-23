'use strict'

ClaimedProjectsController = ($scope, ProjectsAPIService) ->
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
    $scope.$watch 'copilotId', ->
      setProjects()

    vm

  setProjects = ->
    if $scope.copilotId
      vm.loading = true

      params =
        filter: "copilotId=#{$scope.copilotId}"

      resource = ProjectsAPIService.query params

      resource.$promise.then (response) ->
        vm.projects = response

      resource.$promise.catch (response) ->
        # TODO: handle error

      resource.$promise.finally ->
        vm.loading = false

  activate()

ClaimedProjectsController.$inject = ['$scope', 'ProjectsAPIService']

angular.module('appirio-tech-ng-projects').controller 'ClaimedProjectsController', ClaimedProjectsController

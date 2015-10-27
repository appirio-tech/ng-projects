'use strict'

ProjectDetailsController = ($scope, ProjectsAPIService, CopilotProjectDetailsAPIService) ->
  vm                  = this
  vm.projects         = []
  vm.loading          = false
  vm.id               = $scope.id
  vm.showConfirmClaim = false
  vm.claiming         = false
  vm.claimed          = false
  vm.userType         = 'CUSTOMER'

  vm.textMap  = # this is retarted!
    'IWATCH'     : 'iWatch'
    'IPHONE'     : 'iPhone'
    'IPad'       : 'iPad'
    'PORTRAIT'   : 'Portrait'
    'LANDSCAPE'  : 'Landscape'
    'FLAT_COLORS': 'FLAT, COLORS'
    'SOLID_LINE' : 'SOLID LINE'
    'THIN_LINE'  : 'THIN LINE'

  vm.imageMap =
    'FLAT_COLORS': 'icon-flat-color'
    'SOLID_LINE' : 'icon-solid'
    'THIN_LINE'  : 'icon-solid'

  vm.claim = ->
    payload     = id: $scope.id
    params      = userId: $scope.copilotId
    resource    = CopilotProjectDetailsAPIService.post params, payload
    vm.claiming = true

    resource.$promise.then (response) ->
      vm.claimed = true

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.claiming = false

  activate = ->
    $scope.$watch 'copilotId', ->
      vm.userType = 'COPILOT' if $scope.copilotId

    vm.loading = true
    params     = id: $scope.id
    resource   = ProjectsAPIService.get params

    resource.$promise.then (response) ->
      vm.project = response
      vm.claimed = response.copilotId != 'unassigned'

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.loading = false

    vm

  activate()

ProjectDetailsController.$inject = ['$scope', 'ProjectsAPIService', 'CopilotProjectDetailsAPIService']

angular.module('appirio-tech-ng-projects').controller 'ProjectDetailsController', ProjectDetailsController

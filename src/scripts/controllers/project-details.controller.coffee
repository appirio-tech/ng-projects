'use strict'

ProjectDetailsController = ($scope, ProjectsAPIService, CopilotProjectDetailsAPIService) ->
  vm                   = this
  vm.projects          = []
  vm.loading           = false
  vm.id                = $scope.id
  vm.showConfirmClaim  = false
  vm.showConfirmLaunch = false
  vm.claiming          = false
  vm.claimed           = false
  vm.launching         = false
  vm.launched          = false
  vm.estimateAccepted  = false
  vm.userType          = 'CUSTOMER'

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
    'THIN_LINE'  : 'icon-outlined'
    'BLUE'       : 'colors-blue'
    'RED'        : 'colors-red'
    'GREEN'      : 'colors-green'
    'ORANGE'     : 'colors-orange'

  #TODO: Combine code with launch
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

  vm.launch = ->
    params       =
      projectId: $scope.id
      userId   : $scope.copilotId

    payload      = status: 'LAUNCHED'
    resource     = CopilotProjectDetailsAPIService.put params, payload
    vm.launching = true

    resource.$promise.then (response) ->
      vm.launched = true

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.launching = false

  mapFonts = (fonts) ->
    mappedFonts = fonts.map (font) ->
      if font == 'SANS_SERIF'
        'SANS SERIF'
      else
        font

  activate = ->
    $scope.$watch 'copilotId', ->
      vm.userType = 'COPILOT' if $scope.copilotId

    vm.loading = true
    params     = id: $scope.id
    resource   = ProjectsAPIService.get params

    resource.$promise.then (response) ->
      vm.project          = response
      vm.project.fonts    = mapFonts vm.project.fontIds
      vm.claimed          = response.copilotId != 'unassigned'
      vm.launched         = response.status == 'LAUNCHED'
      vm.estimateAccepted = response.status == 'APPROVED'

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.loading = false

    vm

  activate()

ProjectDetailsController.$inject = ['$scope', 'ProjectsAPIService', 'CopilotProjectDetailsAPIService']

angular.module('appirio-tech-ng-projects').controller 'ProjectDetailsController', ProjectDetailsController

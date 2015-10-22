'use strict'

ProjectDetailsController = ($scope, ProjectsAPIService) ->
  vm          = this
  vm.projects = []
  vm.loading  = false
  vm.textMap = # this is retarted!
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
    'SOLID_LINE': 'icon-solid'
    'THIN_LINE': 'icon-solid'

  activate = ->
    vm.loading = true
    params     = id: $scope.id
    resource   = ProjectsAPIService.get params

    resource.$promise.then (response) ->
      vm.project = response

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.loading = false

    vm

  activate()

ProjectDetailsController.$inject = ['$scope', 'ProjectsAPIService']

angular.module('appirio-tech-ng-projects').controller 'ProjectDetailsController', ProjectDetailsController

'use strict'

ProjectsController = ($scope) ->
  vm          = this
  project     =
    name: "a very long freaking name"
    requestType: "mobile a ssd sdkj ksjd"
    message: "project submitted submitted submitted"
  project2     =
    name: "a very long freaking name"
    requestType: "mobile"
  vm.projects = [project, project2, 2, 3, 4]
  vm.loaded   = false

  activate = ->
    params =
      workId: $scope.workId

    getProjects params

    vm

  getProjects = ->
    #TO DO: get projects

  activate()

ProjectsController.$inject = ['$scope']

angular.module('appirio-tech-ng-projects').controller 'ProjectsController', ProjectsController

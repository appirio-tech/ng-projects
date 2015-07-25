'use strict'

config = ($stateProvider) ->
  states = {}

  states['projects'] =
    url         : '/'
    title       : 'projects'
    templateUrl : 'views/projects.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()



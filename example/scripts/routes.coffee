'use strict'

config = ($stateProvider) ->
  states = {}

  states['projects'] =
    url         : '/'
    title       : 'projects'
    templateUrl : 'views/projects.example.html'

  states['open-projects'] =
    url         : '/open-projects'
    title       : 'open projects'
    templateUrl : 'views/open-projects.example.html'

  states['claimed-projects'] =
    url         : '/claimed-projects'
    title       : 'claimed projects'
    templateUrl : 'views/claimed-projects.example.html'

  states['estimate-project'] =
    url         : '/estimate-project'
    title       : 'estimate project'
    templateUrl : 'views/estimate-project.example.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()



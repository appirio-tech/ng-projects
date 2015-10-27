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

  states['project-details'] =
    url         : '/project-details'
    title       : 'project details'
    templateUrl : 'views/project-details.example.html'

  states['copilot-project-details'] =
    url         : '/copilot-project-details'
    title       : 'copilot project details'
    templateUrl : 'views/copilot-project-details.example.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()



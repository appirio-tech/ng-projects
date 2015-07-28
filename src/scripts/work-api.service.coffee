'use strict'

transformResponse = (response) ->
  parsed = JSON.parse response

  parsed?.result?.content || []

srv = ($resource, API_URL) ->
  url = API_URL + '/work/:workId'

  params =
    workId: '@workId'

  methods =
    query:
      method           : 'GET'
      isArray          : true
      transformResponse: transformResponse

    get:
      method           : 'GET'
      isArray          : true
      transformResponse: transformResponse

  $resource url, params, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-projects').factory 'WorkAPIService', srv
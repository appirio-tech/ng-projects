projectsText = null

describe 'login', ->
  beforeEach (done) ->
    browser.get 'http://localhost:9999/#/'

    $('projects').getText().then (value) ->
      projectsText = value

      done()

  it 'should have batman in header', ->
    expect(projectsText.length).to.be.ok

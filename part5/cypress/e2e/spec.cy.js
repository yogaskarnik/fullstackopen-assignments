describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset/')
    const user = {
      name: 'Yogas Karnik',
      username: 'ykarnik',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000/')
  })

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000/api/blogs/')
    cy.contains('log in to application')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000/api/blogs/')
    cy.contains('log in to application')
    cy.contains('login').click()
  })
})

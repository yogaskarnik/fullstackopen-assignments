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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('ykarnik')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('.success')
        .should('contain', 'Login successful')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Yogas Karnik logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('ykarnik')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Yogas Karnik logged in').should('not.exist')
    })
  })
})

describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset/')
    const user = {
      name: 'Yogas Karnik',
      username: 'ykarnik',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)

    cy.request('POST', 'http://localhost:3000/api/login/', {
      username: 'ykarnik',
      password: 'salainen',
    }).then(({ body }) => {
      console.log(body)
      localStorage.setItem('loggedInBlogUser', JSON.stringify(body))
      const blog = {
        title: 'Using Cypress for E2E testing',
        author: 'Yogas Karnik',
        url: 'http://e2etesting.com',
        user: body.id,
      }
      cy.request({
        url: 'http://localhost:3000/api/blogs/',
        method: 'POST',
        body: blog,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('loggedInBlogUser')).token
          }`,
        },
      })
    })
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('ykarnik')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('A new blog')
      cy.get('#author').type('Yogas')
      cy.get('#url').type('http://yogas.com')
      cy.get('#create-blog').click()

      cy.get('#blog-list').contains('A new blog Yogas')

      cy.contains('A new blog Yogas').should('exist')
    })
  })
  describe('users can like a blog', function () {
    it.only('like a blog', function () {
      cy.get('#blog-show').click()
      cy.get('#blog-like').click()
    })
  })
})

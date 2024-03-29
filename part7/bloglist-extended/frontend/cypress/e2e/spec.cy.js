describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset/')
    cy.createDefaultUser()
    cy.visit('http://localhost:3000')
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
      cy.login({ username: 'ykarnik', password: 'salainen' })

      const blog = {
        title: 'Using Cypress for E2E testing',
        author: 'Yogas Karnik',
        url: 'http://e2etesting.com',
      }
      cy.createBlog(blog)
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('.blog-list').contains('Using Cypress for E2E testing')

      cy.contains('Using Cypress for E2E testing').should('exist')
    })
  })
  describe('users can like a blog', function () {
    beforeEach(function () {
      cy.login({ username: 'ykarnik', password: 'salainen' })

      const blog = {
        title: 'Using Cypress for E2E testing',
        author: 'Yogas Karnik',
        url: 'http://e2etesting.com',
      }
      cy.createBlog(blog)
    })
    it('like a blog', function () {
      cy.get('#blog-show').click()
      cy.get('#blog-like').click()
    })
  })

  describe('user can delete blog', function () {
    beforeEach(function () {
      cy.login({ username: 'ykarnik', password: 'salainen' })

      const blog = {
        title: 'This blog can be deleted by the user who created it',
        author: 'Yogas Karnik',
        url: 'http://e2etesting.com',
      }
      cy.createBlog(blog)
    })
    it('user who created blog can delete it', function () {
      cy.contains('This blog can be deleted by the user who created it')
      cy.get('#blog-show').click()
      cy.get('#blog-delete').click()
    })

    it('user who created the blog only can see it', function () {
      cy.login({ username: 'krasane', password: 'salainen' })
      cy.contains('This blog can be deleted by the user who created it')
      cy.get('#blog-show').click()

      cy.get('#blog-delete').should('not.exist')
    })
  })

  describe('blog with most likes', function () {
    beforeEach(function () {
      cy.login({ username: 'ykarnik', password: 'salainen' })
      const blogWithMostLikes = {
        title: 'The blog with most likes',
        author: 'Amazing blogger 1',
        url: 'http://test1.com',
      }
      cy.createBlog(blogWithMostLikes)
      const blogWithSecondMostLikes = {
        title: 'The blog with second most likes',
        author: 'Amazing blogger 2',
        url: 'http://test2.com',
      }
      cy.createBlog(blogWithSecondMostLikes)
    })
    it.only('blogs ordered according to likes', function () {
      cy.contains('The blog with most likes Amazing blogger 1')
        .contains('view')
        .click()

      cy.get('.blog-list')
        .contains('The blog with most likes Amazing blogger 1')
        .find('#blog-like')
        .click()
        .click()
        .click()

      cy.contains('The blog with second most likes Amazing blogger 2')
        .contains('view')
        .click()

      cy.get('.blog-list')
        .contains('The blog with second most likes Amazing blogger 2')
        .find('#blog-like')
        .click()
        .click()

      cy.get('.blog-list')
        .eq(0)
        .should('contain', 'The blog with most likes Amazing blogger 1')
      cy.get('.blog-list')
        .eq(1)
        .should('contain', 'The blog with second most likes Amazing blogger 2')
    })
  })
})

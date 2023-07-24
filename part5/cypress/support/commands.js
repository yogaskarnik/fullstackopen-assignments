Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3000/api/login/', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedInBlogUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (blog) => {
  console.log('user ', JSON.parse(localStorage.getItem('loggedInBlogUser')))
  cy.request({
    url: 'http://localhost:3000/api/blogs/',
    method: 'POST',
    user: JSON.parse(localStorage.getItem('loggedInBlogUser')).id,
    body: blog,
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedInBlogUser')).token
      }`,
    },
  })
  cy.visit('http://localhost:3000')
})

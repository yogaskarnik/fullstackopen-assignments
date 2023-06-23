const dummy = (blogs) => {
  return 1
}

const totalLikes = (listOfBlogs) => {
  return listOfBlogs.reduce(
    (accumulator, blogs) => accumulator + blogs.likes,
    0
  )
}

const favoriteBlog = (listOfBlogs) => {
  return listOfBlogs.reduce(
    (prev, current) => (prev.likes > current.likes ? prev : current),
    {}
  )
}

const mostBlogs = (listOfBlogs) => {
  const blogCounts = {}
  for (let i = 0; i < listOfBlogs.length; i++) {
    const { author } = listOfBlogs[i]

    blogCounts[author] = (blogCounts[author] || 0) + 1
  }
  console.log('blogCounts ', blogCounts)
  let topAuthor = ''
  let maxBlogs = 0

  for (const author in blogCounts) {
    if (blogCounts[author] > maxBlogs) {
      topAuthor = author
      maxBlogs = blogCounts[author]
    }
  }

  return {
    author: topAuthor,
    blogs: blogCounts[topAuthor],
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }

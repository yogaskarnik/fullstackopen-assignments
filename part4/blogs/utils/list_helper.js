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

const mostLikes = (listOfBlogs) => {
  const likesCount = {}
  for (let i = 0; i < listOfBlogs.length; i++) {
    const { author, likes } = listOfBlogs[i]
    likesCount[author] = (likesCount[author] || 0) + likes
  }
  let topAuthor = ''
  let maxLikes = 0

  for (const author in likesCount) {
    if (likesCount[author] > maxLikes) {
      topAuthor = author
      maxLikes = likesCount[author]
    }
  }
  return {
    author: topAuthor,
    likes: maxLikes,
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }

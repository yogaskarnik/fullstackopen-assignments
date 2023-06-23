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

module.exports = { dummy, totalLikes, favoriteBlog }

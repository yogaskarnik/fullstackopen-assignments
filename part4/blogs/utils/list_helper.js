const dummy = (blogs) => {
  return 1
}

const totalLikes = (listOfBlogs) => {
  return listOfBlogs
    .map((blogs) => blogs.likes)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

module.exports = { dummy, totalLikes }

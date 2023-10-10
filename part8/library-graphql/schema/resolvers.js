const Book = require('../models/bookSchema');
const Author = require('../models/authorSchema');
const { GraphQLError } = require('graphql');

const resolvers = {
  Query: {
    bookCount: async () => {
      try {
        return await Book.collection.countDocuments();
      } catch (error) {
        console.error(error);
        throw new GraphQLError('Error counting books.');
      }
    },
    authorCount: async () => {
      try {
        return await Author.collection.countDocuments();
      } catch (error) {
        console.error(error);
        throw new GraphQLError('Error counting authors.');
      }
    },
    allBooks: async (root, args) => {
      try {
        const filter = {};
        if (args.author) {
          const author = await Author.findOne({ name: args.author });
          if (author) filter.author = author._id;
        }
        if (args.genre) {
          filter.genres = { $in: [args.genre] };
        }
        const books = await Book.find(filter).populate('author').exec();
        return books.map((book) => {
          book.id = book._id.toString();
          return book;
        });
      } catch (error) {
        if (err.name === 'ValidationError') {
          for (field in err.errors) {
            throw new GraphQLError(err.errors[field].message);
          }
        }
        throw new GraphQLError('Error retrieving books.');
      }
    },
    allAuthors: async () => {
      try {
        return await Author.find({});
      } catch (error) {
        console.error(error);
        throw new GraphQLError('Error retrieving authors.');
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id,
        });

        const savedBook = await book.save();
      } catch (err) {
        if (err.name === 'ValidationError') {
          for (field in err.errors) {
            throw new GraphQLError(err.errors[field].message);
          }
        }
        throw new GraphQLError('Error adding author.');
      }
    },
    editAuthor: async (root, args) => {
      try {
        console.log('editAuthor ', args);

        const author = await Author.findOne({ name: args.name });
        if (!author) throw new GraphQLError('Author not found.');

        author.born = args.setBornTo;
        return await author.save();
      } catch (error) {
        console.error(error);
        throw new GraphQLError('Error updating author information.');
      }
    },
  },
};

module.exports = resolvers;

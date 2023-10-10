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
        console.error(error);
        throw new GraphQLError('Error retrieving books.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
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
  Author: {
    bookCount: async (root, args) => {
      try {
        return await Book.countDocuments({ author: root._id });
      } catch (error) {
        console.error(error);
        throw new GraphQLError('Error retrieving book count for author.');
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
      } catch (error) {
        console.error(error);
        throw new GraphQLError('Error adding book.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) throw new GraphQLError('Author not found.');

        author.born = args.born;
        return await author.save();
      } catch (error) {
        console.error(error);
        throw new GraphQLError('Error updating author information.');
      }
    },
  },
};

module.exports = resolvers;

const Book = require('../models/bookSchema');
const Author = require('../models/authorSchema');
const User = require('../models/userSchema');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

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
        if (err.name === 'ValidationError' && typeof err.errors === 'object') {
          for (field in err.errors) {
            throw new GraphQLError(err.errors[field].message);
          }
        }
        console.error(err);
        throw new GraphQLError('Error retrieving books.');
      }
    },
    allAuthors: async (root, args, context, info) => {
      try {
        const authors = await Author.find({});

        if (
          info.fieldNodes[0].selectionSet.selections.some(
            (sel) => sel.name.value === 'bookCount'
          )
        ) {
          const bookCounts = await Book.aggregate([
            { $group: { _id: '$author', count: { $sum: 1 } } },
          ]);
          const bookCountMap = {};
          bookCounts.forEach(({ _id, count }) => {
            bookCountMap[_id.toString()] = count;
          });

          return authors.map((author) => ({
            ...author._doc,
            bookCount: bookCountMap[author._id.toString()] || 0,
          }));
        }

        return authors;
      } catch (error) {
        console.error(error);
        throw new GraphQLError('Error retrieving authors.');
      }
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new GraphQLError('not authorized', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }

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
        const savedBookWithId = await Book.findById(savedBook._id).populate(
          'author'
        );
        pubsub.publish('BOOK_ADDED', { bookAdded: savedBookWithId });

        return savedBookWithId;
      } catch (err) {
        if (err.name === 'ValidationError' && typeof err.errors === 'object') {
          for (field in err.errors) {
            throw new GraphQLError(err.errors[field].message);
          }
        }
        console.error(err);
        throw new GraphQLError('Error adding author.');
      }
    },
    editAuthor: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new GraphQLError('Authentication required.');
        }

        const author = await Author.findOne({ name: args.name });
        if (!author) throw new GraphQLError('Author not found.');

        author.born = args.setBornTo;
        return await author.save();
      } catch (error) {
        console.error(error);
        throw new GraphQLError('Error updating author information.');
      }
    },
    createUser: async (root, args) => {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash('secret', saltRounds);

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        passwordHash,
      });

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user) {
        throw new GraphQLError('Invalid username or password');
      }
      const passwordCorrect = await bcrypt.compare('secret', user.passwordHash);

      if (!passwordCorrect) {
        throw new GraphQLError('Invalid username or password');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;

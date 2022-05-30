//IMPORT
const { User, Thought, Reaction } = require('../models');

const resolvers = {
    Query: {
        //ALL
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        //ONE BY ID
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        //ALL USERS
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        //USER BY USERNAME
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },

    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return user;
        },
        login: async () => {

        }
    }

};

module.exports = resolvers;
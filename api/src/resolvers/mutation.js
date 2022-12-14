const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();

// API mutation code:

module.exports = {
    newList: async (parent, args, { models, user, family }) => {
      // if there is no user on the context, throw an authentication error
      if (!user) {
        throw new AuthenticationError('You must be signed in to create a list');
      }

      return await models.List.create({
          listName,
          creator: mongoose.Types.ObjectId(user.id),
          familyName: mongoose.Types.ObjectId(family.id),
          disabled: false
      });
    },
    deleteList: async (parent, { id }, { models, user }) => {
        // if not a user, throw an Authentication error
        if (!user) {
          throw new AuthenticationError('You must be signed in to delete a list');
        }

        const list = await models.List.findById(id);
        // if the list owner and the current user don't match, throw a forbidden error
        if (list && String(list.creator) !== user.id) {
          throw new ForbiddenError("You don't have permission to delete the list");
        }

        try {
          // if everything checks out, remove the list
            await models.List.findOneAndRemove({_id:id});
            return true;
        } catch (err) {
            // if there is an error, return false
            return false;
        }
    },
    updateList: async (parent, { listName, id}, { models, family, user }) => {
        // if not a user, throw an Authentication error
        if (!user) {
          throw new AuthenticationError('You must be signed in to update a list');
        }

        // find the list
        const list = await models.list.findById(id);
        // if the list owner and the current user don't match, throw a forbidden error
        if (list && String(family.familyMember) !== user.id) {
          throw new ForbiddenError("You don't have the permission to upate the list");
        }

        // update the list in the db and return the updated list
        return await models.List.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    listName
                }
            },
            {
                new: true
            }
        );
    },
    
    signUp: async (parent, { username, email, password }, { models }) => {
        // normalize email address
        email = email.trim().toLowerCase();
        // hash the password
        const hashed = await bcrypt.hash(password, 10);
        try {
          // käytetään mongoosen mallia, await pakottaa
          // odottamaan, että käyttäjä on luotu
          const user = await models.User.create({
            username,
            email,
            password: hashed
          });
    
          // create and return the json web token
          return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        } catch (err) {
          // if there's a problem creating the account, throw an error
          throw new Error('Error creating account');
        }
    },

    logIn: async (parent, { username, email, password }, { models }) => {
      if (email) {
        // normalize email address
        email = email.trim().toLowerCase();
      }
  
      const user = await models.User.findOne({
        $or: [{ email }, { username }]
      });
  
      // if no user is found, throw an authentication error
      if (!user) {
        throw new AuthenticationError('Error signing in');
      }
  
      // if the passwords don't match, throw an authentication error
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('Error signing in');
      }
  
      // create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },
    
    deactivateList: async (parent, { listName, id}, { models, user }) => {
      // if not a user, throw an Authentication error
      if (!user) {
        throw new AuthenticationError('You must be signed in to update a list');
      }

      // find the list
      const list = await models.List.findById(id);
      // if the list owner and the current user don't match, throw a forbidden error
      if (list && String(list.creator) !== user.id) {
        throw new ForbiddenError("You don't have the permission to upate the list");
      }

      // update the list in the db and return the updated list
      return await models.List.findOneAndUpdate(
          {
              _id: id,
          },
          {
              $set: {
                  disabled: true
              }
          },
          {
              new: true
          }
      );
    },

    activateList: async (parent, { listName, id}, { models, user }) => {
      // if not a user, throw an Authentication error
      if (!user) {
        throw new AuthenticationError('You must be signed in to update a list');
      }

      // find the list
      const list = await models.List.findById(id);
      // if the list owner and the current user don't match, throw a forbidden error
      if (list && String(list.author) !== user.id) {
        throw new ForbiddenError("You don't have the permission to upate the list");
      }

      // update the list in the db and return the updated list
      return await models.List.findOneAndUpdate(
          {
              _id: id,
          },
          {
              $set: {
                  disabled: false
              }
          },
          {
              new: true
          }
      );
  },
}
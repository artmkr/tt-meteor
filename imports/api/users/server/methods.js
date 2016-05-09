import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import UserSchema from '../schema';
var fs = Npm.require('fs');

Meteor.methods({
  'registerUser': function (user) {
    //check(user, UserSchema);

    var userId = Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: {
        name: user.name,
        bio: ''
      }
    });

    if (userId) {
      var fs = Npm.require("fs");

      if (user.photoInfo) {
        Meteor.users.update(Meteor.userId(), {
          $set: {
            'profile.photo': user.photo
          }
        })
      }
      else {
        Meteor.users.update(userId, {
          $set: {
            'profile.photo': '/photos/noavatar.png'
          }
        });
      }

      Meteor.users.update(userId, {
        $set: {
          projects: [],
          requests: []
        }
      });
      return userId;
    }
  },
  'editUser': function (user) {
    check(user.name, Match.Optional(String));
    check(user.bio, Match.Optional(String));
    check(user.photo, Match.Optional(String));


    if (user.name) {
      Meteor.users.update(Meteor.userId(), {
        $set: {
          'profile.name': user.name
        }
      })
    }


    if (user.bio) {
      Meteor.users.update(Meteor.userId(), {
        $set: {
          'profile.bio': user.bio
        }
      })
    }


    if (user.photoInfo) {
      Meteor.users.update(Meteor.userId(), {
        $set: {
          'profile.photo': user.photo
        }
      })
    }

  }
});




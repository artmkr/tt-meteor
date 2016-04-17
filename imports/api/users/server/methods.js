import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import UserSchema from '../schema';

Meteor.methods({
  'registerUser': function (user) {
    check(user, UserSchema);

    var userId = Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: {
        name: user.name,
        bio: '',
        photo: user.photo
      },
      projects: [],
      requests: []
    });
    if (userId) {
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


    if (user.photo) {
      Meteor.users.update(Meteor.userId(), {
        $set: {
          'profile.photo': user.photo
        }
      })
    }

  }
});




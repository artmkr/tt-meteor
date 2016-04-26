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
      var base = process.env.PWD;

      if (user.photoInfo) {
        var filepath = '/photos/' + userId.toString() + '.' + user.photoInfo.split('.').pop()
        fs.writeFile(base + '/public' + filepath, new Buffer(user.photo, 'binary'), function (error) {
          if (error) console.log(error);
        });
        Meteor.users.update(userId, {
          $set: {
            'profile.photo': filepath
          }
        });
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
      var fs = Npm.require("fs");
      var base = process.env.PWD;
      var filepath = '/photos/' + Meteor.userId() + '.' + user.photoInfo.split('.').pop()
      fs.writeFile(base + '/public' + filepath, new Buffer(user.photo, 'binary'), function (error) {
        if (error) console.log(error);
      });

      Meteor.users.update(Meteor.userId(), {
        $set: {
          'profile.photo': filepath
        }
      })
    }

  }
});




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
        bio: 'hehe',
        photo: user.photo
      },
      projects: [],
      requests: []
    });
    if(userId){
      return userId;
    }
  }
});




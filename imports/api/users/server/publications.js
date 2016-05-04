import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function(ids) {
  return Meteor.users.find({_id: {$in: ids}}, {fields: {'projects': 1, 'profile': 1}});
});


Meteor.publish('user', function (id) {
  if (this.userId == id) {
    return Meteor.users.find({_id: id}, {fields: {'projects': 1, 'requests': 1, 'profile': 1}});
  } else {
    return Meteor.users.find({_id: id}, {fields: {'projects': 1, 'profile': 1}});
  }
});


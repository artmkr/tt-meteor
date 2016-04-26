import { Meteor } from 'meteor/meteor';

Meteor.publish('users', (ids)=> {
  return Meteor.users.find({_id: {$in: ids}}, {fields: {'projects': 1, 'requests': 1,'profile':1}});
});

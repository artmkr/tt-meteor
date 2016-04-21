import { Meteor } from 'meteor/meteor';

Meteor.publish('users',(ids)=>{
  return Meteor.users.find({_id: {$in: ids}});
});

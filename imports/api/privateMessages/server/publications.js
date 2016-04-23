import { Meteor } from 'meteor/meteor';
import { PrivateMessages } from '../pms.js'

Meteor.publish('privateMessages',()=>{
  return PrivateMessages.find();
});

import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages'

Meteor.publish('messages',(projectId,count)=>{
  return Messages.find({projectId:projectId},{sort: {createdAt: 1}, limit:count});
});

import { Meteor } from 'meteor/meteor';
import { Projects } from '../projects.js'

Meteor.publish('projects',()=>{
  return Projects.find({},{sort: {createdAt: -1}});
});

Meteor.publish('project',(id)=>{
  return Projects.find({_id:id});
});

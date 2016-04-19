import { Meteor } from 'meteor/meteor';
import { Projects } from '../projects.js'

Meteor.publish('projects',()=>{
  return Projects.find();
});

Meteor.publish('project',(id)=>{
  return Projects.find({_id:id});
});

import { Meteor } from 'meteor/meteor';
import { Projects } from '../projects.js'

Meteor.publish('projects',(ids)=>{
  return Projects.find({_id:{$in: ids}},{sort: {createdAt: -1}});
});

Meteor.publish('projects-count',(count)=>{
  return Projects.find({},{sort: {createdAt: -1}});
});

Meteor.publish('project',(id)=>{
  return Projects.find({_id:id});
});

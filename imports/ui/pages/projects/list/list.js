import './list.html';
import { Projects } from '/imports/api/projects/projects';
import { Session } from 'meteor/session'

Template.projectsList.onCreated(function () {
  Session.set('projectsCount', 10);
});


Template.projectsList.helpers({
  projects: function () {
    return Projects.find({}, {sort: {createdAt: -1}});
  },
  notInProject: function () {
    return !(_.find(Meteor.user().projects, (id) => {
      return this._id == id;
    }) ||
    _.find(Meteor.user().requests, (id) => {
      return this._id == id;
    }));
  }
});

Template.projectsList.events({
  'click .join': function () {
    Meteor.call('joinProject', this._id);
  },
  'click .load-more': function () {
    var projectsCount = Session.get('projectsCount') + 10;
    Meteor.subscribe('projects-count', projectsCount);
  }
});

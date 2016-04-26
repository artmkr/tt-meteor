import './home.html';
import {Projects} from '/imports/api/projects/projects';

Template.home.helpers({
  projects: function () {
    if(this.projects) {
      Meteor.subscribe('projects', this.projects);
      return Projects.find({_id:{$in:Meteor.user().projects}}, {sort: {createdAt: -1}});
    }
  },
  requests: function () {
    if(this.requests) {
      Meteor.subscribe('projects', this.requests);
      return Projects.find({_id:{$in:Meteor.user().requests}}, {sort: {createdAt: -1}});
    }
  }
});

Template.home.events({
  'click .remove-request': function() {
    Meteor.call('declineRequest',this._id,Meteor.userId());
  }
});
import './page.html';
import {Projects} from '/imports/api/projects/projects';

Template.userPage.helpers({
  projects: function () {
    if (this.projects) {
      Meteor.subscribe('projects', this.projects);
      return Projects.find({_id: {$in: this.projects}}, {sort: {createdAt: -1}});
    }
  },
  requests: function () {
    if (this.requests) {
      Meteor.subscribe('projects', this.requests);
      return Projects.find({_id: {$in: this.requests}}, {sort: {createdAt: -1}});
    }
  },
  notCurrent: function () {
    return this._id != Meteor.userId();
  }
});


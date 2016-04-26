import './list.html';
import {Projects} from '/imports/api/projects/projects';

Template.projectsList.helpers({
  projects: function () {
    return Projects.find();
  }
});

Template.projectsList.events({
  'click .join': function () {
    Meteor.call('joinProject', this._id);
  }
});

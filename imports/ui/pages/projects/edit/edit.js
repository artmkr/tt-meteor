import './edit.html';
import { Router } from 'meteor/iron:router';
import { Session } from 'meteor/session';

var ERRORS_KEY = 'joinErrors';

Template.projectEdit.onCreated(function () {
  if(this.data.requests) {
    Meteor.subscribe('users', this.data.requests);
    Meteor.subscribe('users', this.data.team);
  }
  Session.set(ERRORS_KEY, {});
  Session.set("projectDescription", '');
});

Template.projectEdit.helpers({
  requests: function () {
    return Meteor.users.find({_id: {$in: this.requests}});
  },
  team: function () {
    return Meteor.users.find({_id: {$in: this.team}});
  },
  tags : function () {
    return this.tags.join();
  }
});


Template.projectEdit.events({
  'click .accept': function (event, template) {
    Meteor.call('addToTeam', template.data._id, this._id)
  },
  'click .decline': function (event, template) {
    Meteor.call('declineRequest', template.data._id, this._id)
  }
});


Template.projectEdit.helpers({
  errorMessages: function () {
    errors = Session.get(ERRORS_KEY);
    return Object.keys(errors).map(key => errors[key]);
  },
  projectDescription: function () {
    var projectDescription = Session.get("projectDescription");
    return projectDescription;
  }
});

Template.projectEdit.events({
  "keydown #description": function (event) {
    var value = $(event.target).val();
    Session.set("projectDescription", value);
  },
  'submit form': function (event) {
    event.preventDefault();
    var name = $('[name=name]').val();
    var shortDescription = $('[name=short-description]').val();
    var description = $('[name=description]').val();
    var tags = $('[name=tags]').val().split(',');
    var errors = {};

    if (!name) {
      errors.name = 'Project name is required';
    }

    if (!shortDescription) {
      errors.shortDescription = 'Short description is required';
    }

    if (!description) {
      errors.description = 'Description is required';
    }

    if (!tags) {
      errors.tags = 'Tags are required';
    }


    Session.set(ERRORS_KEY, errors);

    if (_.keys(errors).length) {
      return;
    }

    var editedProject = {
      name: name,
      shortDescription: shortDescription,
      description: description,
      tags: tags
    };

    Meteor.call('editProject', this._id, editedProject, function (err, id) {
      if (err) alert(err);
      Router.go('projectsPage', {_id: id})
    });

  }
});
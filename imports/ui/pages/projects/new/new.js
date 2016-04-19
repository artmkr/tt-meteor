import './new.html';
import { Router } from 'meteor/iron:router';

import { Session } from 'meteor/session';

var ERRORS_KEY = 'joinErrors';

Template.projectsNew.onCreated(function () {
  Session.set(ERRORS_KEY, {});
  Session.set("projectDescription", '');
});

Template.projectsNew.helpers({
  errorMessages: function () {
    errors = Session.get(ERRORS_KEY);
    return Object.keys(errors).map(key => errors[key]);
  },
  projectDescription: function () {
    var projectDescription = Session.get("projectDescription");
    return projectDescription;
  }
});

Template.projectsNew.events({
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

    var newProject = {
      name:name,
      shortDescription:shortDescription,
      description:description,
      tags: tags
    };

    Meteor.call('createProject',newProject);

  }
});
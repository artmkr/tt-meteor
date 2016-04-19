import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Projects } from '../projects'

Meteor.methods({
  'createProject': function (project) {
    if (!Meteor.userId()) {
      throw new Meteor.error("logged-out",
          "The user must be logged in to create project.");
    }
    check(project, {
      name: String,
      shortDescription: String,
      description: String,
      tags: Array
    });

    project = _.extend(project, {
      todos: [],
      requests: [],
      team: []
    });

    return Projects.insert(project);
  }
});

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
      team: [Meteor.userId()],
      authorId:Meteor.userId(),
      createdAt : new Date()
    });

    return Projects.insert(project);
  },
  'joinProject' : function (projectId) {
    var project = Projects.findOne({_id:projectId});
    var userId = Meteor.userId();
    if (!Meteor.userId()) {
      throw new Meteor.error("logged-out",
          "The user must be logged in to create project.");
    }
    if (project.inTeam(userId)) {
      throw new Meteor.error("already-in-team",
          "The user already in team");
    }
    if (project.inRequests(userId)) {
      throw new Meteor.error("already-in-requests",
          "The user already send request");
    }
    project.sendRequest(userId);
  },

  'addToTeam' : function (projectId,userId) {
    var project = Projects.findOne({_id:projectId});

    if (!Meteor.userId()) {
      throw new Meteor.error("logged-out",
          "The user must be logged in to create project.");
    }

    if (!project.isAuthor(Meteor.userId())) {
      throw new Meteor.error("not-author",
          "Only author can add to team");
    }

    project.addToTeam(userId);
  }
});

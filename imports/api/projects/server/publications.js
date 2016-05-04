import { Meteor } from 'meteor/meteor';
import { Projects } from '../projects.js'

Meteor.publish('projects', function (ids) {
  return Projects.find({_id: {$in: ids}}, {sort: {createdAt: -1}, fields: {name: 1, shortDescription: 1, tags: 1}});
});

Meteor.publish('projects-count', function (count) {
  return Projects.find({}, {
    sort: {createdAt: -1}, fields: {
      name: 1,
      shortDescription: 1,
      description: 1,
      team: 1,
      tags: 1,
      requests: 1
    },
    limit: count
  });
});

Meteor.publish('project', function (id) {
  var project = Projects.findOne({_id: id});
  if (project.isAuthor(this.userId)) {
    return Projects.find({_id: id}, {
      fields: {
        name: 1,
        shortDescription: 1,
        description: 1,
        team: 1,
        tags: 1,
        requests: 1
      }
    });
  }
  else {
    return Projects.find({_id: id}, {fields: {name: 1, shortDescription: 1, description: 1, team: 1, tags: 1}});
  }
});

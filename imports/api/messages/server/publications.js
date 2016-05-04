import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages'
import { Projects } from '/imports/api/projects/projects';

Meteor.publish('messages', function (projectId, count) {
  var project = Projects.findOne({_id: projectId});
  if (project.inTeam(this.userId)) {
    return Messages.find({projectId: projectId}, {sort: {createdAt: 1}, limit: count});
  }
  else {
    return [];
  }
});

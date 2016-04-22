import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Messages } from '../messages'
import { Projects } from '/imports/api/projects/projects'

Meteor.methods({
  sendMessage(projectId, message){
    var project = Projects.findOne({_id: projectId})
    if (!project.inTeam(Meteor.userId())) {
      throw new Meteor.Error('not-in-team',
          'You must be in team');
    }

    var newMessage = {
      text: message,
      projectId: projectId,
      author: Meteor.userId(),
      createdAt: new Date()
    };

    Messages.insert(newMessage);
  }
});

import { Mongo } from 'meteor/mongo';

export const Projects = new Meteor.Collection('projects');

Projects.helpers({
  author() {
    return Meteor.users.findOne(this.authorId);
  },
  isAuthor() {
    return this.authorId == Meteor.userId();
  },
  inTeam(userId) {
    return _.find(this.team, (item)=> {
      return (item == userId);
    })
  },
  inRequests(userId) {
    return _.find(this.requests, (item)=> {
      return (item == userId);
    })
  },
  sendRequest(userId){
    Projects.update(this._id, {
      $addToSet: {requests: userId}
    });
  },
  addToTeam(userId){
    if (this.inRequests(userId)) {
      Projects.update(this._id, {
        $pull: {requests: userId}
      });
    }

    Projects.update(this._id, {
      $addToSet: {team: userId}
    });
  }
});
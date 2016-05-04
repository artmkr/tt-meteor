import { Mongo } from 'meteor/mongo';

export const Projects = new Meteor.Collection('projects');

Projects.helpers({
  author() {
    return Meteor.users.findOne(this.authorId);
  },
  isAuthor(id) {
    return this.authorId == id;
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
    Meteor.users.update(userId, {
      $addToSet: {requests: this._id}
    })
  },
  declineRequest(userId){
    Projects.update(this._id, {
      $pull: {requests: userId}
    });
    Meteor.users.update(userId, {
      $pull: {requests: this._id}
    });
  },
  addToTeam(userId){
    if (this.inRequests(userId)) {
      Projects.update(this._id, {
        $pull: {requests: userId}
      });
      Meteor.users.update(userId, {
        $pull: {requests: this._id}
      });
    }

    Projects.update(this._id, {
      $addToSet: {team: userId}
    });
    Meteor.users.update(userId, {
      $addToSet: {projects: this._id}
    })
  }
});
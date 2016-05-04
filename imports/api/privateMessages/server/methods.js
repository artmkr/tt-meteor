import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { PrivateMessages } from '../pms.js';

Meteor.methods({
  'sendPrivateMessage': function (recipientId, message) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("logged-out",
          "The user must be logged in to create project.");
    }

    var authorId = Meteor.userId();
    check(recipientId, String);
    check(message, String);
    PrivateMessages.insert({
      authorId: authorId,
      recipientId: recipientId,
      message: message,
      createdAt: new Date()
    });
  },
  'privateMessagesList': function () {
    var userId = this.userId;
    var messages = PrivateMessages.find({$or: [{authorId: userId}, {recipientId: userId}]});

    return distinctEntries = _.uniq(messages.fetch().map(function (x) {
      if (x.authorId == userId) {
        return x.recipientId
      }
      else {
        return x.authorId;
      }
    }));
  }
});
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { PMs } from '../pms.js';

Meteor.methods({
  'sendPrivateMessage' :function(recipientId,message) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("logged-out",
          "The user must be logged in to create project.");
    }

    var authorId = Meteor.userId();
    check(recipientId,String);
    check(message,String);
    console.log(message);
  }
});
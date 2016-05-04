import './pms.html';
import {PrivateMessages} from '/imports/api/privateMessages/pms.js';

Template.privateMessagesLayout.onCreated(function () {
  Meteor.subscribe('privateMessagesList');
});

Template.privateMessagesLayout.helpers({
  userList: function () {
    var userId = Meteor.userId();
    var messages = PrivateMessages.find({$or: [{authorId: userId}, {recipientId: userId}]});
    console.log(messages.fetch());
    var distinctEntries = _.uniq(messages.fetch().map(function (x) {
      if (x.authorId == userId) {
        return x.recipientId
      }
      else {
        return x.authorId;
      }
    }));
    Meteor.subscribe('users',distinctEntries);
    return Meteor.users.find({_id: {$in: distinctEntries}});
  }

});
import { Meteor } from 'meteor/meteor';
import { PrivateMessages } from '../pms.js'


Meteor.publish('privateMessagesWith', function (id) {
  var userId = this.userId;
  return PrivateMessages.find({
    $or: [
      {
        authorId: userId,
        recipientId: id
      },
      {
        recipientId: userId,
        authorId: id
      }
    ]
  }, {sort: {createdAt: 1}});
});

Meteor.publish('privateMessagesList', function () {
  var userId = this.userId;
  return PrivateMessages.find({$or: [{authorId: userId}, {recipientId: userId}]});
});
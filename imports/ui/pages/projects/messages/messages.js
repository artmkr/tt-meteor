import './messages.html';
import {Messages} from '/imports/api/messages/messages';


Tracker.afterFlush(function () {

});

Template.projectMessages.onCreated(function () {
  if (this.data.team) {
    Meteor.subscribe('users', this.data.team);
  }
});

Template.projectMessages.onRendered(function () {

  this.autorun(function () {
    Tracker.afterFlush(function () {
      $('.messages-list').scrollTop($('.messages-list').prop("scrollHeight"));
    });
  });
});

Template.projectMessages.helpers({
  messages: function () {
    return Messages.find();
  },
  mine: function () {
    return this.author == Meteor.userId();
  },
  authorName: function () {
    return Meteor.users.findOne({_id: this.author}).profile.name
  },
  time: function (date) {
    var d = new Date(date);
    textDate = ""
    textDate += d.getUTCHours();
    textDate += ':';
    if (d.getUTCMinutes() < 10) {
      textDate += 0;
    }
    textDate += d.getUTCMinutes();

    return textDate;
  },
  teammate: function () {
    return Meteor.users.find({_id: {$in: this.team}});
  }
});

Template.projectMessages.events({
  'click #send': function () {
    var message = $('[name=message]').val();
    Meteor.call('sendMessage', this._id, message);
  }
});
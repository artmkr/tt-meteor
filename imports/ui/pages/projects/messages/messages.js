import './messages.html';
import {Messages} from '/imports/api/messages/messages';
import { Tracker } from 'meteor/tracker'


Template.projectMessages.onCreated(function () {
  if (this.data.team) {
    Meteor.subscribe('users', this.data.team);
  }
});

Template.projectMessages.onRendered (function () {
  Tracker.autorun(function () {
    console.log('hello');
    $('#messages-list').animate({scrollTop: $("#messages-list")[0].scrollHeight});
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
    //return Meteor.users.findOne({_id: this.author}).profile.name
    return 'Adam';
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
  },
  userpic: function () {
    return Meteor.users.findOne({_id: this.author}).profile.photo;
  }
});

Template.projectMessages.events({
  'click #send': function () {
    var message = $('[name=message]').val();
    Meteor.call('sendMessage', this._id, message);
    $('[name=message]').val('');
  }
});
import './messages.html';
import {Messages} from '/imports/api/messages/messages';
import { Tracker } from 'meteor/tracker'


Template.projectMessages.onCreated(function () {
  if (this.data.team) {
    Meteor.subscribe('users', this.data.team);
  }
});

Meteor.autosubscribe(function() {
  Messages.find().observe({
    added: function(item){
      $('#messages-list').animate({scrollTop: $("#messages-list")[0].scrollHeight});
    }
  });
});

Template.projectMessages.onRendered(function () {
  $('#messages-list').animate({scrollTop: $("#messages-list")[0].scrollHeight});
});


Template.projectMessages.helpers({
  messages: function () {
    return Messages.find();
  },
  mine: function () {
    return this.author == Meteor.userId();
  },
  authorName: function () {
    return Meteor.users.findOne({_id: this.author}).profile.name;
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
import './edit.html';


Template.projectEdit.onCreated(function () {
  if(this.data.requests) {
    Meteor.subscribe('users', this.data.requests);
    Meteor.subscribe('users', this.data.team);
  }
});

Template.projectEdit.helpers({
  requests: function () {
    return Meteor.users.find({_id: {$in: this.requests}});
  },
  team: function(){
    return Meteor.users.find({_id: {$in: this.team}});
  }
});


Template.projectEdit.events({
  'click .accept': function(event,template){
    Meteor.call('addToTeam',template.data._id,this._id)
  },
  'click .decline': function(event,template){
    Meteor.call('declineRequest',template.data._id,this._id)
  }
});

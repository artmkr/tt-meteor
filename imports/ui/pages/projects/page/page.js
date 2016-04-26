import './page.html';

Template.projectsPage.events({
  'click #join': function () {
    Meteor.call('joinProject', this._id);
  }
});


Template.projectsPage.helpers({
  team: function () {
    if (this.team) {
      Meteor.subscribe('users', this.team);
      return Meteor.users.find({_id: {$in: this.team}});
    }
  },
  inTeam : function () {
    var userId = Meteor.userId();
    return _.find(this.team,function(user){ return user == userId ; })
  },
  isAuthor : function () {
    return this.authorId == Meteor.userId();
  }
});
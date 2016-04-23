import './page.html';

Template.userPage.helpers({
  user: function () {
    return Meteor.users.findOne();
  }
});
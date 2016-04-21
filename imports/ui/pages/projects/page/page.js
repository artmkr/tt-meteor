import './page.html';

Template.projectsPage.events({
  'click #join' : function (){
    Meteor.call('joinProject',this._id);
  }
});
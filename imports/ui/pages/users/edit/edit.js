import './edit.html';

import { Router } from 'meteor/iron:router';

Template.editPage.events({
  'submit form': function (event) {

    event.preventDefault();
    var name = $('[name=name]').val();
    var file = ($('[name=photo]')).get(0).files[0];
    var bio = $('[name=bio]').val();
    var Reader = new FileReader();

    if (!file) {
      var user = {
        name: name,
        bio: bio
      };
      Meteor.call('editUser', user, function (error, userId) {
        if (error) {
          alert('Something went wrong \n contact us');
        } else {
          Router.go('home'); //Go to userpage
        }
      });
    }
    else {
      Reader.addEventListener("load", function () {
        var user = {
          name: name,
          bio: bio,
          photo: Reader.result,
          photoInfo:file.name
        };
        Meteor.call('editUser', user, function (error, userId) {
          if (error) {
            alert('Something went wrong \n contact us');
          } else {
            Router.go('home'); //Go to userpage
          }
        });
      }, false);


      Reader.readAsDataURL(file);
    }
  }
});
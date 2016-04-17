import './signup.html'
import { Router } from 'meteor/iron:router';

import { Session } from 'meteor/session';

var ERRORS_KEY = 'joinErrors';

Template.signin.onCreated(function () {
  Session.set(ERRORS_KEY, {});
});

Template.signin.helpers({
  errorMessages: function () {
    errors = Session.get(ERRORS_KEY);
    return Object.keys(errors).map(key => errors[key]);
  }
});

Template.signup.events({
  'submit form': function (event) {
    event.preventDefault();
    var email = $('[name=email]').val();
    var name = $('[name=name]').val();
    var password = $('[name=password]').val();
    var confirmPassword = $('[name=password-confirmation]').val();

    var File = ($('[name=photo]')).get(0).files[0];

    var errors = {};

    var Reader = new FileReader();

    if (File) {
      Reader.readAsDataURL(File);
    }

    console.log(Reader)

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    if (!name) {
      errors.password = 'Username is required';
    }

    if (password != confirmPassword) {
      errors.password = 'Please confirm your password';
    }

    Session.set(ERRORS_KEY, errors);

    if (_.keys(errors).length) {
      return;
    }

    Reader.addEventListener("load", function () {
      var user = {
        name: name,
        email: email,
        password: password,
        photo: Reader.result
      };
      Meteor.call('registerUser', user, function (error, userId) {
        if (error) {
          alert('Something went wrong \n contact us');
        } else {
          Router.go('edit'); //Go to userpage
        }
      });
    }, false);


  }
});
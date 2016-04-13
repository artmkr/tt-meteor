import './signin.html'
import { Router } from 'meteor/iron:router';
import { Session } from 'meteor/session';

var ERRORS_KEY = 'joinErrors';

Template.signin.onCreated(function () {
  Session.set(ERRORS_KEY, {});
});

Template.signin.helpers({
  errorMessages: function () {
    return _.values(Session.get(ERRORS_KEY));
  }
});

Template.signin.events({
  'submit form': function (event) {
    event.preventDefault();

    var email = $('[name=email]').val();
    var password = $('[name=password]').val();

    var errors = {};

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    Session.set(ERRORS_KEY, errors);

    if (_.keys(errors).length) {
      console.log(_.keys(errors).length);
      return;
    }

    Meteor.loginWithPassword(email, password, function (error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      } else {
        Router.go('index');
      }
    });
  }
});
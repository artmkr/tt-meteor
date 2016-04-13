import { Router } from 'meteor/iron:router';

import '/imports/ui/pages/index/index.js'
import '/imports/ui/pages/users/signin/signin.js'
import '/imports/ui/pages/users/signup/signup.js'
import '/imports/ui/pages/users/home/home.js'

import '/imports/ui/layouts/main/main.js'



Router.route('/', function () {
  this.render('index');
}, {
  name: 'index'
});

Router.route('/signup', function () {
  if (Meteor.user()) {
    Router.go('home');
  }
  this.layout('main');
  this.render('signup');
}, {
  name: 'signup'
});

Router.route('/signin', function () {
  if (Meteor.user()) {
    Router.go('home');
  }
  this.layout('main');
  this.render('signin');
}, {
  name: 'signin'
});

Router.route('/home', function () {
  if (!Meteor.user()) {
    Router.go('signin');
  }
  this.layout('main');
  this.render('home');
}, {
  name: 'home'
});
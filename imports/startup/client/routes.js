import { Router } from 'meteor/iron:router';

import '/imports/ui/pages/index/index.js'
import '/imports/ui/pages/users/signin/signin.js'
import '/imports/ui/pages/users/signup/signup.js'
import '/imports/ui/pages/users/home/home.js'
import '/imports/ui/pages/users/edit/edit.js'
import '/imports/ui/pages/projects/list/list'

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
  this.layout('main');
  this.render('home');
}, {
  name: 'home'
});

Router.route('/edit', function () {
  this.layout('main');
  this.render('editPage');
}, {
  name: 'editPage'
});


Router.route('/projects', function () {
  this.layout('main');
  this.render('projects.list');
}, {
  name: 'project.list'
});
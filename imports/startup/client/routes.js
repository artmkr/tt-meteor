import { Router } from 'meteor/iron:router';

import '/imports/ui/pages/index/index.js'
import '/imports/ui/pages/signin/signin.js'
import '/imports/ui/pages/signup/signup.js'
import '/imports/ui/layouts/main/main.js'



Router.route('/', function () {
  this.render('index');
}, {
  name: 'index'
});

Router.route('/signup', function () {
  this.layout('main');
  this.render('signup');
}, {
  name: 'signup'
});

Router.route('/signin', function () {
  this.layout('main');
  this.render('signin');
}, {
  name: 'signin'
});
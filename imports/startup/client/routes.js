import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/pages/index/index.js'
import '/imports/ui/pages/signin/signin.js'
import '/imports/ui/pages/signup/signup.js'
import '/imports/ui/layouts/main/main.js'


FlowRouter.route('/', {
  name: 'index',
  action() {
    BlazeLayout.render('index');
  },
});

FlowRouter.route('/signin', {
  name: 'signin',
  action() {
    BlazeLayout.render('signin');
  },
});

FlowRouter.route('/signup', {
  name: 'signup',
  action() {
    BlazeLayout.render('main', {content: 'signup'});
  },
});

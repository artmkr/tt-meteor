import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/pages/index/index.js'

FlowRouter.route('/', {
  name: 'index',
  action() {
    BlazeLayout.render('index');
  },
});

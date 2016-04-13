import './signup.html'
import { Router } from 'meteor/iron:router';


Template.signup.events({
  'submit form': function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    var name  = $('[name=name]').val();
    var password = $('[name=password]').val();
    var confirmPassword = $('[name=password-confirmation]').val();

    var user = {
      name:name,
      email:email,
      password:password
    };

    Meteor.call('registerUser',user,function(error, userId){
      if(error){
        alert('Something went wrong \n contact us');
      }else{
        Router.go('index'); //Go to userpage
      }
    });
  }
});
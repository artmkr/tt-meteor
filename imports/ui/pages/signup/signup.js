import './signup.html'

Template.signup.events({
  'submit form': function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    var name  = $('[name=name]').val();
    var password = $('[name=password]').val();
    var confirmPassword = $('[name=password]').val();
    console.log(name,email,password,confirmPassword);
  }
});
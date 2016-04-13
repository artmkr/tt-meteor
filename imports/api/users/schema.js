import {SimpleSchema} from 'meteor/aldeed:simple-schema';


export default UserSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 80
  },
  email: {
    type: String,
    label: "Email",
    max: 200
  },
  password: {
    type: String,
    label: "Password",
    max: 200
  }
});
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email alreday exist"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);
export default User;

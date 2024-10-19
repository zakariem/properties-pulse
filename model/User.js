import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email alread exist"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    unique: [true, "Username alread exist"],
    required: [true, "Username is required"],
  },
  image: {
    type: String,
  },
  bookmarks: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
},{
  timestamps: true
});

export const User = models.User || model('User', userSchema);

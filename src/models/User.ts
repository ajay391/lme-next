import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';  // Import bcryptjs for hashing the password

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Only hash the password if it is modified
  const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds
  this.password = await bcrypt.hash(this.password, salt);  // Hash the password
  next();
});

// Compare method to validate password during login
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);  // Compare entered password with stored hashed password
};

// Create or retrieve the User model
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

import mongoose from 'mongoose';
import bcrypt from "bcrypt";
// User Schema Definition
const userSchema = new mongoose.Schema({  
  
  email: {
    type: String,
    required: true,
    unique: true, // Email must be unique
  },
  password: {
    type: String,
    required: true, 
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Password Hashing Middleware (pre-save hook)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password not modified

  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

// Method to Compare Passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare hashed password
};

// Create and Export User Model
const User = mongoose.model('User', userSchema);
export default User;
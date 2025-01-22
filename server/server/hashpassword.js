import bcrypt from 'bcrypt';

const hashPassword = async (plainPassword) => {
  const saltRounds = 10; // Salt rounds
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds); // Hashing password
  console.log('Hashed Password:', hashedPassword);
};

hashPassword('adminpanel'); // Replace 'your-password' with the password to hash
 
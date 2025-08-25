// Simple script to generate a properly formatted MongoDB connection string
const username = 'arpitghai20';
const password = 'MYlaptop123@'; // Your original password with special characters
const cluster = 'portfolio-cluster.hxuunyb.mongodb.net';

// Properly encode the password
const encodedPassword = encodeURIComponent(password);

// Generate the connection string
const connectionString = `MONGODB_URI=mongodb+srv://${username}:${encodedPassword}@${cluster}/?retryWrites=true&w=majority`;

console.log('Add this to your .env.local file:');
console.log(connectionString);

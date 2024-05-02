// server.js
const express = require("express");
const mongoose = require("mongoose");
// const authRoutes = require("./AutxhRoutes");
const cors = require('cors');

const bodyParser = require('body-parser');
const UserHistory = require('./db_model/history');
const axios = require('axios');


const historyRouter = require('./routes/history');

const app = express();

app.use(cors());

// mongoose.connect("mongodb+srv://mahi:mahi@cluster0.epamt6e.mongodb.net/AutoMotive?retryWrites=true&w=majority");

// mongoose.connect("mongodb+srv://mahi:mahi@cluster0.epamt6e.mongodb.net/AutoMotive?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const PORT = 3001


// Body parser middleware
app.use(bodyParser.json());

// Routes
app.use('/api', historyRouter);


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/AutoMotive', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


// // Route to handle user authentication and data retrieval
// app.post('/api/authenticate', async (req, res) => {
//     try {
//         // Assuming you receive authentication data from Clerk
//         const { clerkAuthToken } = req.body;

//         // Make a request to Clerk's API to validate the token and retrieve user data
//         const clerkResponse = await axios.get('https://api.clerk.io/v1/user', {
//         headers: {
//             Authorization: `Bearer ${clerkAuthToken}`
//         }
//         });

//         // Extract user data from Clerk's response
//         const userData = clerkResponse.data;

//         // Use the user data as needed in your application
//         console.log('User Data:', userData);

//         res.json(userData);
//     } catch (error) {
//         console.error('Error authenticating user:', error);
//         res.status(500).json({ error: 'Server Error' });
//     }
// });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


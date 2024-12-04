const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path') //Just added this today on 29th november
const bcrypt = require('bcrypt')
const rateLimit = require('express-rate-limit');
const registerLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 7, // limit each IP address to 7 requests per window
    message: "Too many registration attempts from this IP, You can try again later.",
});

app.use('/users', registerLimiter);
app.use('/api', express.json());
app.use(express.static('public')); // Also 29th november. This line serves files from the 'public' folder

app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

const { Pool } = require('pg');
const { error } = require('console');
const { report } = require('process');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'hospital-proj',
    password: 'Nuj1493tobe99.',
});

const saltRounds = 10
pool.connect()
    .then(() => console.log("connected"))
    .catch(err => console.error("couldn't connect", err.stack))

// Middleware function to check if user is authenticated
const authenticateUser = (req, res, next) => {
    // Check if user is logged in (you can implement your own authentication logic here)
    const isLoggedIn = true; // Replace with your authentication logic

    if (isLoggedIn) {
        // User is authenticated, proceed to the next middleware or route handler
        next();
    } else {
        // User is not authenticated, send an error response
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Apply the authentication middleware to the routes that require authentication
app.use('/profile', authenticateUser);
// Add more routes that require authentication here

// Example API endpoint
// Create a user
app.post('/users', async (req, res) => {
    try {
        const { name, age, gender, year, dept, email, password } = req.body;
        const query = 'INSERT INTO public.student (name, age, gender, year, dept, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const hashed = bcrypt.hashSync(password, saltRounds);

        const values = [name, age, gender, year, dept, email, hashed];
        const result = await pool.query(query, values);

        res.status(201).json({ message: `User added: ${result.rows[0].name}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Get a user by Matric no
app.get('/users/:matric_no', async (req, res) => {
    try {
        const { matric_no } = req.params;
        const query = 'SELECT * FROM student WHERE matric_no = $1';
        const values = [matric_no];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            console.log(error)
            res.status(404).json({ error: 'User not found' });
        } else {
            console.log('success')
            res.json({ success: true, matric_no });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        
        // Retrieve the user from the database based on email
        const query = 'SELECT * FROM student WHERE email = $1';
        const values = [email];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            console.error(`Login failed: User not found for email - ${email}`);
            return res.status(404).json({ error: 'User not found. Please register first' });
        }

        const user = result.rows[0];

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatch) {
            console.error(`Login failed: Invalid credentials for email - ${email}`);
            return res.status(401).json({ error: 'Invalid credentials. Please try again.' });
        }

        // for Successful Login
        console.log(`Login successful for user ID: ${user.id}`);
        res.status(200).json({
            message: 'Login successful.',
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// profile route
app.get('/profile/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM student WHERE id = $1';
        const values = [id];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            const profileData = result.rows[0];
            res.json({ profileData, id });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Create a complaint for a user
app.post('/complaints', async (req, res) => {
    console.log('Incoming complaint data:', req.body);
    try {
        const { symptoms, duration, taken_drugs, students_id } = req.body;

        // Debug log to check incoming data
        console.log('Complaint data received:', { symptoms, duration, taken_drugs, students_id });

        // Ensure all fields are provided
        if (!symptoms || !duration || !taken_drugs || !students_id) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const query = 'INSERT INTO complaints ( symptoms, duration, taken_drugs, students_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [symptoms, duration, taken_drugs, students_id];

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/complaints/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM complaints WHERE students_id = $1';
        const values = [id];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            console.log(error)
            res.status(404).json({ error: 'COmplaint not found' });
        } else {

            const complaint = result.rows[0];

            console.log('success')
            res.json({ success: true, complaint });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all complaints
app.get('/admin/complaints', async (req, res) => {
    try {
        // Retrieve the complaints from the database
        const query = 'SELECT * FROM complaints';
        const result = await pool.query(query);
        const complaints = result.rows;

        res.json(complaints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a complaint by ID
app.put('/complaints/:complaint_id', async (req, res) => {
    try {
        const complaint_id = parseInt(req.params.complaint_id)
        const { report } = req.body;
        const query = 'UPDATE complaints SET report = $1 WHERE id = $2';
        const values = [report, complaint_id];

        const result = await pool.query(query, values);
        console.log(report)
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
// just added this today 29th november 2024
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/clinic/clinic-frontend/index.html'));
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

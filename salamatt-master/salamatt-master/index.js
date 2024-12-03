const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path') //Just added this today on 29th november
const bcrypt = require('bcrypt')
app.use(express.static('public')); // Also 29th november. This line serves files from the 'public' folder

app.use(cors({ origin: 'http://localhost:5173'}));
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
        
        // Retrieve the user from the database based on email
        const query = 'SELECT * FROM student WHERE email = $1';
        const values = [email];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = result.rows[0];
        if (user.password === password) {
            // Password matches
            res.status(200).json({ message: 'Login successful', user });
        }else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
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
    try {
        const { symptoms, duration, taken_drugs, students_id } = req.body;
        const query = 'INSERT INTO complaints ( symptoms, duration, taken_drugs, students_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [symptoms, duration, taken_drugs, students_id];

        const result = await pool.query(query, values);
        res.json(result.rows[0]);
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

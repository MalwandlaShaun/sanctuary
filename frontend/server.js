import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
// Fixed lowdb import for v1.x
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize express app
const app = express();
const port = process.env.PORT || 4000;

// Set up lowdb with FileSync adapter (for lowdb v1.x)
const file = join(__dirname, 'db.json');
const adapter = new FileSync(file);
const db = low(adapter);

// Initialize default data
db.defaults({
  dashboard: {},
  users: [],
  workers: [],
  jobs: [],
  reviews: [],
  payments: [],
  safetyAlerts: [],
  admins: [],
}).write();

// Middleware to parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  if (req.path === '/login' || req.path === '/verify-token') {
    return next();
  }

  const protectedEndpoints = ['/dashboard', '/users', '/workers', '/jobs', '/reviews', '/payments', '/safetyAlerts'];
  const shouldProtect = protectedEndpoints.some(endpoint => req.path.startsWith(endpoint));

  if (!shouldProtect) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Apply authentication middleware
app.use(authenticateToken);

// Helper function to validate user data
const validateUser = (data) => {
  if (!data.id || !data.name || !data.email || !data.type || !data.status || !data.verification || !data.joinDate) {
    return 'Missing required fields: id, name, email, type, status, verification, joinDate';
  }
  if (!['Customer', 'Worker'].includes(data.type)) {
    return 'Invalid user type';
  }
  if (!['ACTIVE', 'PENDING', 'SUSPENDED'].includes(data.status)) {
    return 'Invalid user status';
  }
  if (!['VERIFIED', 'PENDING'].includes(data.verification)) {
    return 'Invalid verification status';
  }
  return null;
};

// Helper function to update dashboard stats
const updateDashboardStats = () => {
  const users = db.get('users').value() || [];
  const workers = db.get('workers').value() || [];
  const jobs = db.get('jobs').value() || [];
  const payments = db.get('payments').value() || [];

  db.set('dashboard', {
    totalUsers: users.length,
    activeWorkers: workers.filter(w => w.status === 'ACTIVE').length,
    completedJobs: jobs.filter(j => j.status === 'COMPLETED').length,
    totalRevenue: payments.reduce((sum, p) => sum + (p.commission || 0), 0),
  }).write();
};

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const admin = db.get('admins').find({ username }).value();
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token endpoint
app.get('/verify-token', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = db.get('admins').find({ id: decoded.id }).value();
    if (!admin) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({ valid: true, user: { id: decoded.id, username: decoded.username, role: decoded.role } });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Custom CRUD endpoints for users
app.get('/users', async (req, res) => {
  try {
    res.json(db.get('users').value());
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = db.get('users').find({ id: req.params.id }).value();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/users', async (req, res) => {
  try {
    console.log('POST /users request:', req.body);
    const newUser = req.body;
    const validationError = validateUser(newUser);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    if (db.get('users').find({ email: newUser.email }).value()) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    db.get('users').push(newUser).write();
    updateDashboardStats();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    console.log('PUT /users/:id request:', { id: req.params.id, body: req.body });
    const user = db.get('users').find({ id: req.params.id });
    if (!user.value()) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = req.body;
    const validationError = validateUser(updatedUser);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    if (db.get('users').find(u => u.email === updatedUser.email && u.id !== req.params.id).value()) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    user.assign(updatedUser).write();
    updateDashboardStats();
    res.json(user.value());
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    console.log('DELETE /users/:id request:', { id: req.params.id });
    const removed = db.get('users').remove({ id: req.params.id }).write();
    if (!removed.length) {
      return res.status(404).json({ error: 'User not found' });
    }
    updateDashboardStats();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Custom CRUD endpoints for workers
app.get('/workers', async (req, res) => {
  try {
    res.json(db.get('workers').value());
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to validate worker data
const validateWorker = (data) => {
    if (
      !data.id ||
      !data.name ||
      !data.email ||
      !data.skills ||
      !data.rating ||
      !data.jobsCompleted ||
      !data.earnings ||
      !data.status
    ) {
      return 'Missing required fields: id, name, email, skills, rating, jobsCompleted, earnings, status';
    }
    if (!['ACTIVE', 'PENDING', 'SUSPENDED'].includes(data.status)) {
      return 'Invalid status';
    }
    if (typeof data.rating !== 'number' || data.rating < 0 || data.rating > 5) {
      return 'Invalid rating: must be a number between 0 and 5';
    }
    if (typeof data.jobsCompleted !== 'number' || data.jobsCompleted < 0) {
      return 'Invalid jobsCompleted: must be a non-negative number';
    }
    if (typeof data.earnings !== 'number' || data.earnings < 0) {
      return 'Invalid earnings: must be a non-negative number';
    }
    return null;
  };
  
  // Custom CRUD endpoints for workers
  app.put('/workers/:id', async (req, res) => {
    try {
      console.log('PUT /workers/:id request:', { id: req.params.id, body: req.body });
      const worker = db.get('workers').find({ id: req.params.id });
      if (!worker.value()) {
        return res.status(404).json({ error: 'Worker not found' });
      }
      const updatedWorker = req.body;
      const validationError = validateWorker(updatedWorker);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }
      if (db.get('workers').find(w => w.email === updatedWorker.email && w.id !== req.params.id).value()) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      worker.assign(updatedWorker).write();
      updateDashboardStats();
      res.json(worker.value());
    } catch (error) {
      console.error('Error updating worker:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// Custom CRUD endpoints for jobs
app.get('/jobs', async (req, res) => {
  try {
    res.json(db.get('jobs').value());
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to validate job data
const validateJob = (data) => {
    if (
      !data.id ||
      !data.customer ||
      !data.worker ||
      !data.service ||
      !data.amount ||
      !data.status ||
      !data.date
    ) {
      return 'Missing required fields: id, customer, worker, service, amount, status, date';
    }
    if (!['COMPLETED', 'IN PROGRESS', 'DISPUTED'].includes(data.status)) {
      return 'Invalid status';
    }
    if (typeof data.amount !== 'number' || data.amount < 0) {
      return 'Invalid amount: must be a non-negative number';
    }
    return null;
  };
  
  // Custom CRUD endpoint for updating jobs
  app.put('/jobs/:id', async (req, res) => {
    try {
      console.log('PUT /jobs/:id request:', { id: req.params.id, body: req.body });
      const job = db.get('jobs').find({ id: req.params.id });
      if (!job.value()) {
        return res.status(404).json({ error: 'Job not found' });
      }
      const updatedJob = req.body;
      const validationError = validateJob(updatedJob);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }
      job.assign(updatedJob).write();
      updateDashboardStats();
      res.json(job.value());
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Custom CRUD endpoints for reviews
app.get('/reviews', async (req, res) => {
  try {
    res.json(db.get('reviews').value());
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/reviews/:id', async (req, res) => {
    try {
      console.log('PUT /reviews/:id request:', { id: req.params.id, body: req.body });
      const review = db.get('reviews').find({ id: req.params.id });
      if (!review.value()) {
        return res.status(404).json({ error: 'Review not found' });
      }
      const updatedReview = req.body;
      const validationError = validateReview(updatedReview);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }
      review.assign(updatedReview).write();
      updateDashboardStats();
      res.json(review.value());
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Custom CRUD endpoints for payments
app.get('/payments', async (req, res) => {
  try {
    res.json(db.get('payments').value());
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Custom CRUD endpoints for safetyAlerts
app.get('/safetyAlerts', async (req, res) => {
  try {
    res.json(db.get('safetyAlerts').value());
  } catch (error) {
    console.error('Error fetching safety alerts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Custom CRUD endpoints for dashboard
app.get('/dashboard', async (req, res) => {
  try {
    updateDashboardStats();
    res.json(db.get('dashboard').value());
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/dashboard', async (req, res) => {
  try {
    console.log('PUT /dashboard request:', req.body);
    const updatedDashboard = req.body;
    db.get('dashboard').assign(updatedDashboard).write();
    res.json(db.get('dashboard').value());
  } catch (error) {
    console.error('Error updating dashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
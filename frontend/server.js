import express from 'express';
import jsonServer from 'json-server/lib/server/index.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const router = jsonServer.router(join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use json-server middlewares (CORS, static files, etc.)
app.use(middlewares);

// Custom authentication endpoints
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Fetch admins from db.json
        const db = router.db; // Access the lowdb instance
        const admin = db.get('admins').find({ username }).value();

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT
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

app.get('/verify-token', (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Invalid or missing token' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verify admin exists
        const db = router.db;
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

// Middleware to protect json-server routes
const authenticateToken = (req, res, next) => {
    // Skip authentication for login and verify-token endpoints
    if (req.path === '/login' || req.path === '/verify-token') {
        return next();
    }

    // List of protected endpoints
    const protectedEndpoints = ['/dashboard', '/users', '/workers', '/jobs', '/reviews', '/payments', '/safetyAlerts'];
    
    // Check if the current path should be protected
    const shouldProtect = protectedEndpoints.some(endpoint => req.path.startsWith(endpoint));
    
    if (!shouldProtect) {
        return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Apply authentication middleware globally before json-server routes
app.use(authenticateToken);

// Mount json-server router
app.use(router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
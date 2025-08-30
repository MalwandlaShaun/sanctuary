import bcrypt from 'bcryptjs';

// Generate hash for password123
const password = 'password123';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error generating hash:', err);
        return;
    }
    console.log('Password:', password);
    console.log('Generated hash:', hash);
    
    // Verify the hash works
    bcrypt.compare(password, hash, (err, result) => {
        if (err) {
            console.error('Error verifying:', err);
            return;
        }
        console.log('Hash verification:', result); // Should be true
    });
});
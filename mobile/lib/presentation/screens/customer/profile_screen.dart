import 'package:flutter/material.dart';

// Profile Screen
class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(Icons.settings),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Profile Header
            Container(
              padding: EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.blue[400]!, Colors.blue[600]!],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
              child: Column(
                children: [
                  Stack(
                    children: [
                      CircleAvatar(
                        radius: 50,
                        backgroundColor: Colors.white,
                        child: CircleAvatar(
                          radius: 47,
                          backgroundColor: Colors.blue[300],
                          child: Text(
                            'JD',
                            style: TextStyle(
                              fontSize: 32,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 0,
                        right: 0,
                        child: GestureDetector(
                          onTap: () {},
                          child: Container(
                            padding: EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.2),
                                  blurRadius: 4,
                                  offset: Offset(0, 2),
                                ),
                              ],
                            ),
                            child: Icon(
                              Icons.camera_alt,
                              color: Colors.blue,
                              size: 16,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Text(
                    'John Doe',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  Text(
                    'john.doe@email.com',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white.withOpacity(0.8),
                    ),
                  ),
                  SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.phone, color: Colors.white.withOpacity(0.8), size: 16),
                      SizedBox(width: 4),
                      Text(
                        '+27 82 345 6789',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.white.withOpacity(0.8),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.verified, color: Colors.white, size: 16),
                        SizedBox(width: 4),
                        Text(
                          'Verified Customer',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // Stats Cards
            Container(
              padding: EdgeInsets.all(16),
              child: Row(
                children: [
                  Expanded(child: _buildStatCard('Jobs Posted', '12', Icons.work, Colors.blue)),
                  SizedBox(width: 12),
                  Expanded(child: _buildStatCard('Completed', '8', Icons.check_circle, Colors.green)),
                  SizedBox(width: 12),
                  Expanded(child: _buildStatCard('Rating', '4.9', Icons.star, Colors.orange)),
                ],
              ),
            ),

            // Menu Items
            _buildMenuItem('Personal Information', Icons.person_outline, () {}),
            _buildMenuItem('Address Book', Icons.location_on_outlined, () {}),
            _buildMenuItem('Payment Methods', Icons.payment, () {}),
            _buildMenuItem('Job History', Icons.history, () {}),
            _buildMenuItem('Reviews & Ratings', Icons.star_outline, () {}),
            _buildMenuItem('Help & Support', Icons.help_outline, () {}),
            _buildMenuItem('Privacy & Security', Icons.security, () {}),
            _buildMenuItem('Terms & Conditions', Icons.description, () {}),

            SizedBox(height: 16),

            // Logout Button
            Container(
              margin: EdgeInsets.symmetric(horizontal: 16),
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: Text('Logout'),
                        content: Text('Are you sure you want to logout?'),
                        actions: [
                          TextButton(
                            onPressed: () => Navigator.pop(context),
                            child: Text('Cancel'),
                          ),
                          ElevatedButton(
                            onPressed: () {
                              Navigator.pop(context);
                              // Handle logout
                            },
                            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                            child: Text('Logout', style: TextStyle(color: Colors.white)),
                          ),
                        ],
                      );
                    },
                  );
                },
                icon: Icon(Icons.logout, color: Colors.red),
                label: Text(
                  'Logout',
                  style: TextStyle(
                    color: Colors.red,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                style: OutlinedButton.styleFrom(
                  side: BorderSide(color: Colors.red),
                  padding: EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ),

            SizedBox(height: 32),

            // App Version
            Text(
              'Version 1.2.3',
              style: TextStyle(
                color: Colors.grey[500],
                fontSize: 12,
              ),
            ),

            SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String title, String value, IconData icon, Color color) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 4,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          SizedBox(height: 8),
          Text(
            value,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            title,
            style: TextStyle(
              fontSize: 11,
              color: Colors.grey[600],
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildMenuItem(String title, IconData icon, VoidCallback onTap) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.05),
            spreadRadius: 1,
            blurRadius: 4,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: ListTile(
        leading: Container(
          padding: EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: Colors.grey[100],
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: Colors.grey[600], size: 20),
        ),
        title: Text(
          title,
          style: TextStyle(
            fontWeight: FontWeight.w500,
            fontSize: 15,
          ),
        ),
        trailing: Icon(Icons.chevron_right, color: Colors.grey[400]),
        onTap: onTap,
        contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      ),
    );
  }
}
import 'package:flutter/material.dart';

class WorkerDashboard extends StatefulWidget {
  @override
  _WorkerDashboardState createState() => _WorkerDashboardState();
}

class _WorkerDashboardState extends State<WorkerDashboard> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Worker Dashboard'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
          Padding(
            padding: EdgeInsets.only(right: 16),
            child: CircleAvatar(
              backgroundColor: Colors.green,
              child: Text('S', style: TextStyle(color: Colors.white)),
            ),
          ),
        ],
      ),
      body: _buildCurrentPage(),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _currentIndex,
        selectedItemColor: Colors.green,
        unselectedItemColor: Colors.grey,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.schedule), label: 'Schedule'),
          BottomNavigationBarItem(icon: Icon(Icons.attach_money), label: 'Earnings'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }

  Widget _buildCurrentPage() {
    switch (_currentIndex) {
      case 0:
        return _buildHomePage();
      case 1:
        return _buildSchedulePage();
      case 2:
        return _buildEarningsPage();
      case 3:
        return _buildProfilePage();
      default:
        return _buildHomePage();
    }
  }

  Widget _buildHomePage() {
    return SingleChildScrollView(
      padding: EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Ready to work!',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            '3 new job opportunities',
            style: TextStyle(
              color: Colors.grey[600],
              fontSize: 16,
            ),
          ),
          SizedBox(height: 24),
          Row(
            children: [
              Expanded(
                child: _buildStatCard('R2,450', 'This\nWeek', Colors.green),
              ),
              SizedBox(width: 16),
              Expanded(
                child: _buildStatCard('4.9', 'Rating', Colors.blue),
              ),
              SizedBox(width: 16),
              Expanded(
                child: _buildStatCard('12', 'Jobs\nDone', Colors.purple),
              ),
            ],
          ),
          SizedBox(height: 32),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Available Jobs',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Icon(Icons.filter_list),
            ],
          ),
          SizedBox(height: 16),
          _buildJobCard(
            'Garden Maintenance',
            'R180/hr',
            '2.1 km away • Pretoria East',
            'Looking for help with lawn mowing and garden cleanup. Must have own tools.',
            4.7,
            24,
            true,
          ),
          SizedBox(height: 12),
          _buildJobCard(
            'House Cleaning',
            'R150/hr',
            '1.8 km away • Centurion',
            'Need someone to clean a 3-bedroom house. All supplies provided.',
            4.5,
            18,
            true,
          ),
        ],
      ),
    );
  }

  Widget _buildSchedulePage() {
    return SingleChildScrollView(
      padding: EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'My Schedule',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 20),
          _buildScheduleItem('Today', 'Garden Maintenance', '2:00 PM - 5:00 PM', 'Pretoria East'),
          SizedBox(height: 12),
          _buildScheduleItem('Tomorrow', 'House Cleaning', '9:00 AM - 1:00 PM', 'Centurion'),
          SizedBox(height: 12),
          _buildScheduleItem('Friday', 'Handyman Work', '10:00 AM - 3:00 PM', 'Hatfield'),
        ],
      ),
    );
  }

  Widget _buildEarningsPage() {
    return SingleChildScrollView(
      padding: EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Earnings',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 20),
          Container(
            width: double.infinity,
            padding: EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.green,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              children: [
                Text(
                  'Total Earnings',
                  style: TextStyle(color: Colors.white, fontSize: 16),
                ),
                SizedBox(height: 8),
                Text(
                  'R12,450',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 20),
          Text(
            'Recent Payments',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 16),
          _buildPaymentItem('Garden Maintenance', 'R540', 'Completed'),
          SizedBox(height: 12),
          _buildPaymentItem('House Cleaning', 'R450', 'Completed'),
          SizedBox(height: 12),
          _buildPaymentItem('Handyman Work', 'R720', 'Pending'),
        ],
      ),
    );
  }

  Widget _buildProfilePage() {
    return SingleChildScrollView(
      padding: EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Profile',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 20),
          Center(
            child: Column(
              children: [
                CircleAvatar(
                  radius: 50,
                  backgroundColor: Colors.green,
                  child: Text(
                    'S',
                    style: TextStyle(color: Colors.white, fontSize: 32),
                  ),
                ),
                SizedBox(height: 16),
                Text(
                  'Sam Worker',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                Text(
                  'Garden & Home Services',
                  style: TextStyle(color: Colors.grey[600], fontSize: 16),
                ),
              ],
            ),
          ),
          SizedBox(height: 32),
          _buildProfileOption('Edit Profile', Icons.edit),
          _buildProfileOption('My Reviews', Icons.star),
          _buildProfileOption('Payment Methods', Icons.payment),
          _buildProfileOption('Help & Support', Icons.help),
          _buildProfileOption('Settings', Icons.settings),
          _buildProfileOption('Logout', Icons.logout, isDestructive: true),
        ],
      ),
    );
  }

  Widget _buildStatCard(String value, String label, Color color) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey[50],
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(
            value,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              color: Colors.grey[600],
              fontSize: 12,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildJobCard(
      String title,
      String rate,
      String location,
      String description,
      double rating,
      int reviews,
      bool canApply,
      ) {
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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                rate,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.green,
                ),
              ),
            ],
          ),
          SizedBox(height: 4),
          Text(
            location,
            style: TextStyle(
              color: Colors.grey[600],
              fontSize: 14,
            ),
          ),
          SizedBox(height: 8),
          Text(
            description,
            style: TextStyle(fontSize: 14),
          ),
          SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(Icons.star, color: Colors.orange, size: 16),
                  SizedBox(width: 4),
                  Text(
                    'Customer: $rating rating',
                    style: TextStyle(fontSize: 12),
                  ),
                ],
              ),
              if (canApply)
                GestureDetector(
                  onTap: () {
                    // Handle apply action
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Applied to $title')),
                    );
                  },
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.green,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      'Apply',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ),
                )
              else
                Text(
                  'Pass',
                  style: TextStyle(
                    color: Colors.grey[600],
                    fontSize: 12,
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildScheduleItem(String day, String job, String time, String location) {
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
      child: Row(
        children: [
          Container(
            width: 60,
            child: Text(
              day,
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: Colors.green,
              ),
            ),
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  job,
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                Text(
                  time,
                  style: TextStyle(color: Colors.grey[600], fontSize: 14),
                ),
                Text(
                  location,
                  style: TextStyle(color: Colors.grey[500], fontSize: 12),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPaymentItem(String job, String amount, String status) {
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
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                job,
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              Text(
                status,
                style: TextStyle(
                  color: status == 'Completed' ? Colors.green : Colors.orange,
                  fontSize: 12,
                ),
              ),
            ],
          ),
          Text(
            amount,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.green,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileOption(String title, IconData icon, {bool isDestructive = false}) {
    return GestureDetector(
      onTap: () {
        // Handle profile option tap
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('$title tapped')),
        );
      },
      child: Container(
        margin: EdgeInsets.only(bottom: 12),
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
        child: Row(
          children: [
            Icon(
              icon,
              color: isDestructive ? Colors.red : Colors.grey[700],
            ),
            SizedBox(width: 16),
            Text(
              title,
              style: TextStyle(
                fontSize: 16,
                color: isDestructive ? Colors.red : Colors.black,
              ),
            ),
            Spacer(),
            Icon(
              Icons.chevron_right,
              color: Colors.grey[400],
            ),
          ],
        ),
      ),
    );
  }
}
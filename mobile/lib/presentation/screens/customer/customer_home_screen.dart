import 'package:flutter/material.dart';

// Home Screen (Original Dashboard Content)
class CustomerHomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Customer Dashboard'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        actions: [
          Stack(
            children: [
              IconButton(
                icon: Icon(Icons.notifications_outlined),
                onPressed: () {},
              ),
              Positioned(
                right: 11,
                top: 11,
                child: Container(
                  padding: EdgeInsets.all(2),
                  decoration: BoxDecoration(
                    color: Colors.red,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  constraints: BoxConstraints(
                    minWidth: 14,
                    minHeight: 14,
                  ),
                  child: Text(
                    '3',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 8,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: EdgeInsets.only(right: 16),
            child: GestureDetector(
              onTap: () {},
              child: CircleAvatar(
                backgroundColor: Colors.blue,
                child: Text('J', style: TextStyle(color: Colors.white)),
              ),
            ),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          await Future.delayed(Duration(seconds: 1));
        },
        child: SingleChildScrollView(
          padding: EdgeInsets.all(20),
          physics: AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Good morning, John!',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'Find help for your tasks',
                style: TextStyle(
                  color: Colors.grey[600],
                  fontSize: 16,
                ),
              ),
              SizedBox(height: 24),

              // Quick Stats
              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Colors.blue[400]!, Colors.blue[600]!],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildStatItem('Jobs Posted', '12', Icons.work),
                    Container(height: 40, width: 1, color: Colors.white.withOpacity(0.3)),
                    _buildStatItem('Completed', '8', Icons.check_circle),
                    Container(height: 40, width: 1, color: Colors.white.withOpacity(0.3)),
                    _buildStatItem('Rating', '4.9', Icons.star),
                  ],
                ),
              ),

              SizedBox(height: 24),
              Row(
                children: [
                  Expanded(
                    child: GestureDetector(
                      onTap: () => Navigator.pushNamed(context, '/post-job'),
                      child: Container(
                        height: 120,
                        decoration: BoxDecoration(
                          color: Colors.blue,
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.add, color: Colors.white, size: 32),
                            SizedBox(height: 8),
                            Text(
                              'Post a Job',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: GestureDetector(
                      onTap: () => Navigator.pushNamed(context, '/browse-workers'),
                      child: Container(
                        height: 120,
                        decoration: BoxDecoration(
                          color: Colors.grey[100],
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.search, color: Colors.grey[600], size: 32),
                            SizedBox(height: 8),
                            Text(
                              'Find\nWorkers',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: Colors.grey[600],
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 32),
              Text(
                'Active Jobs',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16),
              _buildActiveJobCard('House Cleaning', 'Sarah M.', 'Started 2 hours ago', Colors.green, 'In Progress'),
              SizedBox(height: 12),
              _buildActiveJobCard('Garden Maintenance', 'Mike D.', 'Scheduled for tomorrow 9 AM', Colors.orange, 'Scheduled'),
              SizedBox(height: 32),
              Text(
                'Recent Workers',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16),
              _buildWorkerCard('Sarah M.', 4.8, 24, 'Cleaner', Colors.green),
              SizedBox(height: 12),
              _buildWorkerCard('David K.', 4.9, 18, 'Handyman', Colors.purple),
              SizedBox(height: 12),
              _buildWorkerCard('Lisa T.', 4.7, 31, 'Gardener', Colors.teal),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatItem(String label, String value, IconData icon) {
    return Column(
      children: [
        Icon(icon, color: Colors.white, size: 20),
        SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            color: Colors.white.withOpacity(0.8),
            fontSize: 12,
          ),
        ),
      ],
    );
  }

  Widget _buildActiveJobCard(String title, String worker, String status, Color color, String badge) {
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
          CircleAvatar(
            backgroundColor: color,
            child: Text(worker[0], style: TextStyle(color: Colors.white)),
          ),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  'with $worker',
                  style: TextStyle(
                    color: Colors.grey[600],
                    fontSize: 14,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  status,
                  style: TextStyle(
                    color: Colors.grey[500],
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Text(
              badge,
              style: TextStyle(
                color: color,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildWorkerCard(String name, double rating, int reviews, String specialty, Color color) {
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
          CircleAvatar(
            backgroundColor: color,
            child: Text(name[0], style: TextStyle(color: Colors.white)),
          ),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  specialty,
                  style: TextStyle(
                    color: Colors.grey[700],
                    fontSize: 13,
                  ),
                ),
                Row(
                  children: [
                    Icon(Icons.star, color: Colors.orange, size: 16),
                    SizedBox(width: 4),
                    Text(
                      '$rating ($reviews reviews)',
                      style: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            ),
            child: Text(
              'Book Again',
              style: TextStyle(fontSize: 12, color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}

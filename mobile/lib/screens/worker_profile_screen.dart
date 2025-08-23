import 'package:flutter/material.dart';

class WorkerProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Worker Profile'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(Icons.share),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.all(20),
              child: Column(
                children: [
                  CircleAvatar(
                    backgroundColor: Colors.purple,
                    radius: 40,
                    child: Text(
                      'S',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Sarah Mitchell',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(width: 8),
                      Icon(Icons.verified, color: Colors.green, size: 20),
                    ],
                  ),
                  Text(
                    'Professional House Cleaning',
                    style: TextStyle(
                      color: Colors.grey[600],
                      fontSize: 16,
                    ),
                  ),
                  SizedBox(height: 16),
                  Row(
                    children: [
                      Icon(Icons.star, color: Colors.orange, size: 20),
                      SizedBox(width: 4),
                      Text(
                        '4.9',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        ' (127 reviews)',
                        style: TextStyle(
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 20),
                  Row(
                    children: [
                      Expanded(
                        child: _buildStatItem('3.2 km', 'Away'),
                      ),
                      Expanded(
                        child: _buildStatItem('156', 'Jobs Done'),
                      ),
                      Expanded(
                        child: _buildStatItem('R180/hr', 'Rate'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Container(
              padding: EdgeInsets.all(20),
              color: Colors.grey[50],
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'About',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Professional cleaner with 5+ years experience. I specialize in deep cleaning, regular maintenance, and move-in/move-out cleaning. I bring my own supplies and equipment. Available weekdays and weekends.',
                    style: TextStyle(
                      fontSize: 14,
                      height: 1.5,
                    ),
                  ),
                  SizedBox(height: 20),
                  Text(
                    'Services & Skills',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 12),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      _buildSkillChip('House Cleaning'),
                      _buildSkillChip('Deep Cleaning', Colors.blue),
                      _buildSkillChip('Kitchen', Colors.blue),
                      _buildSkillChip('Bathroom', Colors.blue),
                      _buildSkillChip('Windows', Colors.blue),
                      _buildSkillChip('Laundry', Colors.blue),
                    ],
                  ),
                  SizedBox(height: 20),
                  Text(
                    'Recent Reviews',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 12),
                  _buildReviewItem('John D.', 5, '2 days ago', 'Excellent work! Very thorough and professional.'),
                  _buildReviewItem('Mary S.', 5, '1 week ago', 'Sarah did an amazing job. Will definitely book again.'),
                  SizedBox(height: 20),
                  Text(
                    'Availability',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 12),
                  _buildAvailabilityCalendar(),
                  SizedBox(height: 8),
                  Text(
                    'Available Mon-Fri, 8AM-5PM',
                    style: TextStyle(
                      color: Colors.grey[600],
                      fontSize: 14,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Container(
        padding: EdgeInsets.all(20),
        child: Row(
          children: [
            Expanded(
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(28),
                  ),
                  padding: EdgeInsets.symmetric(vertical: 16),
                ),
                child: Text(
                  'Book Sarah',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            SizedBox(width: 12),
            OutlinedButton(
              onPressed: () {},
              style: OutlinedButton.styleFrom(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(28),
                ),
                padding: EdgeInsets.symmetric(vertical: 16, horizontal: 24),
              ),
              child: Text('Message Sarah'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            color: Colors.grey[600],
            fontSize: 12,
          ),
        ),
      ],
    );
  }

  Widget _buildSkillChip(String skill, [Color? color]) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: (color ?? Colors.grey[300])?.withOpacity(0.2),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color ?? Colors.grey[400]!),
      ),
      child: Text(
        skill,
        style: TextStyle(
          fontSize: 12,
          color: color ?? Colors.grey[700],
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  Widget _buildReviewItem(String name, int rating, String time, String comment) {
    return Container(
      margin: EdgeInsets.only(bottom: 12),
      padding: EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                name,
                style: TextStyle(fontWeight: FontWeight.w600),
              ),
              Spacer(),
              Row(
                children: List.generate(5, (index) => Icon(
                  Icons.star,
                  size: 14,
                  color: index < rating ? Colors.orange : Colors.grey[300],
                )),
              ),
              SizedBox(width: 8),
              Text(
                time,
                style: TextStyle(
                  color: Colors.grey[500],
                  fontSize: 12,
                ),
              ),
            ],
          ),
          SizedBox(height: 4),
          Text(
            comment,
            style: TextStyle(fontSize: 14),
          ),
        ],
      ),
    );
  }

  Widget _buildAvailabilityCalendar() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const availableDays = [true, true, true, true, true, false, false];

    return Row(
      children: days.asMap().entries.map((entry) {
        int index = entry.key;
        String day = entry.value;
        bool available = availableDays[index];

        return Expanded(
          child: Container(
            margin: EdgeInsets.symmetric(horizontal: 2),
            padding: EdgeInsets.symmetric(vertical: 8),
            decoration: BoxDecoration(
              color: available ? Colors.green[100] : Colors.grey[200],
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              day,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 12,
                color: available ? Colors.green[700] : Colors.grey[500],
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }
}

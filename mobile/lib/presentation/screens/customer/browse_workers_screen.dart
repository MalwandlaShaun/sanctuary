import 'package:flutter/material.dart';

class BrowseWorkersScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Find Workers'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(Icons.filter_list),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(20),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search by skill or service',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: Colors.grey[300]!),
                ),
                filled: true,
                fillColor: Colors.grey[50],
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              children: [
                _buildCategoryChip('All', true),
                SizedBox(width: 8),
                _buildCategoryChip('Cleaning', false),
                SizedBox(width: 8),
                _buildCategoryChip('Garden', false),
                SizedBox(width: 8),
                _buildCategoryChip('Moving', false),
              ],
            ),
          ),
          SizedBox(height: 16),
          Expanded(
            child: ListView(
              padding: EdgeInsets.symmetric(horizontal: 20),
              children: [
                _buildWorkerCard(
                  'Sarah Mitchell',
                  'House Cleaning',
                  'R180/hr',
                  4.9,
                  127,
                  1.2,
                  context,
                ),
                SizedBox(height: 12),
                _buildWorkerCard(
                  'David Molefe',
                  'Garden Maintenance',
                  'R150/hr',
                  4.8,
                  89,
                  2.1,
                  context,
                ),
                SizedBox(height: 12),
                _buildWorkerCard(
                  'Thandi Nkomo',
                  'Moving & Packing',
                  'R200/hr',
                  4.7,
                  64,
                  3.5,
                  context,
                ),
                SizedBox(height: 12),
                _buildWorkerCard(
                  'John van der Walt',
                  'Handyman Services',
                  'R220/hr',
                  4.9,
                  156,
                  1.8,
                  context,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryChip(String label, bool isSelected) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: isSelected ? Colors.blue : Colors.grey[200],
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: isSelected ? Colors.white : Colors.grey[700],
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  Widget _buildWorkerCard(
      String name,
      String service,
      String rate,
      double rating,
      int reviews,
      double distance,
      BuildContext context,
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
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: Colors.blue,
            radius: 25,
            child: Text(
              name[0],
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
          ),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      name,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(width: 4),
                    Icon(Icons.verified, color: Colors.green, size: 16),
                  ],
                ),
                Text(
                  service,
                  style: TextStyle(
                    color: Colors.grey[600],
                    fontSize: 14,
                  ),
                ),
                SizedBox(height: 4),
                Row(
                  children: [
                    Icon(Icons.star, color: Colors.orange, size: 16),
                    SizedBox(width: 4),
                    Text(
                      '$rating ($reviews)',
                      style: TextStyle(fontSize: 12),
                    ),
                    SizedBox(width: 12),
                    Icon(Icons.location_on, color: Colors.grey, size: 14),
                    SizedBox(width: 2),
                    Text(
                      '${distance.toString()} km',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey[600],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Column(
            children: [
              Text(
                rate,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.green,
                ),
              ),
              SizedBox(height: 8),
              ElevatedButton(
                onPressed: () => Navigator.pushNamed(context, '/worker-profile'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                ),
                child: Text(
                  'View Profile',
                  style: TextStyle(fontSize: 12, color: Colors.white),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

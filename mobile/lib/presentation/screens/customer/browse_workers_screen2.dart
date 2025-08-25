import 'package:flutter/material.dart';

class BrowseWorkersScreen extends StatefulWidget {
  @override
  _BrowseWorkersScreenState createState() => _BrowseWorkersScreenState();
}

class _BrowseWorkersScreenState extends State<BrowseWorkersScreen> {
  String selectedCategory = 'All';
  final List<String> categories = ['All', 'Cleaning', 'Handyman', 'Gardening', 'Cooking', 'Security'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Browse Workers'),
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
          // Search Bar
          Container(
            padding: EdgeInsets.all(16),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search workers by name or skill...',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: Colors.grey[100],
              ),
            ),
          ),

          // Category Filter
          Container(
            height: 50,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 16),
              itemCount: categories.length,
              itemBuilder: (context, index) {
                bool isSelected = selectedCategory == categories[index];
                return Container(
                  margin: EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(categories[index]),
                    selected: isSelected,
                    onSelected: (selected) {
                      setState(() {
                        selectedCategory = categories[index];
                      });
                    },
                    selectedColor: Colors.blue.withOpacity(0.2),
                    checkmarkColor: Colors.blue,
                  ),
                );
              },
            ),
          ),

          SizedBox(height: 16),

          // Workers List
          Expanded(
            child: ListView.builder(
              padding: EdgeInsets.symmetric(horizontal: 16),
              itemCount: 10,
              itemBuilder: (context, index) {
                return _buildWorkerCard(index);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildWorkerCard(int index) {
    final workers = [
      {'name': 'Sarah Mitchell', 'skill': 'Professional Cleaner', 'rating': 4.9, 'reviews': 127, 'price': '250', 'distance': '2.1 km', 'available': true},
      {'name': 'David Thompson', 'skill': 'Certified Handyman', 'rating': 4.8, 'reviews': 89, 'price': '300', 'distance': '1.5 km', 'available': true},
      {'name': 'Maria Santos', 'skill': 'Garden Specialist', 'rating': 4.7, 'reviews': 156, 'price': '180', 'distance': '3.2 km', 'available': false},
      {'name': 'John Williams', 'skill': 'Security Guard', 'rating': 4.9, 'reviews': 203, 'price': '220', 'distance': '0.8 km', 'available': true},
      {'name': 'Lisa Chen', 'skill': 'Chef & Caterer', 'rating': 4.8, 'reviews': 94, 'price': '400', 'distance': '2.8 km', 'available': true},
    ];

    final worker = workers[index % workers.length];

    return Container(
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
      child: Column(
        children: [
          Row(
            children: [
              CircleAvatar(
                backgroundColor: Colors.primaries[index % Colors.primaries.length],
                radius: 25,
                child: Text(
                  worker['name'].toString().split(' ')[0][0],
                  style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
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
                          worker['name'] as String,
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        if (worker['available'] as bool)
                          Container(
                            margin: EdgeInsets.only(left: 8),
                            padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: Colors.green,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              'Available',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                      ],
                    ),
                    Text(
                      worker['skill'] as String,
                      style: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 14,
                      ),
                    ),
                    SizedBox(height: 4),
                    Row(
                      children: [
                        Icon(Icons.star, color: Colors.orange, size: 16),
                        Text(
                          ' ${worker['rating']} (${worker['reviews']} reviews)',
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.grey[600],
                          ),
                        ),
                        Text(
                          ' • ${worker['distance']}',
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
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    'R${worker['price']}/hr',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.green[700],
                    ),
                  ),
                  SizedBox(height: 8),
                  ElevatedButton(
                    onPressed: worker['available'] as bool ? () {} : null,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    ),
                    child: Text(
                      'Hire',
                      style: TextStyle(fontSize: 12, color: Colors.white),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
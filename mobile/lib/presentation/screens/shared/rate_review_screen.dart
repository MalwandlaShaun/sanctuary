import 'package:flutter/material.dart';

class RateReviewScreen extends StatefulWidget {
  @override
  _RateReviewScreenState createState() => _RateReviewScreenState();
}

class _RateReviewScreenState extends State<RateReviewScreen> {
  int _rating = 5;
  final _reviewController = TextEditingController();
  List<String> _selectedQuickFeedback = [];

  final List<String> _quickFeedbackOptions = [
    'Professional',
    'On time',
    'Quality work',
    'Friendly',
    'Clean',
    'Reliable',
    'Good value',
    'Would recommend',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Rate & Review'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20),
        child: Column(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: Colors.green,
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.check,
                color: Colors.white,
                size: 40,
              ),
            ),
            SizedBox(height: 20),
            Text(
              'Job Completed!',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              'House cleaning with Sarah M.',
              style: TextStyle(
                color: Colors.grey[600],
                fontSize: 16,
              ),
            ),
            SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.schedule, size: 16, color: Colors.grey[600]),
                SizedBox(width: 4),
                Text(
                  '3 hours 15 minutes',
                  style: TextStyle(
                    color: Colors.grey[600],
                    fontSize: 14,
                  ),
                ),
                SizedBox(width: 16),
                Text(
                  'R650.00',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.green,
                  ),
                ),
              ],
            ),
            SizedBox(height: 40),
            Text(
              'How was your experience with\nthis customer?',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(5, (index) {
                return GestureDetector(
                  onTap: () {
                    setState(() {
                      _rating = index + 1;
                    });
                  },
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 4),
                    child: Icon(
                      Icons.star,
                      size: 40,
                      color: index < _rating ? Colors.orange : Colors.grey[300],
                    ),
                  ),
                );
              }),
            ),
            SizedBox(height: 32),
            TextField(
              controller: _reviewController,
              maxLines: 4,
              decoration: InputDecoration(
                hintText: 'Share your experience\n(optional)',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: Colors.grey[300]!),
                ),
                filled: true,
                fillColor: Colors.grey[50],
              ),
            ),
            SizedBox(height: 24),
            Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Quick feedback',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: _quickFeedbackOptions.map((option) {
                bool isSelected = _selectedQuickFeedback.contains(option);
                return GestureDetector(
                  onTap: () {
                    setState(() {
                      if (isSelected) {
                        _selectedQuickFeedback.remove(option);
                      } else {
                        _selectedQuickFeedback.add(option);
                      }
                    });
                  },
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: isSelected ? Colors.blue[50] : Colors.grey[100],
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                        color: isSelected ? Colors.blue : Colors.grey[300]!,
                      ),
                    ),
                    child: Text(
                      option,
                      style: TextStyle(
                        color: isSelected ? Colors.blue : Colors.grey[700],
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
            SizedBox(height: 40),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {
                  // Handle review submission
                  Navigator.pop(context);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(28),
                  ),
                ),
                child: Text(
                  'Submit Review',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}



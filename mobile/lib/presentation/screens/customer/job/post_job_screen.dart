import 'package:flutter/material.dart';

class PostJobScreen extends StatefulWidget {
  @override
  _PostJobScreenState createState() => _PostJobScreenState();
}

class _PostJobScreenState extends State<PostJobScreen> {
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _locationController = TextEditingController(text: 'Brooklyn, Pretoria - Use current location');
  final _rateController = TextEditingController(text: 'R 200');
  final _durationController = TextEditingController(text: '3-4 hours');

  String _selectedTimeframe = 'As soon as possible';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Post Job'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Post a Job',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 24),
            _buildTextField('What do you need help with?', 'e.g, House cleaning, Garden maintenance', _titleController),
            SizedBox(height: 20),
            _buildTextField('Job Description', 'Describe the work you need done, include specific requirements...', _descriptionController, maxLines: 4),
            SizedBox(height: 20),
            _buildTextField('Location', null, _locationController, prefixIcon: Icons.location_on),
            SizedBox(height: 20),
            Text(
              'Budget & Duration',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _buildTextField('Hourly Rate', null, _rateController),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: _buildTextField('Est. Duration', null, _durationController),
                ),
              ],
            ),
            SizedBox(height: 20),
            Text(
              'When do you need this done?',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 12),
            _buildTimeframeOption('As soon as possible', 'Today or tomorrow', true),
            _buildTimeframeOption('This week', 'Within 7 days', false),
            _buildTimeframeOption('Schedule for later', 'Pick specific date', false),
            SizedBox(height: 40),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {
                  // Handle job posting
                  Navigator.pop(context);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(28),
                  ),
                ),
                child: Text(
                  'Post Job',
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

  Widget _buildTextField(String label, String? hint, TextEditingController controller, {int maxLines = 1, IconData? prefixIcon, String? labelText}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          labelText ?? label,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 8),
        TextField(
          controller: controller,
          maxLines: maxLines,
          decoration: InputDecoration(
            hintText: hint,
            prefixIcon: prefixIcon != null ? Icon(prefixIcon) : null,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.grey[300]!),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.grey[300]!),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.blue),
            ),
            filled: true,
            fillColor: Colors.grey[50],
          ),
        ),
      ],
    );
  }

  Widget _buildTimeframeOption(String title, String subtitle, bool isSelected) {
    return Container(
      margin: EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: () {
          setState(() {
            _selectedTimeframe = title;
          });
        },
        child: Container(
          padding: EdgeInsets.all(16),
          decoration: BoxDecoration(
            border: Border.all(
              color: isSelected ? Colors.blue : Colors.grey[300]!,
              width: isSelected ? 2 : 1,
            ),
            borderRadius: BorderRadius.circular(12),
            color: isSelected ? Colors.blue[50] : Colors.white,
          ),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: isSelected ? Colors.blue[800] : Colors.black,
                      ),
                    ),
                    SizedBox(height: 4),
                    Text(
                      subtitle,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey[600],
                      ),
                    ),
                  ],
                ),
              ),
              if (isSelected)
                Icon(
                  Icons.check_circle,
                  color: Colors.blue,
                  size: 24,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
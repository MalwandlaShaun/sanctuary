import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class WorkerRegistrationScreen extends StatefulWidget {
  @override
  _WorkerRegistrationScreenState createState() => _WorkerRegistrationScreenState();
}

class _WorkerRegistrationScreenState extends State<WorkerRegistrationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _experienceController = TextEditingController();
  final _rateController = TextEditingController();

  // Add PageController to control the PageView
  final PageController _pageController = PageController();

  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;
  bool _agreeToTerms = false;
  bool _backgroundCheck = false;
  int _currentStep = 0;

  List<String> _selectedSkills = [];
  List<String> _availableSkills = [
    'House Cleaning',
    'Garden Maintenance',
    'Handyman Services',
    'Child Care',
    'Pet Care',
    'Cooking',
    'Laundry',
    'Tutoring',
    'Moving Help',
    'Delivery Services',
    'Painting',
    'Electrical Work',
    'Plumbing',
    'Car Wash',
    'Event Help',
  ];

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _experienceController.dispose();
    _rateController.dispose();
    _pageController.dispose(); // Don't forget to dispose the controller
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Worker Registration',
          style: TextStyle(
            color: Colors.black,
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: false,
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Progress Indicator
            Container(
              padding: EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              child: Row(
                children: [
                  Expanded(
                    child: LinearProgressIndicator(
                      value: (_currentStep + 1) / 4,
                      backgroundColor: Colors.grey[300],
                      valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF4CAF50)),
                      minHeight: 4,
                    ),
                  ),
                  SizedBox(width: 12),
                  Text(
                    'Step ${_currentStep + 1} of 4',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[600],
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),

            Expanded(
              child: PageView(
                controller: _pageController, // Add the controller
                onPageChanged: (index) {
                  setState(() {
                    _currentStep = index;
                  });
                },
                children: [
                  _buildBasicInfoStep(),
                  _buildSkillsExperienceStep(),
                  _buildVerificationStep(),
                  _buildBankingStep(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBasicInfoStep() {
    return SingleChildScrollView( // Wrap with SingleChildScrollView
      padding: EdgeInsets.all(24.0),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min, // Add this
          children: [
            Text(
              'Basic Info & Profile',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Tell us about yourself to get started',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[600],
              ),
            ),
            SizedBox(height: 32),

            // Profile Picture
            Center(
              child: Stack(
                children: [
                  CircleAvatar(
                    radius: 50,
                    backgroundColor: Colors.grey[300],
                    child: Icon(
                      Icons.person,
                      size: 50,
                      color: Colors.grey[600],
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: GestureDetector(
                      onTap: () {
                        // Handle image selection
                      },
                      child: Container(
                        padding: EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Color(0xFF4CAF50),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          Icons.camera_alt,
                          color: Colors.white,
                          size: 16,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            SizedBox(height: 32),

            // Full Name
            TextFormField(
              controller: _nameController,
              decoration: InputDecoration(
                labelText: 'Full Name',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: Icon(Icons.person_outline),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your full name';
                }
                return null;
              },
            ),

            SizedBox(height: 16),

            // Email
            TextFormField(
              controller: _emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                labelText: 'Email Address',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: Icon(Icons.email_outlined),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your email';
                }
                if (!value.contains('@')) {
                  return 'Please enter a valid email';
                }
                return null;
              },
            ),

            SizedBox(height: 16),

            // Phone Number
            TextFormField(
              controller: _phoneController,
              keyboardType: TextInputType.phone,
              inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              decoration: InputDecoration(
                labelText: 'Phone Number',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: Icon(Icons.phone_outlined),
                prefixText: '+27 ',
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your phone number';
                }
                return null;
              },
            ),

            SizedBox(height: 16),

            // Password
            TextFormField(
              controller: _passwordController,
              obscureText: _obscurePassword,
              decoration: InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: Icon(Icons.lock_outline),
                suffixIcon: IconButton(
                  icon: Icon(_obscurePassword ? Icons.visibility : Icons.visibility_off),
                  onPressed: () {
                    setState(() {
                      _obscurePassword = !_obscurePassword;
                    });
                  },
                ),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter a password';
                }
                if (value.length < 6) {
                  return 'Password must be at least 6 characters';
                }
                return null;
              },
            ),

            SizedBox(height: 16),

            // Confirm Password
            TextFormField(
              controller: _confirmPasswordController,
              obscureText: _obscureConfirmPassword,
              decoration: InputDecoration(
                labelText: 'Confirm Password',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: Icon(Icons.lock_outline),
                suffixIcon: IconButton(
                  icon: Icon(_obscureConfirmPassword ? Icons.visibility : Icons.visibility_off),
                  onPressed: () {
                    setState(() {
                      _obscureConfirmPassword = !_obscureConfirmPassword;
                    });
                  },
                ),
              ),
              validator: (value) {
                if (value != _passwordController.text) {
                  return 'Passwords do not match';
                }
                return null;
              },
            ),

            SizedBox(height: 40), // Changed from Spacer() to SizedBox

            // Continue Button
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    // Move to next step using PageController
                    _pageController.nextPage(
                      duration: Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF4CAF50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(28),
                  ),
                  elevation: 0,
                ),
                child: Text(
                  'Continue',
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

  Widget _buildSkillsExperienceStep() {
    return SingleChildScrollView( // Wrap with SingleChildScrollView
      padding: EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min, // Add this
        children: [
          Text(
            'Skills and Experience',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
          SizedBox(height: 8),
          Text(
            'Tell us what services you can provide',
            style: TextStyle(
              fontSize: 16,
              color: Colors.grey[600],
            ),
          ),
          SizedBox(height: 32),

          // Skills Selection
          Text(
            'Select Your Skills',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: Colors.black,
            ),
          ),
          SizedBox(height: 16),

          // Fixed height container for skills grid instead of Expanded
          Container(
            height: 300, // Set a fixed height
            child: GridView.builder(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 3,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
              ),
              itemCount: _availableSkills.length,
              itemBuilder: (context, index) {
                final skill = _availableSkills[index];
                final isSelected = _selectedSkills.contains(skill);

                return GestureDetector(
                  onTap: () {
                    setState(() {
                      if (isSelected) {
                        _selectedSkills.remove(skill);
                      } else {
                        _selectedSkills.add(skill);
                      }
                    });
                  },
                  child: Container(
                    decoration: BoxDecoration(
                      color: isSelected ? Color(0xFF4CAF50) : Colors.transparent,
                      border: Border.all(
                        color: isSelected ? Color(0xFF4CAF50) : Colors.grey[300]!,
                        width: 2,
                      ),
                      borderRadius: BorderRadius.circular(25),
                    ),
                    child: Center(
                      child: Text(
                        skill,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: isSelected ? Colors.white : Colors.black,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          SizedBox(height: 24),

          // Experience
          TextFormField(
            controller: _experienceController,
            maxLines: 3,
            decoration: InputDecoration(
              labelText: 'Describe Your Experience',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              alignLabelWithHint: true,
            ),
          ),

          SizedBox(height: 16),

          // Hourly Rate
          TextFormField(
            controller: _rateController,
            keyboardType: TextInputType.number,
            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            decoration: InputDecoration(
              labelText: 'Hourly Rate (R)',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              prefixIcon: Icon(Icons.attach_money),
              suffixText: 'per hour',
            ),
          ),

          SizedBox(height: 40), // Changed from default spacing

          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () {
                    _pageController.previousPage(
                      duration: Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                    );
                  },
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: Color(0xFF4CAF50)),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(28),
                    ),
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text(
                    'Back',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF4CAF50),
                    ),
                  ),
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: ElevatedButton(
                  onPressed: _selectedSkills.isNotEmpty ? () {
                    _pageController.nextPage(
                      duration: Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                    );
                  } : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _selectedSkills.isNotEmpty ? Color(0xFF4CAF50) : Colors.grey[400],
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(28),
                    ),
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text(
                    'Continue',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildVerificationStep() {
    return SingleChildScrollView( // Wrap with SingleChildScrollView
      padding: EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min, // Add this
        children: [
          Text(
            'ID and Background Check',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
          SizedBox(height: 8),
          Text(
            'Complete verification to build trust with customers',
            style: TextStyle(
              fontSize: 16,
              color: Colors.grey[600],
            ),
          ),
          SizedBox(height: 40),

          // ID Upload Card
          GestureDetector(
            onTap: () {
              // Handle ID upload
            },
            child: Container(
              width: double.infinity,
              height: 120,
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.grey[300]!,
                  width: 2,
                  style: BorderStyle.solid,
                ),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.cloud_upload_outlined,
                          size: 32,
                          color: Colors.grey[400],
                        ),
                        SizedBox(height: 8),
                        Text(
                          'Upload ID Document',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
                          'Required for verification',
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.grey[600],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          SizedBox(height: 20),

          // Background Check Agreement
          CheckboxListTile(
            value: _backgroundCheck,
            onChanged: (value) {
              setState(() {
                _backgroundCheck = value!;
              });
            },
            title: Text(
              'I consent to a background check',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
            ),
            subtitle: Text(
              'This helps customers feel safe hiring you',
              style: TextStyle(fontSize: 14, color: Colors.grey[600]),
            ),
            controlAffinity: ListTileControlAffinity.leading,
            contentPadding: EdgeInsets.zero,
          ),

          SizedBox(height: 20),

          // Verification Benefits
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Color(0xFFE8F5E8),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(
                      Icons.verified_user,
                      color: Color(0xFF4CAF50),
                      size: 24,
                    ),
                    SizedBox(width: 12),
                    Text(
                      'Verification Benefits',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: Colors.black,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 12),
                _buildBenefitItem('Get more job offers'),
                _buildBenefitItem('Build customer trust'),
                _buildBenefitItem('Higher earning potential'),
                _buildBenefitItem('Priority in search results'),
              ],
            ),
          ),

          SizedBox(height: 40), // Changed from Spacer() to SizedBox

          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () {
                    _pageController.previousPage(
                      duration: Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                    );
                  },
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: Color(0xFF4CAF50)),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(28),
                    ),
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text(
                    'Back',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF4CAF50),
                    ),
                  ),
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: ElevatedButton(
                  onPressed: _backgroundCheck ? () {
                    _pageController.nextPage(
                      duration: Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                    );
                  } : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _backgroundCheck ? Color(0xFF4CAF50) : Colors.grey[400],
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(28),
                    ),
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text(
                    'Continue',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBankingStep() {
    return SingleChildScrollView( // Wrap with SingleChildScrollView
      padding: EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min, // Add this
        children: [
          Text(
            'Bank Account Details',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
          SizedBox(height: 8),
          Text(
            'Add your bank details to receive payments',
            style: TextStyle(
              fontSize: 16,
              color: Colors.grey[600],
            ),
          ),
          SizedBox(height: 40),

          // Bank Account Form
          TextFormField(
            decoration: InputDecoration(
              labelText: 'Account Holder Name',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              prefixIcon: Icon(Icons.person_outline),
            ),
          ),

          SizedBox(height: 16),

          TextFormField(
            keyboardType: TextInputType.number,
            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            decoration: InputDecoration(
              labelText: 'Account Number',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              prefixIcon: Icon(Icons.account_balance),
            ),
          ),

          SizedBox(height: 16),

          DropdownButtonFormField<String>(
            decoration: InputDecoration(
              labelText: 'Bank Name',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              prefixIcon: Icon(Icons.business),
            ),
            items: [
              'ABSA Bank',
              'Standard Bank',
              'First National Bank (FNB)',
              'Nedbank',
              'Capitec Bank',
              'African Bank',
              'Investec',
              'Discovery Bank',
            ].map((bank) => DropdownMenuItem(
              value: bank,
              child: Text(bank),
            )).toList(),
            onChanged: (value) {},
          ),

          SizedBox(height: 16),

          TextFormField(
            decoration: InputDecoration(
              labelText: 'Branch Code',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              prefixIcon: Icon(Icons.numbers),
            ),
          ),

          SizedBox(height: 30),

          // Security Notice
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Color(0xFFE3F2FD),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                Icon(
                  Icons.security,
                  color: Color(0xFF2196F3),
                  size: 24,
                ),
                SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Your banking details are secure',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: Colors.black,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'We use bank-level encryption and never store your full banking details.',
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.grey[700],
                          height: 1.3,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          SizedBox(height: 20),

          // Terms and Conditions
          CheckboxListTile(
            value: _agreeToTerms,
            onChanged: (value) {
              setState(() {
                _agreeToTerms = value!;
              });
            },
            title: RichText(
              text: TextSpan(
                style: TextStyle(fontSize: 14, color: Colors.black),
                children: [
                  TextSpan(text: 'I agree to the '),
                  TextSpan(
                    text: 'Terms of Service',
                    style: TextStyle(
                      color: Color(0xFF4CAF50),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  TextSpan(text: ' and '),
                  TextSpan(
                    text: 'Privacy Policy',
                    style: TextStyle(
                      color: Color(0xFF4CAF50),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
            controlAffinity: ListTileControlAffinity.leading,
            contentPadding: EdgeInsets.zero,
          ),

          SizedBox(height: 40), // Changed from Spacer() to SizedBox

          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () {
                    _pageController.previousPage(
                      duration: Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                    );
                  },
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: Color(0xFF4CAF50)),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(28),
                    ),
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text(
                    'Back',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF4CAF50),
                    ),
                  ),
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: ElevatedButton(
                  onPressed: _agreeToTerms ? () {
                    // Complete registration and navigate to worker dashboard
                    Navigator.pushNamedAndRemoveUntil(
                      context,
                      '/worker-dashboard',
                          (route) => false,
                    );
                  } : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _agreeToTerms ? Color(0xFF4CAF50) : Colors.grey[400],
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(28),
                    ),
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text(
                    'Create Account',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBenefitItem(String text) {
    return Padding(
      padding: EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(
            Icons.check_circle,
            color: Color(0xFF4CAF50),
            size: 16,
          ),
          SizedBox(width: 8),
          Text(
            text,
            style: TextStyle(
              fontSize: 14,
              color: Colors.grey[700],
            ),
          ),
        ],
      ),
    );
  }
}
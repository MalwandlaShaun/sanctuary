import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:sanctuary/core/network/api_client.dart';
import 'package:sanctuary/core/utils/permission_handlers.dart';
import 'package:sanctuary/data/models/customer_register_request.dart';
import 'package:sanctuary/data/repositories/customer_repository.dart';

class CustomerRegistrationScreen extends StatefulWidget {
  @override
  _CustomerRegistrationScreenState createState() => _CustomerRegistrationScreenState();
}

class _CustomerRegistrationScreenState extends State<CustomerRegistrationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  final PageController _pageController = PageController();

  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;
  bool _agreeToTerms = false;
  int _currentStep = 0;

  // Store captured Base64 strings
  String? _profilePictureBase64;
  String? _idBookPictureBase64;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _pageController.dispose();
    super.dispose();
  }

  // Camera capture helper
  Future<String?> _captureImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.camera, maxWidth: 600);
    if (pickedFile != null) {
      final bytes = await File(pickedFile.path).readAsBytes();
      return base64Encode(bytes);
    }
    return null;
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
          'Customer Registration',
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
                      value: (_currentStep + 1) / 3,
                      backgroundColor: Colors.grey[300],
                      valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF2196F3)),
                      minHeight: 4,
                    ),
                  ),
                  SizedBox(width: 12),
                  Text(
                    'Step ${_currentStep + 1} of 3',
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
                controller: _pageController,
                onPageChanged: (index) {
                  setState(() {
                    _currentStep = index;
                  });
                },
                children: [
                  _buildBasicInfoStep(),
                  _buildVerificationStep(),
                  _buildPaymentStep(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBasicInfoStep() {
    return SingleChildScrollView(
      padding: EdgeInsets.all(24.0),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Basic Info & Profile',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black),
            ),
            SizedBox(height: 8),
            Text('Tell us about yourself to get started',
                style: TextStyle(fontSize: 16, color: Colors.grey[600])),
            SizedBox(height: 32),

            // Profile Picture
            Center(
              child: Stack(
                children: [
                  CircleAvatar(
                    radius: 50,
                    backgroundImage: _profilePictureBase64 != null
                        ? MemoryImage(base64Decode(_profilePictureBase64!))
                        : null,
                    backgroundColor: Colors.grey[300],
                    child: _profilePictureBase64 == null
                        ? Icon(Icons.person, size: 50, color: Colors.grey[600])
                        : null,
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: GestureDetector(
                      onTap: () async {
                        bool granted = await requestCameraPermission();
                        if (!granted) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text("Camera permission is required")),
                          );
                          return;
                        }

                        // Permission granted → open camera
                        final pickedFile = await ImagePicker().pickImage(
                          source: ImageSource.camera,
                          maxHeight: 500,
                          maxWidth: 500,
                        );

                        if (pickedFile != null) {
                          // Convert to base64
                          final bytes = await pickedFile.readAsBytes();
                          final base64Image = base64Encode(bytes);

                          // Save it to your CustomerRegisterRequest object
                          setState(() {
                            _profilePictureBase64 = base64Image; // you need a state variable for this
                          });
                        }
                      },
                      child: Container(
                        padding: EdgeInsets.all(8),
                        decoration: BoxDecoration(color: Color(0xFF2196F3), shape: BoxShape.circle),
                        child: Icon(Icons.camera_alt, color: Colors.white, size: 16),
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
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                prefixIcon: Icon(Icons.person_outline),
              ),
              validator: (value) =>
              value == null || value.isEmpty ? 'Please enter your full name' : null,
            ),
            SizedBox(height: 16),

            // Email
            TextFormField(
              controller: _emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                labelText: 'Email Address',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                prefixIcon: Icon(Icons.email_outlined),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) return 'Please enter your email';
                if (!value.contains('@')) return 'Please enter a valid email';
                return null;
              },
            ),
            SizedBox(height: 16),

            // Phone
            TextFormField(
              controller: _phoneController,
              keyboardType: TextInputType.phone,
              inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              decoration: InputDecoration(
                labelText: 'Phone Number',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                prefixIcon: Icon(Icons.phone_outlined),
                prefixText: '+27 ',
              ),
              validator: (value) =>
              value == null || value.isEmpty ? 'Please enter your phone number' : null,
            ),
            SizedBox(height: 16),

            // Password
            TextFormField(
              controller: _passwordController,
              obscureText: _obscurePassword,
              decoration: InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                prefixIcon: Icon(Icons.lock_outline),
                suffixIcon: IconButton(
                  icon: Icon(_obscurePassword ? Icons.visibility : Icons.visibility_off),
                  onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                ),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) return 'Please enter a password';
                if (value.length < 6) return 'Password must be at least 6 characters';
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
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                prefixIcon: Icon(Icons.lock_outline),
                suffixIcon: IconButton(
                  icon: Icon(_obscureConfirmPassword ? Icons.visibility : Icons.visibility_off),
                  onPressed: () => setState(() => _obscureConfirmPassword = !_obscureConfirmPassword),
                ),
              ),
              validator: (value) =>
              value != _passwordController.text ? 'Passwords do not match' : null,
            ),
            SizedBox(height: 40),

            // Continue
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _pageController.nextPage(
                        duration: Duration(milliseconds: 300), curve: Curves.easeInOut);
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF2196F3),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                  elevation: 0,
                ),
                child: Text('Continue',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Colors.white)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildVerificationStep() {
    return SingleChildScrollView(
      padding: EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('ID Verification',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black)),
          SizedBox(height: 8),
          Text('Upload your ID document for verification',
              style: TextStyle(fontSize: 16, color: Colors.grey[600])),
          SizedBox(height: 40),

          GestureDetector(
            onTap: () async {
              final base64 = await _captureImage();
              if (base64 != null) {
                setState(() {
                  _idBookPictureBase64 = base64;
                });
              }
            },
            child: Container(
              width: double.infinity,
              height: 200,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey[300]!, width: 2),
                borderRadius: BorderRadius.circular(12),
              ),
              child: _idBookPictureBase64 == null
                  ? Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.cloud_upload_outlined, size: 48, color: Colors.grey[400]),
                  SizedBox(height: 16),
                  Text('Upload ID Document',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
                  SizedBox(height: 8),
                  Text('Tap to take a photo',
                      style: TextStyle(fontSize: 14, color: Colors.grey[600])),
                ],
              )
                  : Image.memory(base64Decode(_idBookPictureBase64!), fit: BoxFit.cover),
            ),
          ),
          SizedBox(height: 20),

          // Continue/Back
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () {
                    _pageController.previousPage(
                        duration: Duration(milliseconds: 300), curve: Curves.easeInOut);
                  },
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: Color(0xFF2196F3)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text('Back',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Color(0xFF2196F3))),
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: ElevatedButton(
                  onPressed: () {
                    _pageController.nextPage(
                        duration: Duration(milliseconds: 300), curve: Curves.easeInOut);
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFF2196F3),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text('Continue',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Colors.white)),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPaymentStep() {
    return SingleChildScrollView(
      padding: EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Add Payment Method',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black)),
          SizedBox(height: 8),
          Text('Add a payment method to hire workers',
              style: TextStyle(fontSize: 16, color: Colors.grey[600])),
          SizedBox(height: 40),

          // (skipping actual payment methods UI for brevity…)

          SizedBox(height: 30),

          CheckboxListTile(
            value: _agreeToTerms,
            onChanged: (value) => setState(() => _agreeToTerms = value!),
            title: Text("I agree to Terms and Privacy Policy"),
            controlAffinity: ListTileControlAffinity.leading,
            contentPadding: EdgeInsets.zero,
          ),
          SizedBox(height: 40),

          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () {
                    _pageController.previousPage(
                        duration: Duration(milliseconds: 300), curve: Curves.easeInOut);
                  },
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: Color(0xFF2196F3)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text('Back',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Color(0xFF2196F3))),
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: ElevatedButton(
                  onPressed: _agreeToTerms
                      ? () async {
                    final repo = CustomerRepository(ApiClient());
                    final request = CustomerRegisterRequest(
                      fullName: _nameController.text,
                      email: _emailController.text,
                      password: _passwordController.text,
                      mobileNo: _phoneController.text,
                      country: 'SOUTH_AFRICA',
                      role: 'CUSTOMER',
                      profilePictureBase64: _profilePictureBase64 ?? '',
                      idBookPictureBase64: _idBookPictureBase64 ?? '',
                    );

                    try {
                      final response = await repo.registerCustomer(request);
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(response.message)));
                      Navigator.pushNamedAndRemoveUntil(context, '/login', (route) => false);
                    } catch (e) {
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Registration failed: $e")));
                    }
                  }
                      : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _agreeToTerms ? Color(0xFF2196F3) : Colors.grey[400],
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text('Create Account',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Colors.white)),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

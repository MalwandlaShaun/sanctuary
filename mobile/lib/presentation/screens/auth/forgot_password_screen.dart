import 'package:flutter/material.dart';

class ForgotPasswordScreen extends StatefulWidget {
  @override
  _ForgotPasswordScreenState createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();

  bool _isLoading = false;
  bool _emailSent = false;

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _sendResetLink() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      // Simulate sending reset email
      await Future.delayed(Duration(seconds: 2));

      setState(() {
        _isLoading = false;
        _emailSent = true;
      });
    }
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
          'Forgot Password',
          style: TextStyle(
            color: Colors.black,
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: false,
      ),
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(24.0),
          child: _emailSent ? _buildEmailSentView() : _buildForgotPasswordForm(),
        ),
      ),
    );
  }

  Widget _buildForgotPasswordForm() {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(height: 20),

          // Icon and Title
          Center(
            child: Column(
              children: [
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: Color(0xFF6366F1).withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.lock_reset,
                    size: 40,
                    color: Color(0xFF6366F1),
                  ),
                ),
                SizedBox(height: 24),
                Text(
                  'Reset Password',
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
                SizedBox(height: 12),
                Text(
                  'Enter your email address and we\'ll send you a link to reset your password.',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey[600],
                    height: 1.4,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),

          SizedBox(height: 40),

          // Email Field
          TextFormField(
            controller: _emailController,
            keyboardType: TextInputType.emailAddress,
            decoration: InputDecoration(
              labelText: 'Email Address',
              hintText: 'Enter your registered email',
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

          SizedBox(height: 32),

          // Send Reset Link Button
          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: _isLoading ? null : _sendResetLink,
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF6366F1),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(28),
                ),
                elevation: 0,
              ),
              child: _isLoading
                  ? SizedBox(
                width: 24,
                height: 24,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                ),
              )
                  : Text(
                'Send Reset Link',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                ),
              ),
            ),
          ),

          SizedBox(height: 24),

          // Back to Login Link
          Center(
            child: GestureDetector(
              onTap: () => Navigator.pop(context),
              child: Text(
                'Back to Sign In',
                style: TextStyle(
                  fontSize: 16,
                  color: Color(0xFF6366F1),
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),

          Spacer(),

          // Support Contact
          Container(
            width: double.infinity,
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.grey[50],
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              children: [
                Icon(
                  Icons.help_outline,
                  color: Colors.grey[600],
                  size: 24,
                ),
                SizedBox(height: 8),
                Text(
                  'Need Help?',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Colors.black,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  'Contact our support team at\nsupport@sanctuary.co.za',
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.grey[600],
                    height: 1.3,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmailSentView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(height: 40),

        // Success Icon
        Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            color: Color(0xFF4CAF50).withOpacity(0.1),
            shape: BoxShape.circle,
          ),
          child: Icon(
            Icons.mark_email_read,
            size: 50,
            color: Color(0xFF4CAF50),
          ),
        ),

        SizedBox(height: 32),

        Text(
          'Email Sent!',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
            color: Colors.black,
          ),
        ),

        SizedBox(height: 16),

        Text(
          'We\'ve sent a password reset link to',
          style: TextStyle(
            fontSize: 16,
            color: Colors.grey[600],
          ),
        ),

        SizedBox(height: 8),

        Text(
          _emailController.text,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: Color(0xFF6366F1),
          ),
        ),

        SizedBox(height: 24),

        Text(
          'Check your email and click on the reset link to create a new password.',
          style: TextStyle(
            fontSize: 16,
            color: Colors.grey[600],
            height: 1.4,
          ),
          textAlign: TextAlign.center,
        ),

        SizedBox(height: 40),

        // Resend Button
        SizedBox(
          width: double.infinity,
          height: 56,
          child: OutlinedButton(
            onPressed: () {
              setState(() {
                _emailSent = false;
              });
            },
            style: OutlinedButton.styleFrom(
              side: BorderSide(color: Color(0xFF6366F1)),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(28),
              ),
            ),
            child: Text(
              'Resend Email',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: Color(0xFF6366F1),
              ),
            ),
          ),
        ),

        SizedBox(height: 24),

        // Back to Login
        Center(
          child: GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Text(
              'Back to Sign In',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[600],
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ),

        Spacer(),

        // Email Instructions
        Container(
          width: double.infinity,
          padding: EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Color(0xFFFFF3E0),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            children: [
              Icon(
                Icons.info_outline,
                color: Color(0xFFFF9800),
                size: 20,
              ),
              SizedBox(height: 8),
              Text(
                'Didn\'t receive the email?',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: Colors.black,
                ),
              ),
              SizedBox(height: 4),
              Text(
                'Check your spam folder or wait a few minutes before requesting another reset.',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey[700],
                  height: 1.3,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
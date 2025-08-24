import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'presentation/screens/welcome_screen.dart';
import 'presentation/screens/registration_screen.dart';
import 'presentation/screens/customer_registration_screen.dart';
import 'presentation/screens/worker_registration_screen.dart';
import 'presentation/screens/login_screen.dart';
import 'presentation/screens/customer_login_screen.dart';
import 'presentation/screens/worker_login_screen.dart';
import 'presentation/screens/quick_login_screen.dart';
import 'presentation/screens/forgot_password_screen.dart';
import 'presentation/screens/customer_dashboard.dart';
import 'presentation/screens/worker_dashboard.dart';
import 'presentation/screens/post_job_screen.dart';
import 'presentation/screens/browse_workers_screen.dart';
import 'presentation/screens/worker_profile_screen.dart';
import 'presentation/screens/wallet_screen.dart';
import 'presentation/screens/rate_review_screen.dart';

void main() {
  runApp(SanctuaryApp());
}

class SanctuaryApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sanctuary',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.white,
        fontFamily: 'SF Pro Display',
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => WelcomeScreen(),
        '/registration': (context) => RegistrationScreen(),
        '/customer-registration': (context) => CustomerRegistrationScreen(),
        '/worker-registration': (context) => WorkerRegistrationScreen(),
        '/login': (context) => LoginScreen(),
        '/customer-login': (context) => CustomerLoginScreen(),
        '/worker-login': (context) => WorkerLoginScreen(),
        '/quick-login': (context) => QuickLoginScreen(),
        '/forgot-password': (context) => ForgotPasswordScreen(),
        '/customer-dashboard': (context) => CustomerDashboard(),
        '/worker-dashboard': (context) => WorkerDashboard(),
        '/post-job': (context) => PostJobScreen(),
        '/browse-workers': (context) => BrowseWorkersScreen(),
        '/worker-profile': (context) => WorkerProfileScreen(),
        '/wallet': (context) => WalletScreen(),
        '/rate-review': (context) => RateReviewScreen(),
      },
    );
  }
}
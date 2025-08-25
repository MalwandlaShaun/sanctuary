import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'presentation/screens/shared/welcome_screen.dart';
import 'presentation/screens/auth/registration_screen.dart';
import 'presentation/screens/auth/customer_registration_screen.dart';
import 'presentation/screens/auth/worker_registration_screen.dart';
import 'presentation/screens/auth/login_screen.dart';
import 'presentation/screens/auth/customer_login_screen.dart';
import 'presentation/screens/auth/worker_login_screen.dart';
import 'presentation/screens/auth/quick_login_screen.dart';
import 'presentation/screens/auth/forgot_password_screen.dart';
import 'presentation/screens/customer/customer_dashboard.dart';
import 'presentation/screens/worker/worker_dashboard.dart';
import 'presentation/screens/customer/job/post_job_screen.dart';
import 'presentation/screens/customer/browse_workers_screen.dart';
import 'presentation/screens/worker/worker_profile_screen.dart';
import 'presentation/screens/customer/wallet_screen.dart';
import 'presentation/screens/shared/rate_review_screen.dart';

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
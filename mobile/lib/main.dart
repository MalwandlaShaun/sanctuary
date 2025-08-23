import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'screens/welcome_screen.dart';
import 'screens/registration_screen.dart';
import 'screens/customer_registration_screen.dart';
import 'screens/worker_registration_screen.dart';
import 'screens/customer_dashboard.dart';
import 'screens/worker_dashboard.dart';
import 'screens/post_job_screen.dart';
import 'screens/browse_workers_screen.dart';
import 'screens/worker_profile_screen.dart';
import 'screens/wallet_screen.dart';
import 'screens/rate_review_screen.dart';

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
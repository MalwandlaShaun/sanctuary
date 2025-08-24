class ApiConstants {
  static const String baseUrl = 'https://your-api-domain.com/api/v1';

  // Auth endpoints
  static const String login = '/auth/login';
  static const String register = '/auth/register';
  static const String logout = '/auth/logout';
  static const String refreshToken = '/auth/refresh';

  // User endpoints
  static const String userProfile = '/user/profile';
  static const String updateProfile = '/user/profile';

  // Job endpoints
  static const String jobs = '/jobs';
  static const String createJob = '/jobs/create';
  static const String jobDetails = '/jobs/{id}';
  static const String userJobs = '/jobs/user';

  // Worker endpoints
  static const String workers = '/workers';
  static const String workerProfile = '/workers/{id}';
  static const String hireWorker = '/workers/{id}/hire';

  // Transaction endpoints
  static const String transactions = '/transactions';
  static const String createTransaction = '/transactions/create';

  // Notification endpoints
  static const String notifications = '/notifications';
  static const String markAsRead = '/notifications/{id}/read';
}
import 'package:dio/dio.dart';

void handleApiError(DioException error) {
  // Network errors
  if (error.type == DioExceptionType.connectionTimeout ||
      error.type == DioExceptionType.receiveTimeout ||
      error.type == DioExceptionType.sendTimeout) {
    print("Request timed out. Please try again.");
    return;
  }

  if (error.type == DioExceptionType.unknown) {
    print("Network error or server not reachable.");
    return;
  }

  // Response errors
  if (error.response != null) {
    switch (error.response?.statusCode) {
      case 400:
        print("Bad request: ${error.response?.data}");
        break;
      case 401:
        print("Unauthorized. Redirect to login.");
        // Optionally trigger logout or token refresh here
        break;
      case 403:
        print("Forbidden: ${error.response?.data}");
        break;
      case 404:
        print("Not found: ${error.response?.data}");
        break;
      case 500:
        print("Internal server error. Try again later.");
        break;
      default:
        print(
            "Received invalid status code: ${error.response?.statusCode} | ${error.response?.data}");
    }
  } else {
    // Unknown error
    print("Unexpected error: ${error.message}");
  }
}
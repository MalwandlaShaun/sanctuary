import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import 'package:sanctuary/core/utils/token_storage.dart';
import 'package:sanctuary/core/utils/api.dart';
import '../constants/api_constants.dart';

@singleton
class ApiClient {
  late Dio _dio;

  ApiClient() {
    print("base url: ${ApiConstants.baseUrl}");
    _dio = Dio(BaseOptions(
      baseUrl: ApiConstants.baseUrl,
      connectTimeout: Duration(seconds: 30),
      receiveTimeout: Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        // Add auth token
        String? token = await TokenStorage.getStoredToken();
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        handler.next(options);
      },
      onError: (error, handler) {
        // Handle errors globally
        handleApiError(error);
        handler.next(error);
      },
    ));
  }

  Dio get dio => _dio;
}
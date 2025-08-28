import 'package:dio/dio.dart';
import 'package:sanctuary/core/constants/api_constants.dart';
import 'package:sanctuary/core/network/api_client.dart';
import 'package:sanctuary/core/utils/api.dart';
import 'package:sanctuary/data/models/login_request.dart';
import 'package:sanctuary/data/models/login_response.dart';

class AuthRepository {
  final ApiClient apiClient;

  AuthRepository(this.apiClient);

  Future<LoginResponse> login(LoginRequest request) async {
    try {
      final response = await apiClient.dio.post(
        ApiConstants.login,
        data: request.toJson(),
      );

      return LoginResponse.fromJson(response.data);
    } on DioException catch (e) {
      handleApiError(e);
      rethrow;
    }
  }
}
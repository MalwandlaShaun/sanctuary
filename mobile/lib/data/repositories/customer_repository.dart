import 'package:dio/dio.dart';
import 'package:sanctuary/core/constants/api_constants.dart';
import 'package:sanctuary/core/network/api_client.dart';
import 'package:sanctuary/core/utils/api.dart';
import 'package:sanctuary/data/models/customer_register_request.dart';
import 'package:sanctuary/data/models/message_response.dart';

class CustomerRepository {
  final ApiClient apiClient;

  CustomerRepository(this.apiClient);

  Future<MessageResponse> registerCustomer(CustomerRegisterRequest request) async {
    try {
      final response = await apiClient.dio.post(
        ApiConstants.registerCustomer,
        data: request.toJson(),
      );

      print(response.data);
      return MessageResponse.fromJson(response.data);

    } on DioException catch (e) {
      handleApiError(e);
      rethrow;
    }
  }
}
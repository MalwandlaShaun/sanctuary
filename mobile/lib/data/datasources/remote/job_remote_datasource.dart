import 'package:injectable/injectable.dart';
import '../../../core/network/api_client.dart';
import '../../../core/constants/api_constants.dart';
import '../../models/job_model.dart';
import '../../models/api_response_model.dart';

abstract class JobRemoteDataSource {
  Future<List<JobModel>> getJobs({int page = 1, int limit = 10});
  Future<JobModel> createJob(Map<String, dynamic> jobData);
  Future<JobModel> getJobDetails(String jobId);
  Future<List<JobModel>> getUserJobs();
  Future<void> deleteJob(String jobId);
}

@LazySingleton(as: JobRemoteDataSource)
class JobRemoteDataSourceImpl implements JobRemoteDataSource {
  final ApiClient _apiClient;

  JobRemoteDataSourceImpl(this._apiClient);

  @override
  Future<List<JobModel>> getJobs({int page = 1, int limit = 10}) async {
    try {
      final response = await _apiClient.dio.get(
        ApiConstants.jobs,
        queryParameters: {
          'page': page,
          'limit': limit,
        },
      );

      final apiResponse = ApiResponseModel.fromJson(response.data);

      if (apiResponse.success) {
        return (apiResponse.data as List)
            .map((job) => JobModel.fromJson(job))
            .toList();
      } else {
        throw ServerException(apiResponse.message);
      }
    } on DioException catch (e) {
      throw ServerException(e.message ?? 'Network error occurred');
    }
  }

  @override
  Future<JobModel> createJob(Map<String, dynamic> jobData) async {
    try {
      final response = await _apiClient.dio.post(
        ApiConstants.createJob,
        data: jobData,
      );

      final apiResponse = ApiResponseModel.fromJson(response.data);

      if (apiResponse.success) {
        return JobModel.fromJson(apiResponse.data);
      } else {
        throw ServerException(apiResponse.message);
      }
    } on DioException catch (e) {
      throw ServerException(e.message ?? 'Failed to create job');
    }
  }

  @override
  Future<JobModel> getJobDetails(String jobId) async {
    try {
      final response = await _apiClient.dio.get(
        ApiConstants.jobDetails.replaceAll('{id}', jobId),
      );

      final apiResponse = ApiResponseModel.fromJson(response.data);

      if (apiResponse.success) {
        return JobModel.fromJson(apiResponse.data);
      } else {
        throw ServerException(apiResponse.message);
      }
    } on DioException catch (e) {
      throw ServerException(e.message ?? 'Failed to fetch job details');
    }
  }

  @override
  Future<List<JobModel>> getUserJobs() async {
    try {
      final response = await _apiClient.dio.get(ApiConstants.userJobs);

      final apiResponse = ApiResponseModel.fromJson(response.data);

      if (apiResponse.success) {
        return (apiResponse.data as List)
            .map((job) => JobModel.fromJson(job))
            .toList();
      } else {
        throw ServerException(apiResponse.message);
      }
    } on DioException catch (e) {
      throw ServerException(e.message ?? 'Failed to fetch user jobs');
    }
  }

  @override
  Future<void> deleteJob(String jobId) async {
    try {
      final response = await _apiClient.dio.delete(
        ApiConstants.jobDetails.replaceAll('{id}', jobId),
      );

      final apiResponse = ApiResponseModel.fromJson(response.data);

      if (!apiResponse.success) {
        throw ServerException(apiResponse.message);
      }
    } on DioException catch (e) {
      throw ServerException(e.message ?? 'Failed to delete job');
    }
  }
}
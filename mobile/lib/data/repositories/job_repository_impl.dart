import 'package:injectable/injectable.dart';
import '../../domain/entities/job.dart';
import '../../domain/repositories/job_repository.dart';
import '../datasources/remote/job_remote_datasource.dart';
import '../models/job_model.dart';
import '../../core/errors/exceptions.dart';
import '../../core/errors/failures.dart';

@LazySingleton(as: JobRepository)
class JobRepositoryImpl implements JobRepository {
  final JobRemoteDataSource _remoteDataSource;

  JobRepositoryImpl(this._remoteDataSource);

  @override
  Future<Either<Failure, List<Job>>> getJobs({int page = 1, int limit = 10}) async {
    try {
      final jobs = await _remoteDataSource.getJobs(page: page, limit: limit);
      return Right(jobs.map((model) => model.toEntity()).toList());
    } on ServerException catch (e) {
      return Left(ServerFailure(e.message));
    } on NetworkException catch (e) {
      return Left(NetworkFailure(e.message));
    }
  }

  @override
  Future<Either<Failure, Job>> createJob(Map<String, dynamic> jobData) async {
    try {
      final job = await _remoteDataSource.createJob(jobData);
      return Right(job.toEntity());
    } on ServerException catch (e) {
      return Left(ServerFailure(e.message));
    } on NetworkException catch (e) {
      return Left(NetworkFailure(e.message));
    }
  }
}
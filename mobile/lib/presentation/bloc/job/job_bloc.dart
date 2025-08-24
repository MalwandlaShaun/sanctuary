import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import '../../../domain/usecases/job/get_jobs_usecase.dart';
import '../../../domain/usecases/job/create_job_usecase.dart';
import 'job_event.dart';
import 'job_state.dart';

@injectable
class JobBloc extends Bloc<JobEvent, JobState> {
  final GetJobsUseCase _getJobsUseCase;
  final CreateJobUseCase _createJobUseCase;

  JobBloc(this._getJobsUseCase, this._createJobUseCase) : super(JobInitial()) {
    on<LoadJobs>(_onLoadJobs);
    on<CreateJob>(_onCreateJob);
    on<RefreshJobs>(_onRefreshJobs);
  }

  Future<void> _onLoadJobs(LoadJobs event, Emitter<JobState> emit) async {
    emit(JobLoading());

    final result = await _getJobsUseCase(GetJobsParams(
      page: event.page,
      limit: event.limit,
    ));

    result.fold(
          (failure) => emit(JobError(failure.message)),
          (jobs) => emit(JobLoaded(jobs)),
    );
  }

  Future<void> _onCreateJob(CreateJob event, Emitter<JobState> emit) async {
    emit(JobCreating());

    final result = await _createJobUseCase(CreateJobParams(event.jobData));

    result.fold(
          (failure) => emit(JobError(failure.message)),
          (job) {
        emit(JobCreated(job));
        add(LoadJobs()); // Refresh the job list
      },
    );
  }
}
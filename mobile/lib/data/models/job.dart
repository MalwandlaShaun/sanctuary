class Job {
  final String id;
  final String title;
  final String description;
  final String location;
  final double hourlyRate;
  final String duration;
  final String customerName;
  final double customerRating;
  final int customerReviews;
  final DateTime postedAt;
  final JobStatus status;
  final List<String> requiredSkills;

  Job({
    required this.id,
    required this.title,
    required this.description,
    required this.location,
    required this.hourlyRate,
    required this.duration,
    required this.customerName,
    required this.customerRating,
    required this.customerReviews,
    required this.postedAt,
    required this.status,
    required this.requiredSkills,
  });
}

enum JobStatus { available, applied, inProgress, completed }

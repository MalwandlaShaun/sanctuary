class Worker {
  final String id;
  final String name;
  final String profileImage;
  final double rating;
  final int totalReviews;
  final double distanceKm;
  final double hourlyRate;
  final String primaryService;
  final List<String> skills;
  final String bio;
  final bool isVerified;
  final int completedJobs;
  final List<Review> recentReviews;
  final Map<String, bool> availability; // day of week -> available

  Worker({
    required this.id,
    required this.name,
    required this.profileImage,
    required this.rating,
    required this.totalReviews,
    required this.distanceKm,
    required this.hourlyRate,
    required this.primaryService,
    required this.skills,
    required this.bio,
    required this.isVerified,
    required this.completedJobs,
    required this.recentReviews,
    required this.availability,
  });
}

class Review {
  final String customerName;
  final int rating;
  final String comment;
  final DateTime date;

  Review({
    required this.customerName,
    required this.rating,
    required this.comment,
    required this.date,
  });
}

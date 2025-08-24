import '../data/models/job.dart';
import '../data/models/worker.dart';
import '../data/models/transaction.dart';

class DataService {
  static List<Job> getAvailableJobs() {
    return [
      Job(
        id: '1',
        title: 'Garden Maintenance',
        description: 'Looking for help with lawn mowing and garden cleanup. Must have own tools.',
        location: '2.1 km away • Pretoria East',
        hourlyRate: 180.0,
        duration: '~4 hours',
        customerName: 'John D.',
        customerRating: 4.7,
        customerReviews: 24,
        postedAt: DateTime.now().subtract(Duration(hours: 2)),
        status: JobStatus.available,
        requiredSkills: ['Garden Maintenance', 'Lawn Mowing'],
      ),
      Job(
        id: '2',
        title: 'House Cleaning',
        description: 'Deep cleaning needed for 3-bedroom house. All supplies provided.',
        location: '1.5 km away • Brooklyn, Pretoria',
        hourlyRate: 160.0,
        duration: '~5 hours',
        customerName: 'Mary S.',
        customerRating: 4.9,
        customerReviews: 18,
        postedAt: DateTime.now().subtract(Duration(hours: 5)),
        status: JobStatus.available,
        requiredSkills: ['House Cleaning', 'Deep Cleaning'],
      ),
      Job(
        id: '3',
        title: 'Moving & Packing',
        description: 'Help needed with packing and moving to new apartment. Heavy lifting required.',
        location: '3.2 km away • Hatfield, Pretoria',
        hourlyRate: 200.0,
        duration: '~6 hours',
        customerName: 'Alex K.',
        customerRating: 4.5,
        customerReviews: 12,
        postedAt: DateTime.now().subtract(Duration(hours: 1)),
        status: JobStatus.available,
        requiredSkills: ['Moving', 'Packing', 'Heavy Lifting'],
      ),
    ];
  }

  static List<Worker> getWorkers() {
    return [
      Worker(
        id: '1',
        name: 'Sarah Mitchell',
        profileImage: 'assets/images/sarah.jpg',
        rating: 4.9,
        totalReviews: 127,
        distanceKm: 1.2,
        hourlyRate: 180.0,
        primaryService: 'House Cleaning',
        skills: ['House Cleaning', 'Deep Cleaning', 'Kitchen', 'Bathroom', 'Windows', 'Laundry'],
        bio: 'Professional cleaner with 5+ years experience. I specialize in deep cleaning, regular maintenance, and move-in/move-out cleaning. I bring my own supplies and equipment. Available weekdays and weekends.',
        isVerified: true,
        completedJobs: 156,
        recentReviews: [
          Review(
            customerName: 'John D.',
            rating: 5,
            comment: 'Excellent work! Very thorough and professional.',
            date: DateTime.now().subtract(Duration(days: 2)),
          ),
          Review(
            customerName: 'Mary S.',
            rating: 5,
            comment: 'Sarah did an amazing job. Will definitely book again.',
            date: DateTime.now().subtract(Duration(days: 7)),
          ),
        ],
        availability: {
          'Monday': true,
          'Tuesday': true,
          'Wednesday': true,
          'Thursday': true,
          'Friday': true,
          'Saturday': false,
          'Sunday': false,
        },
      ),
      Worker(
        id: '2',
        name: 'David Molefe',
        profileImage: 'assets/images/david.jpg',
        rating: 4.8,
        totalReviews: 89,
        distanceKm: 2.1,
        hourlyRate: 150.0,
        primaryService: 'Garden Maintenance',
        skills: ['Garden Maintenance', 'Lawn Mowing', 'Hedge Trimming', 'Plant Care'],
        bio: 'Experienced gardener with passion for maintaining beautiful outdoor spaces. I have my own equipment and can work flexible hours.',
        isVerified: true,
        completedJobs: 98,
        recentReviews: [
          Review(
            customerName: 'Lisa T.',
            rating: 5,
            comment: 'David transformed our garden. Highly recommended!',
            date: DateTime.now().subtract(Duration(days: 3)),
          ),
        ],
        availability: {
          'Monday': true,
          'Tuesday': true,
          'Wednesday': true,
          'Thursday': true,
          'Friday': true,
          'Saturday': true,
          'Sunday': false,
        },
      ),
      Worker(
        id: '3',
        name: 'Thandi Nkomo',
        profileImage: 'assets/images/thandi.jpg',
        rating: 4.7,
        totalReviews: 64,
        distanceKm: 3.5,
        hourlyRate: 200.0,
        primaryService: 'Moving & Packing',
        skills: ['Moving', 'Packing', 'Heavy Lifting', 'Furniture Assembly'],
        bio: 'Professional mover with experience in residential and commercial moves. I handle items with care and work efficiently.',
        isVerified: true,
        completedJobs: 72,
        recentReviews: [
          Review(
            customerName: 'Mike R.',
            rating: 4,
            comment: 'Good service, handled everything professionally.',
            date: DateTime.now().subtract(Duration(days: 5)),
          ),
        ],
        availability: {
          'Monday': true,
          'Tuesday': true,
          'Wednesday': false,
          'Thursday': true,
          'Friday': true,
          'Saturday': true,
          'Sunday': true,
        },
      ),
    ];
  }

  static List<Transaction> getTransactions() {
    return [
      Transaction(
        id: '1',
        title: 'Payment from John D.',
        description: 'House cleaning • 3 hours',
        amount: 420.0,
        date: DateTime.now().subtract(Duration(days: 2)),
        type: TransactionType.earning,
        jobId: 'job1',
      ),
      Transaction(
        id: '2',
        title: 'Payment from Mary S.',
        description: 'Garden maintenance • 4 hours',
        amount: 640.0,
        date: DateTime.now().subtract(Duration(days: 5)),
        type: TransactionType.earning,
        jobId: 'job2',
      ),
      Transaction(
        id: '3',
        title: 'Commission Fee',
        description: 'Platform fee (30%)',
        amount: -126.0,
        date: DateTime.now().subtract(Duration(days: 2)),
        type: TransactionType.commission,
      ),
      Transaction(
        id: '4',
        title: 'Payment from Alex K.',
        description: 'Moving assistance • 6 hours',
        amount: 1200.0,
        date: DateTime.now().subtract(Duration(days: 10)),
        type: TransactionType.earning,
        jobId: 'job3',
      ),
    ];
  }
}


class Transaction {
  final String id;
  final String title;
  final String description;
  final double amount;
  final DateTime date;
  final TransactionType type;
  final String? jobId;

  Transaction({
    required this.id,
    required this.title,
    required this.description,
    required this.amount,
    required this.date,
    required this.type,
    this.jobId,
  });
}

enum TransactionType { earning, withdrawal, commission }

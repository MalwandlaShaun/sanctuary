import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class WalletScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Earnings'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(Icons.settings),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              margin: EdgeInsets.all(20),
              padding: EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Color(0xFF6366F1),
                    Color(0xFF8B5CF6),
                  ],
                ),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Total Earned',
                    style: TextStyle(
                      color: Colors.white.withOpacity(0.8),
                      fontSize: 16,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'R1,247.50',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 36,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 16),
                  Row(
                    children: [
                      Text(
                        'This week: R450.00',
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.9),
                          fontSize: 14,
                        ),
                      ),
                      Spacer(),
                      Text(
                        'Commission (30%): R135.00',
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.9),
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Recent Transactions',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 16),
                  _buildTransactionItem(
                    'Payment from John D.',
                    'House cleaning • 3 hours',
                    420.00,
                    '2 days ago',
                  ),
                  _buildTransactionItem(
                    'Payment from John D.',
                    'House cleaning • 3 hours',
                    420.00,
                    '2 days ago',
                  ),
                  _buildTransactionItem(
                    'Payment from John D.',
                    'House cleaning • 3 hours',
                    420.00,
                    '2 days ago',
                  ),
                  _buildTransactionItem(
                    'Payment from John D.',
                    'House cleaning • 3 hours',
                    420.00,
                    '2 days ago',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTransactionItem(String title, String subtitle, double amount, String time) {
    return Container(
      margin: EdgeInsets.only(bottom: 12),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 4,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.green[50],
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.attach_money,
              color: Colors.green,
              size: 20,
            ),
          ),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  subtitle,
                  style: TextStyle(
                    color: Colors.grey[600],
                    fontSize: 14,
                  ),
                ),
                Text(
                  time,
                  style: TextStyle(
                    color: Colors.grey[500],
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
          Text(
            '+R${amount.toStringAsFixed(2)}',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.green,
            ),
          ),
        ],
      ),
    );
  }
}

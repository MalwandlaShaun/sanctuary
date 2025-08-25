import 'package:flutter/material.dart';


// Wallet Screen
class WalletScreen extends StatefulWidget {
  @override
  _WalletScreenState createState() => _WalletScreenState();
}

class _WalletScreenState extends State<WalletScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Wallet'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(Icons.more_vert),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          // Balance Card
          Container(
            margin: EdgeInsets.all(16),
            padding: EdgeInsets.all(24),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [Colors.blue[600]!, Colors.blue[800]!],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Available Balance',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.8),
                    fontSize: 14,
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  'R 1,248.50',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: () {},
                        icon: Icon(Icons.add, size: 16),
                        label: Text('Add Money'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: Colors.blue[600],
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                        ),
                      ),
                    ),
                    SizedBox(width: 12),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: () {},
                        icon: Icon(Icons.send, size: 16),
                        label: Text('Send'),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: Colors.white,
                          side: BorderSide(color: Colors.white),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Quick Stats
          Container(
            margin: EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Expanded(child: _buildStatCard('Spent This Month', 'R 850.00', Icons.trending_up, Colors.red)),
                SizedBox(width: 12),
                Expanded(child: _buildStatCard('Jobs Paid', '8', Icons.work_outline, Colors.green)),
              ],
            ),
          ),

          SizedBox(height: 24),

          // Tabs
          Container(
            margin: EdgeInsets.symmetric(horizontal: 16),
            decoration: BoxDecoration(
              color: Colors.grey[200],
              borderRadius: BorderRadius.circular(25),
            ),
            child: TabBar(
              controller: _tabController,
              indicator: BoxDecoration(
                borderRadius: BorderRadius.circular(25),
                color: Colors.blue,
              ),
              labelColor: Colors.white,
              unselectedLabelColor: Colors.grey[600],
              tabs: [
                Tab(text: 'Recent Transactions'),
                Tab(text: 'Payment Methods'),
              ],
            ),
          ),

          SizedBox(height: 16),

          // Tab Views
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildTransactionsTab(),
                _buildPaymentMethodsTab(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatCard(String title, String value, IconData icon, Color color) {
    return Container(
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 24),
          SizedBox(height: 8),
          Text(
            value,
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            title,
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey[600],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTransactionsTab() {
    final transactions = [
      {'title': 'House Cleaning - Sarah M.', 'amount': '-R150.00', 'date': 'Today, 2:30 PM', 'type': 'payment'},
      {'title': 'Wallet Top-up', 'amount': '+R500.00', 'date': 'Yesterday, 10:15 AM', 'type': 'topup'},
      {'title': 'Garden Service - Mike D.', 'amount': '-R200.00', 'date': 'Mar 15, 3:45 PM', 'type': 'payment'},
      {'title': 'Refund - Cancelled Job', 'amount': '+R75.00', 'date': 'Mar 14, 11:20 AM', 'type': 'refund'},
      {'title': 'Security Service - John W.', 'amount': '-R300.00', 'date': 'Mar 12, 6:00 PM', 'type': 'payment'},
    ];

    return ListView.builder(
      padding: EdgeInsets.symmetric(horizontal: 16),
      itemCount: transactions.length,
      itemBuilder: (context, index) {
        final transaction = transactions[index];
        IconData icon;
        Color iconColor;

        switch (transaction['type']) {
          case 'payment':
            icon = Icons.payment;
            iconColor = Colors.red;
            break;
          case 'topup':
            icon = Icons.add_circle;
            iconColor = Colors.green;
            break;
          case 'refund':
            icon = Icons.refresh;
            iconColor = Colors.blue;
            break;
          default:
            icon = Icons.account_balance_wallet;
            iconColor = Colors.grey;
        }

        return Container(
          margin: EdgeInsets.only(bottom: 8),
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
                  color: iconColor.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: iconColor, size: 20),
              ),
              SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      transaction['title'] as String,
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                    Text(
                      transaction['date'] as String,
                      style: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
              Text(
                transaction['amount'] as String,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: (transaction['amount'] as String).startsWith('+') ? Colors.green : Colors.red,
                  fontSize: 14,
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildPaymentMethodsTab() {
    return ListView(
      padding: EdgeInsets.symmetric(horizontal: 16),
      children: [
        _buildPaymentMethodCard('Credit Card', '**** **** **** 1234', Icons.credit_card, Colors.blue, true),
        _buildPaymentMethodCard('Bank Account', 'FNB - ****7890', Icons.account_balance, Colors.green, false),
        _buildPaymentMethodCard('MTN Mobile Money', '+27 *** *** 456', Icons.phone_android, Colors.orange, false),
        SizedBox(height: 16),
        OutlinedButton.icon(
          onPressed: () {},
          icon: Icon(Icons.add),
          label: Text('Add Payment Method'),
          style: OutlinedButton.styleFrom(
            padding: EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildPaymentMethodCard(String title, String subtitle, IconData icon, Color color, bool isDefault) {
    return Container(
      margin: EdgeInsets.only(bottom: 12),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: isDefault ? Border.all(color: Colors.blue, width: 2) : null,
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
            padding: EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: color, size: 24),
          ),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      title,
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 16,
                      ),
                    ),
                    if (isDefault)
                      Container(
                        margin: EdgeInsets.only(left: 8),
                        padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: Colors.blue,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          'Default',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                  ],
                ),
                Text(
                  subtitle,
                  style: TextStyle(
                    color: Colors.grey[600],
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
          IconButton(
            onPressed: () {},
            icon: Icon(Icons.more_vert, color: Colors.grey[400]),
          ),
        ],
      ),
    );
  }
}

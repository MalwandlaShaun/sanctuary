package com.sanctuary.dto.payment;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionStatsDto {

    double totalRevenue;

    double processedPayments;

    double pendingPayouts;

    double failedTransactions;
}

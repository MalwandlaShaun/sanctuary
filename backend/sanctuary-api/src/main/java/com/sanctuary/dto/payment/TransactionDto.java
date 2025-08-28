package com.sanctuary.dto.payment;


import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDto {

    String transactionId;

    String type;

    double amount;

    double commission;

    String userName;

    String status;

    LocalDate date;

}

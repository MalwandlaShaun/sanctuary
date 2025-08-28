package com.sanctuary.model.transaction;

import com.sanctuary.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document("transactions")
public class Transaction extends BaseEntity {

    String transactionId;

    TransactionType type;

    double amount;

    double commission;

    String userName;

    TransactionStatus status;

}

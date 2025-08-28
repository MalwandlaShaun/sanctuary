package com.sanctuary.model.transaction;

import lombok.Getter;

@Getter
public enum TransactionType {
    JOB_PAYMENT("Job Payment");

    private final String description;

    TransactionType(String description) {
        this.description = description;
    }
}

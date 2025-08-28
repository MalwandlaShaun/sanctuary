package com.sanctuary.exception.throwable;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
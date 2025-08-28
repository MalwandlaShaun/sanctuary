package com.sanctuary.exception.throwable;

public class DuplicateException extends RuntimeException {
    public DuplicateException(String message) {
        super(message);
    }
}
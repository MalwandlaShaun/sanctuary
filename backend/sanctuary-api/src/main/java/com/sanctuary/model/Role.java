package com.sanctuary.model;

public enum Role {
    CUSTOMER,
    WORKER,
    ADMINISTRATOR;


    public static Role fromValue(String role){
        for (Role r : Role.values()) {
            if (r.name().equals(role)) {
                return r;
            }
        }
        return null;
    }
}
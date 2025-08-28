package com.sanctuary.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("customers")
@Getter
@Setter
@AllArgsConstructor
public class Customer extends Client {

}

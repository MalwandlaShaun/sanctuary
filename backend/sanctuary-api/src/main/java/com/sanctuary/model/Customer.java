package com.sanctuary.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("customers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends Client {

}

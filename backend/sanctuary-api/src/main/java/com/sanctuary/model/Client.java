package com.sanctuary.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Client extends BaseEntity {

    @DocumentReference
    User user;

    String profilePictureUrl;

    String idDocumentPictureUrl;
}

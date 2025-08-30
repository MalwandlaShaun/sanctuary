package com.sanctuary.repository;

import com.sanctuary.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {

    Optional<User> findByEmail(String email);

    boolean existsByMobileNo(String mobileNo);

    boolean existsByEmail(String email);

    boolean existsByIdentityNo(String identityNo);

    boolean existsByPassportNo(String passportNo);

}
package com.sanctuary.repository;

import com.sanctuary.model.Worker;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkerRepository extends MongoRepository<Worker, ObjectId> {
}

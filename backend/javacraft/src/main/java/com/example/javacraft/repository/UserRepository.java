package com.example.javacraft.repository;

import com.example.javacraft.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {}

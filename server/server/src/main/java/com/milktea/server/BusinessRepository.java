package com.milktea.server;

import org.springframework.data.repository.CrudRepository;

public interface BusinessRepository extends CrudRepository<Business, String> {
    
    Business findByNameAndLocation(String name, String location);
}

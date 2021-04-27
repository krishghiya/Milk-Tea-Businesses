package com.milktea.server;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface BusinessRepository extends CrudRepository<Business, String> {
    
    List<Business> findByName(String name);
    List<Business> findByAddressContaining(String address);
    List<Business> findByNameContainingAndAddressContaining(String name, String address);
    
    @Query("SELECT b FROM Business b, BusinessHits h WHERE b.id=h.id")
    List<Business> findByHits();    
}

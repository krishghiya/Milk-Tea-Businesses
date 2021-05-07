package com.milktea.server;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface BusinessRepository extends CrudRepository<Business, String> {
    
    List<Business> findByName(String name);
    List<Business> findByAddressContaining(String address);
    List<Business> findByNameContainingAndAddressContaining(String name, String address);
    
    @Transactional
    @Modifying
    @Query("UPDATE BusinessHits SET hits=hits+1 WHERE id=?1")
    Integer incrementHits(String id);

    @Query("SELECT b FROM Business b, BusinessHits h WHERE b.id=h.id ORDER BY h.hits DESC")
    List<Business> findByHits();    
}

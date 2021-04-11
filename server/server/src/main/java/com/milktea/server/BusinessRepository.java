package com.milktea.server;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface BusinessRepository extends CrudRepository<Business, String> {
    
    List<Business> findByNameLikeAndAddressLike(String name, String address);
}

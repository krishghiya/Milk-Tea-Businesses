package com.milktea.server;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface BusinessRepository extends CrudRepository<Business, String> {
    
    List<Business> findByName(String name);
    List<Business> findByAddressLike(String address);
    List<Business> findByNameLikeAndAddressLike(String name, String address);
    @Query("SELECT b.id, b.name, b.image_url, b.rating, b.review_count, b.display_phone, b.address"
            +" FROM Businesses b JOIN BusinessHits h ON b.id == h.id")
    List<Business> findByHits();
}

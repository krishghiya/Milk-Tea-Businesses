package com.milktea.server;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
public class Business {
        
    @Id private String id;
    private String name;
    private String image_url;
    private int rating;
    private int review_count;
    private String display_phone;
    private String address;

}

package com.milktea.server;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.RequiredArgsConstructor;


@Entity
@Table(name="Businesses")
@Data
@RequiredArgsConstructor
public class Business {
        
    @Id private String id;
    @Column String name;
    @Column private String image_url;
    @Column private int rating;
    @Column private int review_count;
    @Column private String display_phone;
    @Column private String address;

}

package com.milktea.server;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "BusinessHits")
@Data
@RequiredArgsConstructor
public class BusinessHits {
        
    @Id private String id;
    @Column String name;
    @Column private int hits;

}

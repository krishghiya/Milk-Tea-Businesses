package com.milktea.server;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;

@CrossOrigin
@RestController
public class SearchController {
    
    @Autowired
    private BusinessRepository repo;

    @GetMapping("/search")
    public List<Business> getBusinesses(@RequestParam(defaultValue = "") String name, 
                                        @RequestParam(defaultValue = "") String location) {
        List<Business> businesses;
        if(name.equals("")) {
            businesses = repo.findByAddressContaining(location);  
        }
        else if(location.equals("")) {
            businesses = repo.findByName(name);
        }
        else{
            businesses = repo.findByNameContainingAndAddressContaining(name, location);
        }
        return businesses;
    }

    @GetMapping("/popular")
    public List<Business> getBusinesses() {
        return repo.findByHits();
    }
}

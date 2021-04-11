package com.milktea.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class SearchController {
    
    @Autowired
    private BusinessRepository repo;

    @GetMapping("/search")
    public Business getBusinesses(@RequestParam String name, @RequestParam String location) {
        
        return new Business();
    }
}

package com.example.backend.controller;

import com.example.backend.entity.StyleArtwork;
import com.example.backend.service.StyleArtworkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/styles")
public class StyleArtworkController {
    private final StyleArtworkService styleArtworkService;

    @GetMapping
    public List<StyleArtwork> getAllStyles() {
        return styleArtworkService.getAllStyles();
    }

}

package com.example.backend.service;

import com.example.backend.entity.StyleArtwork;
import com.example.backend.repository.StyleArtworkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StyleArtworkService {
    private final StyleArtworkRepository styleArtworkRepository;

    public List<StyleArtwork> getAllStyles() {
        return styleArtworkRepository.findAll();
    }
}

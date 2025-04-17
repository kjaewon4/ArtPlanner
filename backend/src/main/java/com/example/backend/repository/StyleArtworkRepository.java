package com.example.backend.repository;

import com.example.backend.entity.StyleArtwork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StyleArtworkRepository extends JpaRepository<StyleArtwork, Long> {
}

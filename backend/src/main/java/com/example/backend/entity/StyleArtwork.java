package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "style_artworks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StyleArtwork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "name_ko")
    private String nameKo;

    private String author;

    @Column(name = "file_name")
    private String fileName;

    private String description;

    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;
}

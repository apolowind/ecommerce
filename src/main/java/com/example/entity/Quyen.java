package com.example.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "QUYEN")
public class Quyen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maquyen;

    @Column(name = "tenquyen", length = 100)
    private String tenquyen;

    @Column(name = "mota", length = 255)
    private String mota;

    // Getters and Setters
}

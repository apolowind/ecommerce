package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "HANG")
public class Hang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mahang;

    @Column(name = "tenhang", length = 100)
    private String tenhang;

    // Getters and Setters
}

package com.example.spring_boot_api.entity;

import javax.persistence.Embeddable;
import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "HANG")
public class Hang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mahang;

    @Column(name = "tenhang", length = 100)
    private String tenhang;

    // Getters and Setters
}

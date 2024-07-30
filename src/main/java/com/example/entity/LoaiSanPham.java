package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "LOAISANPHAM")
public class LoaiSanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maloaid;

    @Column(name = "tenloaisp", length = 100)
    private String tenloaisp;

    @ManyToOne
    @JoinColumn(name = "mahang")
    private Hang hang;

    // Getters and Setters
}

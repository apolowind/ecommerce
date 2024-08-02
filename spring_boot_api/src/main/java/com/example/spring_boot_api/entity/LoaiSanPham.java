package com.example.spring_boot_api.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "LOAISANPHAM")
public class LoaiSanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maloaisp;

    @Column(name = "tenloaisp", length = 100)
    private String tenloaisp;

    @ManyToOne
    @JoinColumn(name = "mahang")
    private Hang hang;

    // Getters and Setters
}

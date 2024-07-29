package com.example.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "SANPHAM")
public class SanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int masp;

    @Column(name = "tensanpham", length = 100)
    private String tensanpham;

    @Column(name = "mota", length = 255)
    private String mota;

    @Column(name = "thongsokythuat", length = 255)
    private String thongsokythuat;

    @Column(name = "hinhanh", length = 255)
    private String hinhanh;

    @Column(name = "soluongton")
    private int soluongton;

    @Column(name = "giahientai")
    private BigDecimal giahientai;

    @Column(name = "luotmua")
    private int luotmua;

    @Column(name = "trangthai")
    private boolean trangthai;

    @ManyToOne
    @JoinColumn(name = "maloaisp")
    private LoaiSanPham loaisanpham;

    // Getters and Setters
}
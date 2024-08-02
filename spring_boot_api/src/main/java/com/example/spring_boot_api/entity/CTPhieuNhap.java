package com.example.spring_boot_api.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "CT_PHIEUNHAP")
public class CTPhieuNhap {

    @EmbeddedId
    private CTPhieuNhapId id;

    @ManyToOne
    @MapsId("masp")
    @JoinColumn(name = "masp")
    private SanPham sanpham;

    @ManyToOne
    @MapsId("mapn")
    @JoinColumn(name = "mapn")
    private PhieuNhap phieunhap;

    @Column(name = "soluong")
    private int soluong;

    @Column(name = "dongia")
    private BigDecimal dongia;

    // Getters and Setters
}


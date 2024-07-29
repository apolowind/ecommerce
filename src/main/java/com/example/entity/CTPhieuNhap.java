package com.example.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
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

@Embeddable
class CTPhieuNhapId implements Serializable {
    private int masp;
    private int mapn;

    // Getters, Setters, hashCode, equals
}

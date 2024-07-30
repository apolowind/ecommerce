package com.example.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "CT_DONHANG")
public class CTDonHang {

    @EmbeddedId
    private CTDonHangId id;

    @ManyToOne
    @MapsId("masp")
    @JoinColumn(name = "masp")
    private SanPham sanpham;

    @ManyToOne
    @MapsId("madh")
    @JoinColumn(name = "madh")
    private DonHang donhang;

    @Column(name = "soluong")
    private int soluong;

    @Column(name = "dongia")
    private BigDecimal dongia;

    @Column(name = "soluongtra")
    private int soluongtra;

    @ManyToOne
    @JoinColumn(name = "mapt")
    private PhieuTra phieutra;

    // Getters and Setters
}


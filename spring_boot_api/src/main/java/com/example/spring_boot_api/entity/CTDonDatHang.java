package com.example.spring_boot_api.entity;

import javax.persistence.*;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "CT_DONDATHANG")
public class CTDonDatHang {

    @EmbeddedId
    private CTDonDatHangId id;

    @ManyToOne
    @MapsId("masp")
    @JoinColumn(name = "masp")
    private SanPham sanpham;

    @ManyToOne
    @MapsId("maddh")
    @JoinColumn(name = "maddh")
    private DonDatHang dondathang;

    @Column(name = "soluong")
    private int soluong;

    @Column(name = "dongia")
    private BigDecimal dongia;

    // Getters and Setters
}


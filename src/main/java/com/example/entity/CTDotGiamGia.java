package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name = "CT_DOTGIAMGIA")
public class CTDotGiamGia {

    @EmbeddedId
    private CTDotGiamGiaId id;

    @ManyToOne
    @MapsId("masp")
    @JoinColumn(name = "masp")
    private SanPham sanpham;

    @ManyToOne
    @MapsId("madgg")
    @JoinColumn(name = "madgg")
    private DotGiamGia dotgiamgia;

    @Column(name = "phantram")
    private BigDecimal phantram;

    // Getters and Setters
}


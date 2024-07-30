package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "HOADON")
public class HoaDon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sohoadon;

    @Column(name = "ngaytao")
    @Temporal(TemporalType.DATE)
    private Date ngaytao;

    @Column(name = "mst", length = 20)
    private String mst;

    @ManyToOne
    @JoinColumn(name = "madh")
    private DonHang donhang;

    // Getters and Setters
}

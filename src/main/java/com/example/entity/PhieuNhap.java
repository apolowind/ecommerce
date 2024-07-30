package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "PHIEUNHAP")
public class PhieuNhap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mapn;

    @Column(name = "ngaynhap")
    @Temporal(TemporalType.DATE)
    private Date ngaynhap;

    @ManyToOne
    @JoinColumn(name = "manv")
    private NhanVien nhanvien;

    @ManyToOne
    @JoinColumn(name = "maddh")
    private DonDatHang dondathang;

    // Getters and Setters
}

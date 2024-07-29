package com.example.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "DONDATHANG")
public class DonDatHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maddh;

    @Column(name = "ngaydathang")
    @Temporal(TemporalType.DATE)
    private Date ngaydathang;

    @ManyToOne
    @JoinColumn(name = "mancc")
    private NhaCungCap nhacungcap;

    @ManyToOne
    @JoinColumn(name = "manv")
    private NhanVien nhanvien;

    // Getters and Setters
}

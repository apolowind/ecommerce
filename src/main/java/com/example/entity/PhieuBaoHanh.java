package com.example.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "PHIEUBAOHANH")
public class PhieuBaoHanh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sopbh;

    @Column(name = "ngaybatdau")
    @Temporal(TemporalType.DATE)
    private Date ngaybatdau;

    @Column(name = "ngayketthuc")
    @Temporal(TemporalType.DATE)
    private Date ngayketthuc;

    @ManyToOne
    @JoinColumn(name = "masp")
    private SanPham sanpham;

    @ManyToOne
    @JoinColumn(name = "makh")
    private KhachHang khachhang;

    @ManyToOne
    @JoinColumn(name = "manv")
    private NhanVien nhanvien;

    // Getters and Setters
}

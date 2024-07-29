package com.example.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "KHACHHANG")
public class KhachHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int makh;

    @Column(name = "cmnd", length = 12, unique = true)
    private String cmnd;

    @Column(name = "ho", length = 50)
    private String ho;

    @Column(name = "ten", length = 50)
    private String ten;

    @Column(name = "diachi", length = 255)
    private String diachi;

    @Column(name = "ngaysinh")
    @Temporal(TemporalType.DATE)
    private Date ngaysinh;

    @Column(name = "sodienthoai", length = 15)
    private String sodienthoai;

    @Column(name = "email", length = 100)
    private String email;

    @ManyToOne
    @JoinColumn(name = "tendangnhap")
    private TaiKhoan taikhoan;

    // Getters and Setters
}

package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "NHANVIEN")
public class NhanVien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int manv;

    @Column(name = "cmnd", length = 12, unique = true)
    private String cmnd;

    @Column(name = "ho", length = 50)
    private String ho;

    @Column(name = "ten", length = 50)
    private String ten;

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

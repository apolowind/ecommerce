package com.example.spring_boot_api.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
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

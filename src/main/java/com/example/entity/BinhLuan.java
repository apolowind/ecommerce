package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "BINHLUAN")
public class BinhLuan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mabl;

    @Column(name = "diem")
    private int diem;

    @Column(name = "nhanxet", length = 255)
    private String nhanxet;

    @Column(name = "ngaybl")
    @Temporal(TemporalType.DATE)
    private Date ngaybl;

    @ManyToOne
    @JoinColumn(name = "makh")
    private KhachHang khachhang;

    @ManyToOne
    @JoinColumn(name = "masp")
    private SanPham sanpham;

    // Getters and Setters
}

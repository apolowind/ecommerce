package com.example.spring_boot_api.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "DONHANG")
public class DonHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int madh;

    @Column(name = "ngaydat")
    @Temporal(TemporalType.DATE)
    private Date ngaydat;

    @Column(name = "trangthai", length = 50)
    private String trangthai;

    @Column(name = "phivanchuyen")
    private BigDecimal phivanchuyen;

    @Column(name = "sdtnn", length = 15)
    private String sdtnn;

    @Column(name = "ngaynhan")
    @Temporal(TemporalType.DATE)
    private Date ngaynhan;

    @Column(name = "diachi", length = 255)
    private String diachi;

    @Column(name = "tenn", length = 100)
    private String tenn;

    @ManyToOne
    @JoinColumn(name = "makh")
    private KhachHang khachhang;

    @ManyToOne
    @JoinColumn(name = "manv_duyet")
    private NhanVien nhanvienDuyet;

    @ManyToOne
    @JoinColumn(name = "manv_giao")
    private NhanVien nhanvienGiao;

    // Getters and Setters
}

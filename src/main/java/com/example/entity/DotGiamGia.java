package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "DOTGIAMGIA")
public class DotGiamGia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int madgg;

    @Column(name = "ngaybatdau")
    @Temporal(TemporalType.DATE)
    private Date ngaybatdau;

    @Column(name = "ngayketthuc")
    @Temporal(TemporalType.DATE)
    private Date ngayketthuc;

    @Column(name = "mota", length = 255)
    private String mota;

    @ManyToOne
    @JoinColumn(name = "manv")
    private NhanVien nhanvien;

    // Getters and Setters
}

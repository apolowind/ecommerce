package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "PHIEUTRA")
public class PhieuTra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mapt;

    @Column(name = "ngaytra")
    @Temporal(TemporalType.DATE)
    private Date ngaytra;

    @Column(name = "lydo", length = 255)
    private String lydo;

    @ManyToOne
    @JoinColumn(name = "sohoadon")
    private HoaDon hoadon;

    @ManyToOne
    @JoinColumn(name = "manv")
    private NhanVien nhanvien;

    // Getters and Setters
}

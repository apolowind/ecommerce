package com.example.spring_boot_api.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "TAIKHOAN")
@Getter
@Setter
public class TaiKhoan {

    @Id
    @Column(name = "tendangnhap", length = 100)
    private String tendangnhap;

    @Column(name = "matkhau", length = 100)
    private String matkhau;

    @Column(name = "trangthai")
    private boolean trangthai;

    @ManyToOne
    @JoinColumn(name = "maquyen")
    private Quyen quyen;

    // Getters and Setters
}

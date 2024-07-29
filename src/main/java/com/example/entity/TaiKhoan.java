package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "TAIKHOAN")
@Getter
@Setter
public class TaiKhoan {

    @Id
    @Column(name = "tendangnhap", length = 50)
    private String tendangnhap;

    @Column(name = "matkhau", length = 50)
    private String matkhau;

    @Column(name = "trangthai")
    private boolean trangthai;

    @ManyToOne
    @JoinColumn(name = "maquyen")
    private Quyen quyen;

    // Getters and Setters
}

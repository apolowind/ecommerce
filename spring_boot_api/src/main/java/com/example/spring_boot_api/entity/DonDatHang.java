package com.example.spring_boot_api.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "DONDATHANG")
public class DonDatHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maddh;

    @Column(name = "ngaydathang")
    @Temporal(TemporalType.DATE)
    private Date ngaydathang;

    @ManyToOne
    @JoinColumn(name = "mancc")
    private NhaCungCap nhacungcap;

    @ManyToOne
    @JoinColumn(name = "manv")
    private NhanVien nhanvien;

    // Getters and Setters
}

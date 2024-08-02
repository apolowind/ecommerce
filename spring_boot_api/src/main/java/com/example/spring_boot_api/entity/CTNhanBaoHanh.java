package com.example.spring_boot_api.entity;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "CT_NHANBAOHANH")
public class CTNhanBaoHanh {

    @EmbeddedId
    private CTNhanBaoHanhId id;

    @ManyToOne
    @MapsId("sopbh")
    @JoinColumn(name = "sopbh")
    private PhieuBaoHanh phieubaohanh;

    @Column(name = "ngaynhan", insertable = false, updatable = false)
    @Temporal(TemporalType.DATE)
    private Date ngaynhan;

    @ManyToOne
    @JoinColumn(name = "manv_nhan")
    private NhanVien nhanvienNhan;

    @Column(name = "ngaytra")
    @Temporal(TemporalType.DATE)
    private Date ngaytra;

    @Column(name = "trangthaidau", length = 255)
    private String trangthaidau;

    @Column(name = "trangthaisau", length = 255)
    private String trangthaisau;

    @ManyToOne
    @JoinColumn(name = "manv_tra")
    private NhanVien nhanvienTra;

    // Getters and Setters
}

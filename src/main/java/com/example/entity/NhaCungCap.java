package com.example.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "NHACUNGCAP")
public class NhaCungCap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mancc;

    @Column(name = "tenncc", length = 100)
    private String tenncc;

    @Column(name = "diachi", length = 255)
    private String diachi;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "sodienthoai", length = 15)
    private String sodienthoai;

    @Column(name = "mst", length = 20)
    private String mst;

    // Getters and Setters
}

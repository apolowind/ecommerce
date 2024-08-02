package com.example.spring_boot_api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDTO {
    private String tendangnhap;
    private String matkhau;
    private boolean trangthai;
    private int maquyen;
}

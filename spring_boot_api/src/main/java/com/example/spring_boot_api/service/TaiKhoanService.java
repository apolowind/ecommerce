package com.example.spring_boot_api.service;

import com.example.spring_boot_api.dto.LoginDTO;
import com.example.spring_boot_api.dto.RegisterDTO;
import com.example.spring_boot_api.entity.TaiKhoan;

public interface TaiKhoanService {
    TaiKhoan register(RegisterDTO registerDTO);
    TaiKhoan login(LoginDTO loginDTO);
}

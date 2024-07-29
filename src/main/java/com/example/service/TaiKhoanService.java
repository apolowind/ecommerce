package com.example.service;

import com.example.dto.LoginDTO;
import com.example.dto.RegisterDTO;
import com.example.entity.TaiKhoan;

public interface TaiKhoanService {
    TaiKhoan register(RegisterDTO registerDTO);
    TaiKhoan login(LoginDTO loginDTO);
}

package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.dto.LoginDTO;
import com.example.spring_boot_api.dto.RegisterDTO;
import com.example.spring_boot_api.entity.TaiKhoan;
import com.example.spring_boot_api.entity.Quyen;
import com.example.spring_boot_api.repository.TaiKhoanRepository;
import com.example.spring_boot_api.repository.QuyenRepository;
import com.example.spring_boot_api.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TaiKhoanServiceImpl implements TaiKhoanService {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private QuyenRepository quyenRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public TaiKhoan register(RegisterDTO registerDTO) {
        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setTendangnhap(registerDTO.getTendangnhap());
        taiKhoan.setMatkhau(bCryptPasswordEncoder.encode(registerDTO.getMatkhau()));
        taiKhoan.setTrangthai(registerDTO.isTrangthai());
        Quyen quyen = quyenRepository.findById(registerDTO.getMaquyen()).orElseThrow(() -> new RuntimeException("Quyen not found"));
        taiKhoan.setQuyen(quyen);
        return taiKhoanRepository.save(taiKhoan);
    }

    @Override
    public TaiKhoan login(LoginDTO loginDTO) {
        TaiKhoan taiKhoan = taiKhoanRepository.findById(loginDTO.getTendangnhap()).orElseThrow(() -> new RuntimeException("TaiKhoan not found"));
        if (!bCryptPasswordEncoder.matches(loginDTO.getMatkhau(), taiKhoan.getMatkhau())) {
            throw new RuntimeException("Invalid credentials");
        }
        return taiKhoan;
    }
}

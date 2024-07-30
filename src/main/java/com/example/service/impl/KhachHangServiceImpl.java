package com.example.service.impl;

import com.example.entity.KhachHang;
import com.example.repository.KhachHangRepository;
import com.example.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KhachHangServiceImpl implements KhachHangService {

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Override
    public KhachHang save(KhachHang khachHang) {
        return khachHangRepository.save(khachHang);
    }

    @Override
    public KhachHang update(int id, KhachHang khachHang) {
        Optional<KhachHang> existingKhachHang = khachHangRepository.findById(id);
        if (existingKhachHang.isPresent()) {
            KhachHang updatedKhachHang = existingKhachHang.get();
            updatedKhachHang.setCmnd(khachHang.getCmnd());
            updatedKhachHang.setHo(khachHang.getHo());
            updatedKhachHang.setTen(khachHang.getTen());
            updatedKhachHang.setDiachi(khachHang.getDiachi());
            updatedKhachHang.setNgaysinh(khachHang.getNgaysinh());
            updatedKhachHang.setSodienthoai(khachHang.getSodienthoai());
            updatedKhachHang.setEmail(khachHang.getEmail());
            updatedKhachHang.setTaikhoan(khachHang.getTaikhoan());
            return khachHangRepository.save(updatedKhachHang);
        } else {
            return null; // or throw an exception
        }
    }

    @Override
    public void delete(int id) {
        khachHangRepository.deleteById(id);
    }

    @Override
    public KhachHang findById(int id) {
        return khachHangRepository.findById(id).orElse(null);
    }

    @Override
    public List<KhachHang> findAll() {
        return khachHangRepository.findAll();
    }
}

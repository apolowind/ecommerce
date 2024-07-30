package com.example.service.impl;

import com.example.entity.NhanVien;
import com.example.repository.NhanVienRepository;
import com.example.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NhanVienServiceImpl implements NhanVienService {

    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Override
    public NhanVien save(NhanVien nhanVien) {
        return nhanVienRepository.save(nhanVien);
    }

    @Override
    public NhanVien update(int id, NhanVien nhanVien) {
        Optional<NhanVien> existingNhanVien = nhanVienRepository.findById(id);
        if (existingNhanVien.isPresent()) {
            NhanVien updatedNhanVien = existingNhanVien.get();
            updatedNhanVien.setCmnd(nhanVien.getCmnd());
            updatedNhanVien.setHo(nhanVien.getHo());
            updatedNhanVien.setTen(nhanVien.getTen());
            updatedNhanVien.setNgaysinh(nhanVien.getNgaysinh());
            updatedNhanVien.setSodienthoai(nhanVien.getSodienthoai());
            updatedNhanVien.setEmail(nhanVien.getEmail());
            updatedNhanVien.setTaikhoan(nhanVien.getTaikhoan());
            return nhanVienRepository.save(updatedNhanVien);
        } else {
            return null; // or throw an exception
        }
    }

    @Override
    public void delete(int id) {
        nhanVienRepository.deleteById(id);
    }

    @Override
    public NhanVien findById(int id) {
        return nhanVienRepository.findById(id).orElse(null);
    }

    @Override
    public List<NhanVien> findAll() {
        return nhanVienRepository.findAll();
    }

    @Override
    public List<NhanVien> searchByName(String name) {
        return nhanVienRepository.findByHoContainingOrTenContaining(name, name);
    }
}

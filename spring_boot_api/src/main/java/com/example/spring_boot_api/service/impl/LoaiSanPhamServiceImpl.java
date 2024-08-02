package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.LoaiSanPham;
import com.example.spring_boot_api.repository.LoaiSanPhamRepository;
import com.example.spring_boot_api.service.LoaiSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoaiSanPhamServiceImpl implements LoaiSanPhamService {

    @Autowired
    private LoaiSanPhamRepository loaiSanPhamRepository;

    @Override
    public LoaiSanPham save(LoaiSanPham loaiSanPham) {
        return loaiSanPhamRepository.save(loaiSanPham);
    }

    @Override
    public LoaiSanPham update(int id, LoaiSanPham loaiSanPham) {
        Optional<LoaiSanPham> existingLoaiSanPham = loaiSanPhamRepository.findById(id);
        if (existingLoaiSanPham.isPresent()) {
            LoaiSanPham updatedLoaiSanPham = existingLoaiSanPham.get();
            updatedLoaiSanPham.setTenloaisp(loaiSanPham.getTenloaisp());
            updatedLoaiSanPham.setHang(loaiSanPham.getHang());
            return loaiSanPhamRepository.save(updatedLoaiSanPham);
        } else {
            return null; // or throw an exception
        }
    }

    @Override
    public void delete(int id) {
        loaiSanPhamRepository.deleteById(id);
    }

    @Override
    public LoaiSanPham findById(int id) {
        return loaiSanPhamRepository.findById(id).orElse(null);
    }

    @Override
    public List<LoaiSanPham> findAll() {
        return loaiSanPhamRepository.findAll();
    }

    @Override
    public List<LoaiSanPham> searchByName(String name) {
        return loaiSanPhamRepository.findByTenloaispContaining(name);
    }
}

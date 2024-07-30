package com.example.service.impl;

import com.example.entity.PhieuBaoHanh;
import com.example.repository.PhieuBaoHanhRepository;
import com.example.service.PhieuBaoHanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhieuBaoHanhServiceImpl implements PhieuBaoHanhService {

    @Autowired
    private PhieuBaoHanhRepository phieuBaoHanhRepository;

    @Override
    public PhieuBaoHanh save(PhieuBaoHanh phieuBaoHanh) {
        return phieuBaoHanhRepository.save(phieuBaoHanh);
    }

    @Override
    public PhieuBaoHanh update(int id, PhieuBaoHanh phieuBaoHanh) {
        Optional<PhieuBaoHanh> existingPhieuBaoHanh = phieuBaoHanhRepository.findById(id);
        if (existingPhieuBaoHanh.isPresent()) {
            PhieuBaoHanh updatedPhieuBaoHanh = existingPhieuBaoHanh.get();
            updatedPhieuBaoHanh.setNgaybatdau(phieuBaoHanh.getNgaybatdau());
            updatedPhieuBaoHanh.setNgayketthuc(phieuBaoHanh.getNgayketthuc());
            updatedPhieuBaoHanh.setSanpham(phieuBaoHanh.getSanpham());
            updatedPhieuBaoHanh.setKhachhang(phieuBaoHanh.getKhachhang());
            updatedPhieuBaoHanh.setNhanvien(phieuBaoHanh.getNhanvien());
            return phieuBaoHanhRepository.save(updatedPhieuBaoHanh);
        } else {
            return null; // or throw an exception
        }
    }

    @Override
    public void delete(int id) {
        phieuBaoHanhRepository.deleteById(id);
    }

    @Override
    public PhieuBaoHanh findById(int id) {
        return phieuBaoHanhRepository.findById(id).orElse(null);
    }

    @Override
    public List<PhieuBaoHanh> findAll() {
        return phieuBaoHanhRepository.findAll();
    }
}

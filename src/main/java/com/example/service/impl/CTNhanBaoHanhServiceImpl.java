package com.example.service.impl;

import com.example.entity.CTNhanBaoHanh;
import com.example.entity.CTNhanBaoHanhId;
import com.example.repository.CTNhanBaoHanhRepository;
import com.example.service.CTNhanBaoHanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CTNhanBaoHanhServiceImpl implements CTNhanBaoHanhService {

    @Autowired
    private CTNhanBaoHanhRepository ctnhanBaoHanhRepository;

    @Override
    public CTNhanBaoHanh save(CTNhanBaoHanh ctnhanBaoHanh) {
        return ctnhanBaoHanhRepository.save(ctnhanBaoHanh);
    }

    @Override
    public CTNhanBaoHanh update(CTNhanBaoHanhId id, CTNhanBaoHanh ctnhanBaoHanh) {
        Optional<CTNhanBaoHanh> existingCTNhanBaoHanh = ctnhanBaoHanhRepository.findById(id);
        if (existingCTNhanBaoHanh.isPresent()) {
            CTNhanBaoHanh updatedCTNhanBaoHanh = existingCTNhanBaoHanh.get();
            updatedCTNhanBaoHanh.setNgaynhan(ctnhanBaoHanh.getNgaynhan());
            updatedCTNhanBaoHanh.setNhanvienNhan(ctnhanBaoHanh.getNhanvienNhan());
            updatedCTNhanBaoHanh.setNgaytra(ctnhanBaoHanh.getNgaytra());
            updatedCTNhanBaoHanh.setTrangthaidau(ctnhanBaoHanh.getTrangthaidau());
            updatedCTNhanBaoHanh.setTrangthaisau(ctnhanBaoHanh.getTrangthaisau());
            updatedCTNhanBaoHanh.setNhanvienTra(ctnhanBaoHanh.getNhanvienTra());
            return ctnhanBaoHanhRepository.save(updatedCTNhanBaoHanh);
        } else {
            return null; // or throw an exception
        }
    }

    @Override
    public void delete(CTNhanBaoHanhId id) {
        ctnhanBaoHanhRepository.deleteById(id);
    }

    @Override
    public CTNhanBaoHanh findById(CTNhanBaoHanhId id) {
        return ctnhanBaoHanhRepository.findById(id).orElse(null);
    }

    @Override
    public List<CTNhanBaoHanh> findAll() {
        return ctnhanBaoHanhRepository.findAll();
    }
}

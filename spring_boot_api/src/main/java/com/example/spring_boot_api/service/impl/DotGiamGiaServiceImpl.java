package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.DotGiamGia;
import com.example.spring_boot_api.repository.DotGiamGiaRepository;
import com.example.spring_boot_api.service.DotGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DotGiamGiaServiceImpl implements DotGiamGiaService {

    @Autowired
    private DotGiamGiaRepository dotGiamGiaRepository;

    @Override
    public DotGiamGia save(DotGiamGia dotGiamGia) {
        return dotGiamGiaRepository.save(dotGiamGia);
    }

    @Override
    public DotGiamGia update(int id, DotGiamGia dotGiamGia) {
        Optional<DotGiamGia> existingDotGiamGia = dotGiamGiaRepository.findById(id);
        if (existingDotGiamGia.isPresent()) {
            DotGiamGia updatedDotGiamGia = existingDotGiamGia.get();
            updatedDotGiamGia.setNgaybatdau(dotGiamGia.getNgaybatdau());
            updatedDotGiamGia.setNgayketthuc(dotGiamGia.getNgayketthuc());
            updatedDotGiamGia.setMota(dotGiamGia.getMota());
            updatedDotGiamGia.setNhanvien(dotGiamGia.getNhanvien());
            return dotGiamGiaRepository.save(updatedDotGiamGia);
        } else {
            return null; // or throw an exception
        }
    }

    @Override
    public void delete(int id) {
        dotGiamGiaRepository.deleteById(id);
    }

    @Override
    public DotGiamGia findById(int id) {
        return dotGiamGiaRepository.findById(id).orElse(null);
    }

    @Override
    public List<DotGiamGia> findAll() {
        return dotGiamGiaRepository.findAll();
    }
}

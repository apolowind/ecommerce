package com.example.service.impl;

import com.example.entity.CTDotGiamGia;
import com.example.entity.CTDotGiamGiaId;
import com.example.repository.CTDotGiamGiaRepository;
import com.example.service.CTDotGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CTDotGiamGiaServiceImpl implements CTDotGiamGiaService {

    @Autowired
    private CTDotGiamGiaRepository repository;

    @Override
    public CTDotGiamGia save(CTDotGiamGia ctDotGiamGia) {
        return repository.save(ctDotGiamGia);
    }

    @Override
    public Optional<CTDotGiamGia> findById(CTDotGiamGiaId id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(CTDotGiamGiaId id) {
        repository.deleteById(id);
    }

    @Override
    public List<CTDotGiamGia> findAll() {
        return repository.findAll();
    }

    @Override
    public List<CTDotGiamGia> searchBySanpham(int masp) {
        return repository.findBySanphamId(masp);
    }

    @Override
    public List<CTDotGiamGia> searchByDotgiamgia(int madgg) {
        return repository.findByDotgiamgiaId(madgg);
    }
}

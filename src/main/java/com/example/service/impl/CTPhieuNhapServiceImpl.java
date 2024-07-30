package com.example.service.impl;

import com.example.entity.CTPhieuNhap;
import com.example.entity.CTPhieuNhapId;
import com.example.repository.CTPhieuNhapRepository;
import com.example.service.CTPhieuNhapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CTPhieuNhapServiceImpl implements CTPhieuNhapService {

    @Autowired
    private CTPhieuNhapRepository repository;

    @Override
    public CTPhieuNhap save(CTPhieuNhap ctPhieuNhap) {
        return repository.save(ctPhieuNhap);
    }

    @Override
    public Optional<CTPhieuNhap> findById(CTPhieuNhapId id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(CTPhieuNhapId id) {
        repository.deleteById(id);
    }

    @Override
    public List<CTPhieuNhap> findAll() {
        return repository.findAll();
    }
}

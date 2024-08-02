package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.PhieuNhap;
import com.example.spring_boot_api.repository.PhieuNhapRepository;
import com.example.spring_boot_api.service.PhieuNhapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhieuNhapServiceImpl implements PhieuNhapService {

    @Autowired
    private PhieuNhapRepository repository;

    @Override
    public PhieuNhap save(PhieuNhap phieuNhap) {
        return repository.save(phieuNhap);
    }

    @Override
    public Optional<PhieuNhap> findById(int id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    @Override
    public List<PhieuNhap> findAll() {
        return repository.findAll();
    }
}

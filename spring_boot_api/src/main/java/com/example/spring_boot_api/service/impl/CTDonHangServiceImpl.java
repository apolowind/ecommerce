package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.CTDonHang;
import com.example.spring_boot_api.entity.CTDonHangId;
import com.example.spring_boot_api.repository.CTDonHangRepository;
import com.example.spring_boot_api.service.CTDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CTDonHangServiceImpl implements CTDonHangService {

    @Autowired
    private CTDonHangRepository repository;

    @Override
    public CTDonHang save(CTDonHang ctDonHang) {
        return repository.save(ctDonHang);
    }

    @Override
    public Optional<CTDonHang> findById(CTDonHangId id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(CTDonHangId id) {
        repository.deleteById(id);
    }

    @Override
    public List<CTDonHang> findAll() {
        return repository.findAll();
    }
}

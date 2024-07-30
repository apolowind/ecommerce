package com.example.service.impl;

import com.example.entity.CTDonHang;
import com.example.entity.CTDonHangId;
import com.example.repository.CTDonHangRepository;
import com.example.service.CTDonHangService;
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

package com.example.service.impl;

import com.example.entity.CTDonDatHang;
import com.example.entity.CTDonDatHangId;
import com.example.repository.CTDonDatHangRepository;
import com.example.service.CTDonDatHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CTDonDatHangServiceImpl implements CTDonDatHangService {

    @Autowired
    private CTDonDatHangRepository repository;

    @Override
    public CTDonDatHang save(CTDonDatHang ctDonDatHang) {
        return repository.save(ctDonDatHang);
    }

    @Override
    public Optional<CTDonDatHang> findById(CTDonDatHangId id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(CTDonDatHangId id) {
        repository.deleteById(id);
    }

    @Override
    public List<CTDonDatHang> findAll() {
        return repository.findAll();
    }
}

package com.example.service.impl;

import com.example.entity.NhaCungCap;
import com.example.repository.NhaCungCapRepository;
import com.example.service.NhaCungCapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NhaCungCapServiceImpl implements NhaCungCapService {

    @Autowired
    private NhaCungCapRepository nhaCungCapRepository;

    @Override
    public NhaCungCap save(NhaCungCap nhaCungCap) {
        return nhaCungCapRepository.save(nhaCungCap);
    }

    @Override
    public NhaCungCap update(int id, NhaCungCap nhaCungCap) {
        Optional<NhaCungCap> existingNhaCungCap = nhaCungCapRepository.findById(id);
        if (existingNhaCungCap.isPresent()) {
            NhaCungCap updatedNhaCungCap = existingNhaCungCap.get();
            updatedNhaCungCap.setTenncc(nhaCungCap.getTenncc());
            updatedNhaCungCap.setDiachi(nhaCungCap.getDiachi());
            updatedNhaCungCap.setEmail(nhaCungCap.getEmail());
            updatedNhaCungCap.setSodienthoai(nhaCungCap.getSodienthoai());
            updatedNhaCungCap.setMst(nhaCungCap.getMst());
            return nhaCungCapRepository.save(updatedNhaCungCap);
        } else {
            return null; // or throw an exception
        }
    }

    @Override
    public void delete(int id) {
        nhaCungCapRepository.deleteById(id);
    }

    @Override
    public NhaCungCap findById(int id) {
        return nhaCungCapRepository.findById(id).orElse(null);
    }

    @Override
    public List<NhaCungCap> findAll() {
        return nhaCungCapRepository.findAll();
    }

    @Override
    public List<NhaCungCap> searchByName(String name) {
        return nhaCungCapRepository.findByTennccContaining(name);
    }
}

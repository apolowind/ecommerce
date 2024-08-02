package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.PhieuNhap;
import com.example.spring_boot_api.service.PhieuNhapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/phieunhap")
public class PhieuNhapController {

    @Autowired
    private PhieuNhapService service;

    @PostMapping
    public ResponseEntity<PhieuNhap> create(@RequestBody PhieuNhap phieuNhap) {
        PhieuNhap created = service.save(phieuNhap);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<PhieuNhap> update(@RequestBody PhieuNhap phieuNhap) {
        int id = phieuNhap.getMapn();
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        PhieuNhap updated = service.save(phieuNhap);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable int id) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhieuNhap> getById(@PathVariable int id) {
        Optional<PhieuNhap> phieuNhap = service.findById(id);
        return phieuNhap.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<PhieuNhap>> getAll() {
        List<PhieuNhap> phieuNhaps = service.findAll();
        return ResponseEntity.ok(phieuNhaps);
    }
}

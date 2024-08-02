package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.PhieuTra;
import com.example.spring_boot_api.service.PhieuTraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/phieutra")
public class PhieuTraController {

    @Autowired
    private PhieuTraService service;

    @PostMapping
    public ResponseEntity<PhieuTra> create(@RequestBody PhieuTra phieuTra) {
        PhieuTra created = service.save(phieuTra);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<PhieuTra> update(@RequestBody PhieuTra phieuTra) {
        if (!service.findById(phieuTra.getMapt()).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        PhieuTra updated = service.save(phieuTra);
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
    public ResponseEntity<PhieuTra> getById(@PathVariable int id) {
        Optional<PhieuTra> phieuTra = service.findById(id);
        return phieuTra.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<PhieuTra>> getAll() {
        List<PhieuTra> phieuTras = service.findAll();
        return ResponseEntity.ok(phieuTras);
    }
}

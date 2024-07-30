package com.example.controller;

import com.example.entity.CTPhieuNhap;
import com.example.entity.CTPhieuNhapId;
import com.example.service.CTPhieuNhapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ctphieunhap")
public class CTPhieuNhapController {

    @Autowired
    private CTPhieuNhapService service;

    @PostMapping
    public ResponseEntity<CTPhieuNhap> create(@RequestBody CTPhieuNhap ctPhieuNhap) {
        CTPhieuNhap created = service.save(ctPhieuNhap);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<CTPhieuNhap> update(@RequestBody CTPhieuNhap ctPhieuNhap) {
        CTPhieuNhapId id = ctPhieuNhap.getId();
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        CTPhieuNhap updated = service.save(ctPhieuNhap);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteById(@RequestParam int masp, @RequestParam int mapn) {
        CTPhieuNhapId id = new CTPhieuNhapId(masp, mapn);
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{masp}/{mapn}")
    public ResponseEntity<CTPhieuNhap> getById(@PathVariable int masp, @PathVariable int mapn) {
        CTPhieuNhapId id = new CTPhieuNhapId(masp, mapn);
        Optional<CTPhieuNhap> ctPhieuNhap = service.findById(id);
        return ctPhieuNhap.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<CTPhieuNhap>> getAll() {
        List<CTPhieuNhap> ctPhieuNhaps = service.findAll();
        return ResponseEntity.ok(ctPhieuNhaps);
    }
}

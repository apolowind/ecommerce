package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.CTDonHang;
import com.example.spring_boot_api.entity.CTDonHangId;
import com.example.spring_boot_api.service.CTDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ct-donhang")
public class CTDonHangController {

    @Autowired
    private CTDonHangService service;

    @PostMapping
    public ResponseEntity<CTDonHang> create(@RequestBody CTDonHang ctDonHang) {
        CTDonHang created = service.save(ctDonHang);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<CTDonHang> update(@RequestBody CTDonHang ctDonHang) {
        CTDonHangId id = ctDonHang.getId();
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        CTDonHang updated = service.save(ctDonHang);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{masp}/{madh}")
    public ResponseEntity<Void> deleteById(@PathVariable int masp, @PathVariable int madh) {
        CTDonHangId id = new CTDonHangId(masp, madh);
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{masp}/{madh}")
    public ResponseEntity<CTDonHang> getById(@PathVariable int masp, @PathVariable int madh) {
        CTDonHangId id = new CTDonHangId(masp, madh);
        Optional<CTDonHang> ctDonHang = service.findById(id);
        return ctDonHang.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<CTDonHang>> getAll() {
        List<CTDonHang> ctDonHangs = service.findAll();
        return ResponseEntity.ok(ctDonHangs);
    }
}

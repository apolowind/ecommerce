package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.CTDonDatHang;
import com.example.spring_boot_api.entity.CTDonDatHangId;
import com.example.spring_boot_api.service.CTDonDatHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ctdondathang")
public class CTDonDatHangController {

    @Autowired
    private CTDonDatHangService service;

    @PostMapping
    public ResponseEntity<CTDonDatHang> create(@RequestBody CTDonDatHang ctDonDatHang) {
        CTDonDatHang created = service.save(ctDonDatHang);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<CTDonDatHang> update(@RequestBody CTDonDatHang ctDonDatHang) {
        CTDonDatHangId id = ctDonDatHang.getId();
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        CTDonDatHang updated = service.save(ctDonDatHang);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{masp}/{maddh}")
    public ResponseEntity<Void> deleteById(@PathVariable int masp, @PathVariable int maddh) {
        CTDonDatHangId id = new CTDonDatHangId(masp, maddh);
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{masp}/{maddh}")
    public ResponseEntity<CTDonDatHang> getById(@PathVariable int masp, @PathVariable int maddh) {
        CTDonDatHangId id = new CTDonDatHangId(masp, maddh);
        Optional<CTDonDatHang> ctDonDatHang = service.findById(id);
        return ctDonDatHang.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<CTDonDatHang>> getAll() {
        List<CTDonDatHang> ctDonDatHangs = service.findAll();
        return ResponseEntity.ok(ctDonDatHangs);
    }
}

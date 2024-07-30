package com.example.controller;

import com.example.entity.KhachHang;
import com.example.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/khachhang")
public class KhachHangController {

    @Autowired
    private KhachHangService khachHangService;

    @PostMapping
    public ResponseEntity<KhachHang> createKhachHang(@RequestBody KhachHang khachHang) {
        return ResponseEntity.ok(khachHangService.save(khachHang));
    }

    @PutMapping("/{id}")
    public ResponseEntity<KhachHang> updateKhachHang(@PathVariable int id, @RequestBody KhachHang khachHang) {
        KhachHang updatedKhachHang = khachHangService.update(id, khachHang);
        if (updatedKhachHang != null) {
            return ResponseEntity.ok(updatedKhachHang);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKhachHang(@PathVariable int id) {
        khachHangService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<KhachHang> getKhachHangById(@PathVariable int id) {
        KhachHang khachHang = khachHangService.findById(id);
        if (khachHang != null) {
            return ResponseEntity.ok(khachHang);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<KhachHang>> getAllKhachHang() {
        return ResponseEntity.ok(khachHangService.findAll());
    }
}

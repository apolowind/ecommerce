package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.NhanVien;
import com.example.spring_boot_api.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nhanvien")
public class NhanVienController {

    @Autowired
    private NhanVienService nhanVienService;

    @PostMapping
    public ResponseEntity<NhanVien> createNhanVien(@RequestBody NhanVien nhanVien) {
        return ResponseEntity.ok(nhanVienService.save(nhanVien));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NhanVien> updateNhanVien(@PathVariable int id, @RequestBody NhanVien nhanVien) {
        NhanVien updatedNhanVien = nhanVienService.update(id, nhanVien);
        if (updatedNhanVien != null) {
            return ResponseEntity.ok(updatedNhanVien);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNhanVien(@PathVariable int id) {
        nhanVienService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NhanVien> getNhanVienById(@PathVariable int id) {
        NhanVien nhanVien = nhanVienService.findById(id);
        if (nhanVien != null) {
            return ResponseEntity.ok(nhanVien);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<NhanVien>> getAllNhanVien() {
        return ResponseEntity.ok(nhanVienService.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<NhanVien>> searchNhanVienByName(@RequestParam String name) {
        return ResponseEntity.ok(nhanVienService.searchByName(name));
    }
}

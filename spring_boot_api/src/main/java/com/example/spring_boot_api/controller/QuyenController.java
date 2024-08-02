package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.Quyen;
import com.example.spring_boot_api.service.QuyenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quyen")
public class QuyenController {

    @Autowired
    private QuyenService quyenService;

    @PostMapping
    public ResponseEntity<Quyen> createQuyen(@RequestBody Quyen quyen) {
        return ResponseEntity.ok(quyenService.save(quyen));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quyen> updateQuyen(@PathVariable int id, @RequestBody Quyen quyen) {
        Quyen updatedQuyen = quyenService.update(id, quyen);
        if (updatedQuyen != null) {
            return ResponseEntity.ok(updatedQuyen);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuyen(@PathVariable int id) {
        quyenService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quyen> getQuyenById(@PathVariable int id) {
        Quyen quyen = quyenService.findById(id);
        if (quyen != null) {
            return ResponseEntity.ok(quyen);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Quyen>> getAllQuyen() {
        return ResponseEntity.ok(quyenService.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Quyen>> searchQuyenByName(@RequestParam String name) {
        return ResponseEntity.ok(quyenService.searchByName(name));
    }
}

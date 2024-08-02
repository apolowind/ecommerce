package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.PhieuBaoHanh;
import com.example.spring_boot_api.service.PhieuBaoHanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phieubaohanh")
public class PhieuBaoHanhController {

    @Autowired
    private PhieuBaoHanhService phieuBaoHanhService;

    @PostMapping
    public ResponseEntity<PhieuBaoHanh> createPhieuBaoHanh(@RequestBody PhieuBaoHanh phieuBaoHanh) {
        return ResponseEntity.ok(phieuBaoHanhService.save(phieuBaoHanh));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhieuBaoHanh> updatePhieuBaoHanh(@PathVariable int id, @RequestBody PhieuBaoHanh phieuBaoHanh) {
        PhieuBaoHanh updatedPhieuBaoHanh = phieuBaoHanhService.update(id, phieuBaoHanh);
        if (updatedPhieuBaoHanh != null) {
            return ResponseEntity.ok(updatedPhieuBaoHanh);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhieuBaoHanh(@PathVariable int id) {
        phieuBaoHanhService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhieuBaoHanh> getPhieuBaoHanhById(@PathVariable int id) {
        PhieuBaoHanh phieuBaoHanh = phieuBaoHanhService.findById(id);
        if (phieuBaoHanh != null) {
            return ResponseEntity.ok(phieuBaoHanh);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<PhieuBaoHanh>> getAllPhieuBaoHanh() {
        return ResponseEntity.ok(phieuBaoHanhService.findAll());
    }
}

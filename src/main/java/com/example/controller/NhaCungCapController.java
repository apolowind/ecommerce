package com.example.controller;

import com.example.entity.NhaCungCap;
import com.example.service.NhaCungCapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nhacungcap")
public class NhaCungCapController {

    @Autowired
    private NhaCungCapService nhaCungCapService;

    @PostMapping
    public ResponseEntity<NhaCungCap> createNhaCungCap(@RequestBody NhaCungCap nhaCungCap) {
        return ResponseEntity.ok(nhaCungCapService.save(nhaCungCap));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NhaCungCap> updateNhaCungCap(@PathVariable int id, @RequestBody NhaCungCap nhaCungCap) {
        NhaCungCap updatedNhaCungCap = nhaCungCapService.update(id, nhaCungCap);
        if (updatedNhaCungCap != null) {
            return ResponseEntity.ok(updatedNhaCungCap);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNhaCungCap(@PathVariable int id) {
        nhaCungCapService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NhaCungCap> getNhaCungCapById(@PathVariable int id) {
        NhaCungCap nhaCungCap = nhaCungCapService.findById(id);
        if (nhaCungCap != null) {
            return ResponseEntity.ok(nhaCungCap);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<NhaCungCap>> getAllNhaCungCap() {
        return ResponseEntity.ok(nhaCungCapService.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<NhaCungCap>> searchNhaCungCapByName(@RequestParam String name) {
        return ResponseEntity.ok(nhaCungCapService.searchByName(name));
    }
}

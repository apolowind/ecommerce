package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.dto.LoginDTO;
import com.example.spring_boot_api.dto.RegisterDTO;
import com.example.spring_boot_api.entity.TaiKhoan;
import com.example.spring_boot_api.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tai-khoan")
public class TaiKhoanController {

    @Autowired
    private TaiKhoanService taiKhoanService;

    @PostMapping("/register")
    public ResponseEntity<TaiKhoan> register(@RequestBody RegisterDTO registerDTO) {
        TaiKhoan taiKhoan = taiKhoanService.register(registerDTO);
        return ResponseEntity.ok(taiKhoan);
    }

    @PostMapping("/login")
    public ResponseEntity<TaiKhoan> login(@RequestBody LoginDTO loginDTO) {
        TaiKhoan taiKhoan = taiKhoanService.login(loginDTO);
        return ResponseEntity.ok(taiKhoan);
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<TaiKhoan> getProfile(@PathVariable String username) {
        TaiKhoan taiKhoan = taiKhoanService.getProfile(username);
        return ResponseEntity.ok(taiKhoan);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TaiKhoan>> getAllAccounts() {
        List<TaiKhoan> taiKhoans = taiKhoanService.getAllAccounts();
        return ResponseEntity.ok(taiKhoans);
    }
}

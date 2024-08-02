package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.BinhLuan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BinhLuanRepository extends JpaRepository<BinhLuan, Integer> {
    List<BinhLuan> findByKhachhangMakh(int makh);
    List<BinhLuan> findBySanphamMasp(int masp);
}

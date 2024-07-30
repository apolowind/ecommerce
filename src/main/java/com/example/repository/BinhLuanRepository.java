package com.example.repository;

import com.example.entity.BinhLuan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BinhLuanRepository extends JpaRepository<BinhLuan, Integer> {
    List<BinhLuan> findByKhachhangId(int makh);
    List<BinhLuan> findBySanphamId(int masp);
}

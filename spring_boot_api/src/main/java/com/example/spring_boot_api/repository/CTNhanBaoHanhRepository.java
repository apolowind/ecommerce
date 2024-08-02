package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.CTNhanBaoHanh;
import com.example.spring_boot_api.entity.CTNhanBaoHanhId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CTNhanBaoHanhRepository extends JpaRepository<CTNhanBaoHanh, CTNhanBaoHanhId> {
}

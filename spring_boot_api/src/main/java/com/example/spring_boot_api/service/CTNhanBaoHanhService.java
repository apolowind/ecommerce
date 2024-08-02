package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.CTNhanBaoHanh;
import com.example.spring_boot_api.entity.CTNhanBaoHanhId;

import java.util.List;

public interface CTNhanBaoHanhService {
    CTNhanBaoHanh save(CTNhanBaoHanh ctnhanBaoHanh);
    CTNhanBaoHanh update(CTNhanBaoHanhId id, CTNhanBaoHanh ctnhanBaoHanh);
    void delete(CTNhanBaoHanhId id);
    CTNhanBaoHanh findById(CTNhanBaoHanhId id);
    List<CTNhanBaoHanh> findAll();
}

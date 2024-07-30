package com.example.service;

import com.example.entity.CTNhanBaoHanh;
import com.example.entity.CTNhanBaoHanhId;

import java.util.List;

public interface CTNhanBaoHanhService {
    CTNhanBaoHanh save(CTNhanBaoHanh ctnhanBaoHanh);
    CTNhanBaoHanh update(CTNhanBaoHanhId id, CTNhanBaoHanh ctnhanBaoHanh);
    void delete(CTNhanBaoHanhId id);
    CTNhanBaoHanh findById(CTNhanBaoHanhId id);
    List<CTNhanBaoHanh> findAll();
}

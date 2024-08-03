package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.LoaiSanPham;
import com.example.spring_boot_api.entity.SanPham;
import com.example.spring_boot_api.repository.SanPhamRepository;
import com.example.spring_boot_api.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SanPhamServiceImpl implements SanPhamService {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Override
    public SanPham save(SanPham sanPham) {
        return sanPhamRepository.save(sanPham);
    }

    @Override
    public SanPham update(int id, SanPham sanPham) {
        Optional<SanPham> existingSanPham = sanPhamRepository.findById(id);
        if (existingSanPham.isPresent()) {
            SanPham updatedSanPham = existingSanPham.get();
            updatedSanPham.setTensanpham(sanPham.getTensanpham());
            updatedSanPham.setMota(sanPham.getMota());
            updatedSanPham.setThongsokythuat(sanPham.getThongsokythuat());
            updatedSanPham.setHinhanh(sanPham.getHinhanh());
            updatedSanPham.setSoluongton(sanPham.getSoluongton());
            updatedSanPham.setGiahientai(sanPham.getGiahientai());
            updatedSanPham.setLuotmua(sanPham.getLuotmua());
            updatedSanPham.setTrangthai(sanPham.isTrangthai());
            updatedSanPham.setLoaisanpham(sanPham.getLoaisanpham());
            return sanPhamRepository.save(updatedSanPham);
        } else {
            return null; // or throw an exception
        }
    }

    @Override
    public void delete(int id) {
        sanPhamRepository.deleteById(id);
    }

    @Override
    public SanPham findById(int id) {
        return sanPhamRepository.findById(id).orElse(null);
    }

    @Override
    public List<SanPham> findAll() {
        return sanPhamRepository.findAll();
    }

    @Override
    public List<SanPham> searchByName(String name) {
        return sanPhamRepository.findByTensanphamContaining(name);
    }

    @Override
    public List<SanPham> findByLoaiSanPham(LoaiSanPham loaisanpham) {
        return sanPhamRepository.findByLoaisanpham(loaisanpham);
    }
}

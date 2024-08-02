package com.example.spring_boot_api.entity;

import javax.persistence.Embeddable;


import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CTDonHangId implements Serializable {
    private int masp;
    private int madh;

    // Constructor không tham số
    public CTDonHangId() {
    }

    // Constructor có tham số
    public CTDonHangId(int masp, int madh) {
        this.masp = masp;
        this.madh = madh;
    }

    // Getters
    public int getMasp() {
        return masp;
    }

    public void setMasp(int masp) {
        this.masp = masp;
    }

    public int getMadh() {
        return madh;
    }

    public void setMadh(int madh) {
        this.madh = madh;
    }

    // Overriding hashCode và equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CTDonHangId that = (CTDonHangId) o;
        return masp == that.masp && madh == that.madh;
    }

    @Override
    public int hashCode() {
        return Objects.hash(masp, madh);
    }
}

package com.example.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class CTNhanBaoHanhId implements Serializable {
    private int sopbh;
    private Date ngaynhan;

    // Default constructor
    public CTNhanBaoHanhId() {
    }

    // Constructor with parameters
    public CTNhanBaoHanhId(int sopbh, Date ngaynhan) {
        this.sopbh = sopbh;
        this.ngaynhan = ngaynhan;
    }

    // Overriding hashCode and equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CTNhanBaoHanhId that = (CTNhanBaoHanhId) o;
        return sopbh == that.sopbh && Objects.equals(ngaynhan, that.ngaynhan);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sopbh, ngaynhan);
    }
}

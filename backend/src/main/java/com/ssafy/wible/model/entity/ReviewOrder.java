package com.ssafy.wible.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ReviewOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_order_seq")
    private int reviewOrderSeq;

    @Column(name = "wine_seq")
    private int wineSeq;
}

package com.ssafy.wible.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class LikeOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_order_seq")
    private int likeOrderSeq;

    @Column(name = "wine_seq")
    private int wineSeq;
}
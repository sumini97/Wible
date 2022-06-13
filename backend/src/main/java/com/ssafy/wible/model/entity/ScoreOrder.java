package com.ssafy.wible.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ScoreOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "score_order_seq")
    private int scoreOrderSeq;

    @Column(name = "wine_seq")
    private int wineSeq;
}

package com.ssafy.wible.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "review")
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reviewSeq;
	@Column
	private int userSeq;
	@Column
	private int wineSeq;
	@Column
	private String reviewText;
	@Column
	private double reviewScore;
	
	
}

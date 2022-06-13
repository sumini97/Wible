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
@Table(name = "recommend")
public class Recommend {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int recSeq;
	@Column
	private int userSeq;
	@Column
	private int wineSeq1;
	@Column
	private int wineSeq2;
	@Column
	private int wineSeq3;
	@Column
	private int wineSeq4;
	@Column
	private int wineSeq5;
}

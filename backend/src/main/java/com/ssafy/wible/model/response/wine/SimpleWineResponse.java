package com.ssafy.wible.model.response.wine;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SimpleWineResponse {
    private int wineSeq;
    private String kname;
    private String ename;
    private String img_path;
    private int price;
}
package com.ssafy.wible.repository;

import com.ssafy.wible.model.entity.Wine;
import com.ssafy.wible.model.enums.Country;
import com.ssafy.wible.model.enums.Type;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class WineSpecification {

    public static Specification<Wine> likeKeyword(String keyword){
        return (((root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("kname"), "%"+keyword+"%")));
    }

    public static Specification<Wine> equalsType(List<Type> types) {
        return (root, query, criteriaBuilder) -> {
            return root.get("type").in(types);
        };
    }

    public static Specification<Wine> equalsCountry(List<Country> countries){
        return (root, query, criteriaBuilder) -> {
            return root.get("country").in(countries);
        };
    }

    public static Specification<Wine> betweenPrice(int start, int end){
        return (((root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("price"), start, end)));
    }

    public static Specification<Wine> equalsBody(List<Integer> body) {
        return (root, query, criteriaBuilder) -> {
            return root.get("body").in(body);
        };
    }

    public static Specification<Wine> equalsTannin(int tannin){
        return (((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("tannin"), tannin)));
    }

    public static Specification<Wine> equalsAcidity(int acidity){
        return (((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("acidity"), acidity)));
    }

    public static Specification<Wine> equalsSweet(List<Integer> sweet) {
        return (root, query, criteriaBuilder) -> {
            return root.get("sweet").in(sweet);
        };
    }
}

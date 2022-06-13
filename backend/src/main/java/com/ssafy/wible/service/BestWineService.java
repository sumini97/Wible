package com.ssafy.wible.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.EnumSet;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.wible.model.entity.LikeOrder;
import com.ssafy.wible.model.entity.Likes;
import com.ssafy.wible.model.entity.ReviewOrder;
import com.ssafy.wible.model.entity.ScoreOrder;
import com.ssafy.wible.model.entity.Wine;
import com.ssafy.wible.model.enums.Country;
import com.ssafy.wible.model.enums.Type;
import com.ssafy.wible.model.response.wine.SimpleWineResponse;
import com.ssafy.wible.repository.LikeOrderRepository;
import com.ssafy.wible.repository.RecommendRepository;
import com.ssafy.wible.repository.ReviewOrderRepository;
import com.ssafy.wible.repository.ScoreOrderRepository;
import com.ssafy.wible.repository.WineLikeRepository;
import com.ssafy.wible.repository.WineRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BestWineService {
    final private EntityManager em;

    @Autowired
    private WineRepository wineRepository;

    @Autowired
    private LikeOrderRepository likeOrderRepository;

    @Autowired
    private ReviewOrderRepository reviewOrderRepository;

    @Autowired
    private ScoreOrderRepository scoreOrderRepository;

    @Autowired
    private RecommendRepository recommendRepository;

    @Autowired
    private WineLikeRepository likeRepository;

    public void setBestWine() throws Exception {
        likeOrderRepository.deleteAll();
        reviewOrderRepository.deleteAll();
        scoreOrderRepository.deleteAll();

        for(Type t : EnumSet.allOf(Type.class)){
            System.out.println(t);
            List<Wine> wine = wineRepository.findTop5ByTypeEqualsOrderByLikeCntDesc(t);
            for(Wine w:wine){
                System.out.println(w.getKname());
                LikeOrder likeOrder = new LikeOrder();
                likeOrder.setWineSeq(w.getWineSeq());
                likeOrderRepository.save(likeOrder);
            }

            wine = wineRepository.findTop5ByTypeEqualsOrderByReviewCntDesc(t);
            for(Wine w:wine){
                System.out.println(w.getKname());
                ReviewOrder reviewOrder = new ReviewOrder();
                reviewOrder.setWineSeq(w.getWineSeq());
                reviewOrderRepository.save(reviewOrder);
            }

            wine = wineRepository.findTop5ByTypeEqualsOrderByScoreDesc(t);
            for(Wine w:wine){
                System.out.println(w.getKname());
                ScoreOrder scoreOrder = new ScoreOrder();
                scoreOrder.setWineSeq(w.getWineSeq());
                scoreOrderRepository.save(scoreOrder);
            }
        }
    }

    public List<SimpleWineResponse> getBestLikeWine(String type) throws Exception {
        Type t = Type.valueOf(type.toUpperCase());
        Query query = em.createQuery("select w from Wine as w join LikeOrder as l on w.wineSeq = l.wineSeq where w.type = :t order by w.likeCnt desc").setParameter("t", t);
        List queryList = query.getResultList();
        List<SimpleWineResponse> list = new ArrayList<>();

        for(Object o : queryList){
            Wine w = (Wine) o;
            SimpleWineResponse simple = new SimpleWineResponse();
            simple.setWineSeq(w.getWineSeq());
            simple.setKname(w.getKname());
            simple.setEname(w.getEname());
            simple.setImg_path(w.getImgPath());
            simple.setPrice(w.getPrice());
            System.out.println(w.getKname());
            list.add(simple);
        }
        return list;
    }

    public List<SimpleWineResponse> getBestScoreWine(String type) throws Exception {
        Type t = Type.valueOf(type.toUpperCase());
        Query query = em.createQuery("select w from Wine as w join ScoreOrder as s on w.wineSeq = s.wineSeq where w.type = :t order by w.score desc").setParameter("t", t);
        List queryList = query.getResultList();
        List<SimpleWineResponse> list = new ArrayList<>();

        for(Object o : queryList){
            Wine w = (Wine) o;
            SimpleWineResponse simple = new SimpleWineResponse();
            simple.setWineSeq(w.getWineSeq());
            simple.setKname(w.getKname());
            simple.setEname(w.getEname());
            simple.setImg_path(w.getImgPath());
            simple.setPrice(w.getPrice());
            System.out.println(w.getKname());
            list.add(simple);
        }
        return list;
    }

    public List<SimpleWineResponse> getBestReviewWine(String type) throws Exception {
        Type t = Type.valueOf(type.toUpperCase());
        Query query = em.createQuery("select w from Wine as w join ReviewOrder as r on w.wineSeq = r.wineSeq where w.type = :t order by w.reviewCnt desc").setParameter("t", t);
        List queryList = query.getResultList();
        List<SimpleWineResponse> list = new ArrayList<>();

        for(Object o : queryList){
            Wine w = (Wine) o;
            SimpleWineResponse simple = new SimpleWineResponse();
            simple.setWineSeq(w.getWineSeq());
            simple.setKname(w.getKname());
            simple.setEname(w.getEname());
            simple.setImg_path(w.getImgPath());
            simple.setPrice(w.getPrice());
            System.out.println(w.getKname());
            list.add(simple);
        }
        return list;
    }

    public void add() throws Exception {
        Wine wine = new Wine();
        wine.setKname("그랜드 리저브 샤도네이 2014");
        wine.setEname("Grand Reserve Chardonnay 2014");
        wine.setType(Type.WHITE);
        wine.setCountry(Country.UNITED_STATES);
        wine.setWinery("켄달 잭슨");
        wine.setGrapes("100 % 샤도네이");
        //wine.setAlcohol(1);
        wine.setPrice(120000);
        wine.setBody(85);
        //wine.setTannin(53);
        wine.setSweet(35);
        wine.setAcidity(46);
        wine.setLikeCnt(505);
        wine.setReviewCnt(644);
        wine.setScore(3.8);
        wineRepository.save(wine);
    }
    
    public List<SimpleWineResponse> getRecommendWine(String type, int userSeq) {
    	List<SimpleWineResponse> list = new ArrayList<>();
    	Type t = Type.valueOf(type.toUpperCase());
    	List<Likes> likes = likeRepository.findAllByUserSeq(userSeq);
    	Set<Integer> set = new HashSet<>();
    	for (Likes like : likes) {
    		Wine wine = wineRepository.findById(like.getWineSeq()).get();
    		if(!wine.getType().equals(t)) continue;
			set.add(wine.getCluster());
		}
    	
    	Iterator<Integer> iter = set.iterator();
    	while(iter.hasNext()) {
    		List<Wine> wines = wineRepository.findAllByTypeAndCluster(t, iter.next());
    		for (Wine wine : wines) {
    			list.add(wine.toResponse());
    		}
    	}
    	Collections.shuffle(list);
//    	Recommend recommend = recommendRepository.findByUserSeq(userSeq);
//    	list.add(wineRepository.findById(recommend.getWineSeq1()).get().toResponse());
//    	list.add(wineRepository.findById(recommend.getWineSeq2()).get().toResponse());
//    	list.add(wineRepository.findById(recommend.getWineSeq3()).get().toResponse());
//    	list.add(wineRepository.findById(recommend.getWineSeq4()).get().toResponse());
//    	list.add(wineRepository.findById(recommend.getWineSeq5()).get().toResponse());
    	return list.size() >=5 ? list.subList(0, 5) : null;
    }
}
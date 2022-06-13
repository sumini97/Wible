package com.ssafy.wible.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.wible.config.security.JwtTokenProvider;
import com.ssafy.wible.model.entity.Likes;
import com.ssafy.wible.model.entity.Review;
import com.ssafy.wible.model.entity.User;
import com.ssafy.wible.model.entity.Wine;
import com.ssafy.wible.model.request.user.SignupRequest;
import com.ssafy.wible.model.response.user.LikeResponse;
import com.ssafy.wible.model.response.user.ReviewResponse;
import com.ssafy.wible.repository.ReviewRepository;
import com.ssafy.wible.repository.UserRepository;
import com.ssafy.wible.repository.WineLikeRepository;
import com.ssafy.wible.repository.WineRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private WineRepository wineRepository;
	
	@Autowired
	private WineLikeRepository likeRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	public void signup(SignupRequest request){
		request.setPassword(passwordEncoder.encode(request.getPassword()));
		User user = request.toEntity();
		userRepository.save(user);
	}
	
	public boolean emailCheck(String email) {
		return userRepository.existsByEmail(email);
	}

	public boolean nicknameCheck(String nickname) {
		return userRepository.existsByNickname(nickname);
	}

	public boolean phoneCheck(String phone) {
		return userRepository.existsByPhone(phone);
	}
	
	public void deleteUser(String email) {
		//해당 유저 관련 좋아요, 리뷰등도 삭제할지
		User user = userRepository.findByEmail(email);
		userRepository.delete(user);
	}
	
	public String login(String email, String password){
		User member = userRepository.findByEmail(email);
		if(member == null) throw new IllegalArgumentException("가입되지 않은 E-MAIL 입니다.");
        if (!passwordEncoder.matches(password, member.getPassword())) throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        
        return jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
    }
	
	public User getUserInfo(int user_seq) {
		return userRepository.findById(user_seq).get();
	}

	public User getUserInfo(String email) {
		return userRepository.findByEmail(email);
	}
	
	public void modify(int seq, String nickname, String phone) {
		User user = userRepository.findById(seq).get();
		user.setNickname(nickname);
		user.setPhone(phone);
		userRepository.save(user);
	}

	public void modify(int seq, String password) {
		User user = userRepository.findById(seq).get();
		user.setPassword(passwordEncoder.encode(password));
		userRepository.save(user);
	}
	
	public Object getReviewList(int user_seq, Pageable pageRequest){
		Map<String, Object> resultMap = new HashMap<>();
        List<ReviewResponse> list = new ArrayList<>();
        Page<Review> reviews = reviewRepository.findAllByUserSeq(user_seq, pageRequest);
        for (Review review: reviews) {
        	Wine wine = wineRepository.findById(review.getWineSeq()).get();
            list.add(new ReviewResponse(wine.getWineSeq(), review.getReviewSeq(), wine.getKname(), wine.getEname(), wine.getType(), wine.getGrapes(), wine.getReviewCnt(),review.getReviewScore(), wine.getCountry(), wine.getImgPath(), review.getReviewText()));
        }
        resultMap.put("content", list);
        resultMap.put("totalPages", reviews.getTotalPages());
        resultMap.put("pageNumber", reviews.getPageable().getPageNumber());
        resultMap.put("totalElements", reviews.getTotalElements());
        resultMap.put("last", reviews.getTotalPages()-1 == reviews.getPageable().getPageNumber()?true:false);
        resultMap.put("first", 0 == reviews.getPageable().getPageNumber()?true:false);
        return resultMap;
	}
	
	public Object getLikeList(int user_seq, Pageable pageRequest){
		Map<String, Object> resultMap = new HashMap<>();
        List<LikeResponse> list = new ArrayList<>();
        Page<Likes> likes = likeRepository.findAllByUserSeq(user_seq, pageRequest);
        for (Likes like: likes) {
        	Wine wine = wineRepository.findById(like.getWineSeq()).get();
            list.add(new LikeResponse(wine.getWineSeq(), like.getLikeSeq(), wine.getKname(), wine.getEname(), wine.getType(), wine.getLikeCnt(),wine.getScore(), wine.getCountry(), wine.getImgPath()));
        }
        resultMap.put("content", list);
        resultMap.put("totalPages", likes.getTotalPages());
        resultMap.put("pageNumber", likes.getPageable().getPageNumber());
        resultMap.put("totalElements", likes.getTotalElements());
        resultMap.put("last", likes.getTotalPages()-1 == likes.getPageable().getPageNumber()?true:false);
        resultMap.put("first", 0 == likes.getPageable().getPageNumber()?true:false);
        return resultMap;
	}
}

package com.example.prj.service.impl;

import com.example.prj.entity.Post;
import com.example.prj.entity.User;
import com.example.prj.pojo.PostPojo;
import com.example.prj.repository.PostRepository;
import com.example.prj.repository.UserRepository;
import com.example.prj.service.PostService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public void savePost(PostPojo postPojo)  {
        Post post = new Post();

        if (postPojo.getId() != null) {
            post=postRepository.findById(postPojo.getId())
                    .orElseThrow(()->new NoSuchElementException("no"));
        }
        User user = userRepository.findById(postPojo.getUserId()).get();
        post.setUser(user);
        post.setStart(postPojo.getStart());
        post.setAddress(postPojo.getAddress());
        post.setFinish(postPojo.getFinish());
        post.setSalary(postPojo.getSalary());
        post.setDiscription(postPojo.getDiscription());
        post.setNoOfMaids(postPojo.getNoOfMaids());
        postRepository.save(post);
    }


    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public Optional<Post> findById(Integer id) {
        return postRepository.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
        postRepository.deleteById(id);
    }

    @Override
    public List<Post> getByUserId(Integer userid) {
        return postRepository.getByUserId(userid);
    }

}

package com.example.prj.service;

import com.example.prj.entity.Post;
import com.example.prj.pojo.PostPojo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface PostService {
    void savePost(PostPojo postPojo);

    List<Post> findAll();

    Optional<Post> findById(Integer id);

    void deleteById(Integer id);

    List<Post> getByUserId(Integer userid);
}

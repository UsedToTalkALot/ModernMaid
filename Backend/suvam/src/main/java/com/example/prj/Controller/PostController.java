package com.example.prj.Controller;

import com.example.prj.entity.Post;
import com.example.prj.pojo.PostPojo;

import com.example.prj.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequestMapping("/post")
@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping("/save")
    public String saveItem(@RequestBody @Valid PostPojo postPojo) {
        postService.savePost(postPojo);
        return "data created successfully yoh";
    }

    @GetMapping("/getAll")
    public List<Post> findAll(){
        return postService.findAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Post> findById(@PathVariable("id") Integer id){
        return postService.findById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        postService.deleteById(id);
    }

    @GetMapping("/getByUserId/{userid}")
    public List<Post> getByUserId(@PathVariable("userid") Integer userid){
       return postService.getByUserId(userid);
    }




}

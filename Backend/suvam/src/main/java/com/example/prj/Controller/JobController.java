package com.example.prj.Controller;

import com.example.prj.entity.Job;
import com.example.prj.entity.Post;
import com.example.prj.pojo.JobPojo;
import com.example.prj.service.JobService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequestMapping("/job")
@RestController
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @PostMapping("/save")
    public String saveJob(@RequestBody  JobPojo jobPojo) throws IOException {
        jobService.saveJob(jobPojo);
        return "data created successfully yoh";
    }

    @GetMapping("/getAll")
    public List<Job> findAll(){
        return jobService.findAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Job> findById(@PathVariable("id") Integer id){
        return jobService.findById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        jobService.deleteById(id);
    }

    @GetMapping("/findByMaidId/{maidid}")
    public List<Job> findByMaidId(@PathVariable("maidid") Integer maidid){
        return jobService.findByMaidId(maidid);
    }

    @GetMapping("/findByPostId/{postid}")
    public List<Job> findByPostId(@PathVariable("postid") Integer postid){
        return jobService.findByPostId(postid);
    }

    @PostMapping("/acceptOffer/{maid}/{post}")
    public String acceptOffer(@PathVariable Integer maid, @PathVariable Integer post) {
        jobService.acceptOffer(maid, post);
        return "succesful";

    }

    @PostMapping("/rejectOffer/{maid}/{post}")
    public String rejectOffer(@PathVariable Integer maid, @PathVariable Integer post) {
        jobService.rejectOffer(maid, post);
        return "succesful";

    }
}

package com.example.prj.service;

import com.example.prj.entity.Job;
import com.example.prj.pojo.JobPojo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface JobService {
    void saveJob(JobPojo jobPojo) throws IOException;

    List<Job> findAll();
    List<Job> findByMaidId(Integer maidid);
    List<Job> findByPostId(Integer jobid);

    Optional<Job> findById(Integer id);

    void deleteById(Integer id);

    public void acceptOffer(Integer maid, Integer post) ;
    public void rejectOffer(Integer maid, Integer post) ;

}

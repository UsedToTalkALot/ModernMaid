package com.example.prj.service.impl;

import com.example.prj.entity.Job;
import com.example.prj.entity.User;
import com.example.prj.entity.Maid;
import com.example.prj.pojo.JobPojo;
import com.example.prj.repository.JobRepository;
import com.example.prj.repository.MaidRepository;
import com.example.prj.repository.UserRepository;
import com.example.prj.service.JobService;
import com.example.prj.util.ImageToBase64;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final MaidRepository maidRepository;
    @Override
    public void saveJob(JobPojo jobPojo)  {
        Job job=new Job();


        if(jobPojo.getId()!=null){
            job=jobRepository.findById(jobPojo.getId())
                    .orElseThrow(()-> new NoSuchElementException("No data found"));
        }

        job.setUser(jobPojo.getUser());
        job.setMaid(jobPojo.getMaid());
        job.setPost(jobPojo.getPost());
        jobRepository.save(job);

    }



    @Override
    public List<Job> findAll() {
        List<Job> jobs = jobRepository.findAll();

        return jobs;
    }

    @Override
    public List<Job> findByMaidId(Integer id) {
        List<Job> jobs = jobRepository.findByMaidId(id);
        return jobs;
    }

    @Override
    public List<Job> findByPostId(Integer id) {
        List<Job> jobs = jobRepository.findByPostId(id);
        return jobs;
    }

    @Override
    public Optional<Job> findById(Integer id) {
        return jobRepository.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
        jobRepository.deleteById(id);
    }

    @Override
    public void acceptOffer(Integer maid, Integer post) {
        jobRepository.acceptOffer(maid, post);
    }

    @Override
    public void rejectOffer(Integer maid, Integer post) {
        jobRepository.rejectOffer(maid, post);
    }
}

package com.example.prj.service;

import com.example.prj.entity.Maid;
import com.example.prj.pojo.MaidPojo;

import java.util.List;
import java.util.Optional;

public interface MaidService {

    void saveMaid(MaidPojo maidPojo);

    List<Maid> getAllData();

    Optional<Maid> getById(Integer id);

    void deleteById(Integer id);
    void updateReview(Integer num,Integer id);

    Optional<Maid> getMaidByEmail(String email);

}

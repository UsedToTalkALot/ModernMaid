package com.example.prj.service.impl;

import com.example.prj.config.PasswordEncoderUtil;
import com.example.prj.entity.Maid;
import com.example.prj.pojo.MaidPojo;
import com.example.prj.repository.MaidRepository;
import com.example.prj.service.MaidService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MaidServiceImpl implements MaidService {

    private final MaidRepository maidRepository;

    @Override
    public void saveMaid(MaidPojo maidPojo) {

        Maid maid = new Maid();

        if (maidPojo.getId() != null) {
            maid = maidRepository.findById(maidPojo.getId())
                    .orElseThrow(() -> new NoSuchElementException("No data found"));
        }

        maid.setName(maidPojo.getName());
        maid.setEmail(maidPojo.getEmail());
        maid.setPassword(PasswordEncoderUtil.getInstance().encode(maidPojo.getPassword()));
        maid.setPhonenumber(maidPojo.getPhonenumber());
        maid.setCount(maidPojo.getCount());
        maid.setReview(maidPojo.getReview());


        maidRepository.save(maid);
    }

    @Override
    public List<Maid> getAllData() {
        return maidRepository.findAll(); // select * from maid
    }

    @Override
    public Optional<Maid> getById(Integer id) {
        return maidRepository.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
        maidRepository.deleteById(id);
    }


    @Override
    public Optional<Maid> getMaidByEmail(String email) {
        return maidRepository.getMaidByEmail(email);
    }

    @Override
    public void  updateReview(Integer num, Integer id) {
         maidRepository.updateReview(num,id);
        }
    }

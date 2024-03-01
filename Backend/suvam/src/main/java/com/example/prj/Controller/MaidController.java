package com.example.prj.Controller;

import com.example.prj.entity.Maid;
import com.example.prj.pojo.MaidPojo;
import com.example.prj.service.MaidService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/maid")
@RestController
@RequiredArgsConstructor

public class MaidController {

    private final MaidService maidService;

    @PostMapping("/save")
    public String saveMaid(@Valid @RequestBody MaidPojo maidPojo){
        maidService.saveMaid(maidPojo);
        return "data created successfully";
    }

    @GetMapping("/getAll")
    public List<Maid> getAllData(){
        return maidService.getAllData();
    }

    @GetMapping("/getById/{id}")
    public Optional<Maid> getDataBtId(@PathVariable("id") Integer id){
        return maidService.getById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        maidService.deleteById(id);
    }

    @PostMapping("/updateReview/{num}/{id}")
    public String updateReview(@PathVariable Integer num, @PathVariable Integer id) {
           maidService.updateReview(num, id);
           return "succesful";

        }




}

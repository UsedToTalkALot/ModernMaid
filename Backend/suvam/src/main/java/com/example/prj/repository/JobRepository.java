package com.example.prj.repository;

import com.example.prj.entity.Job;
import com.example.prj.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job,Integer> {

    @Query(value = "select * from  job where userid=?1", nativeQuery = true)
    List<Job> getByUserId(Integer userid);

    @Query(value = "select * from  job where maidid=?1", nativeQuery = true)
    List<Job> findByMaidId(Integer maidid);


    @Query(value = "select * from  job where postid=?1", nativeQuery = true)
    List<Job> findByPostId(Integer maidid);

    @Query(value = "UPDATE job SET accepted = true WHERE maidid = ?1 and postid = ?2", nativeQuery = true)
    void acceptOffer(Integer maid, Integer post);

    @Query(value = "UPDATE job SET rejected = true WHERE maidid = ?1 and postid = ?2", nativeQuery = true)
    void rejectOffer(Integer maid, Integer post);


}

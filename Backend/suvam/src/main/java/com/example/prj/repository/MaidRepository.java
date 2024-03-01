package com.example.prj.repository;

import com.example.prj.entity.Maid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MaidRepository extends JpaRepository<Maid,Integer> {
    @Query(value = "select * from maid where email=?1", nativeQuery = true)
    Optional<Maid> getMaidByEmail(String email);

    @Query(value = "UPDATE maid SET review = (review * count + ?1) / (count + 1), count = count + 1 WHERE id = ?2", nativeQuery = true)
    void updateReview(Integer num, Integer id);


}

package com.example.prj.repository;

import com.example.prj.entity.Post;
import com.example.prj.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post,Integer> {


    @Query(value = "select * from post where userid=?1", nativeQuery = true)
    List<Post> getByUserId(Integer userid);


}

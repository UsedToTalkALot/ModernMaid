package com.example.prj;
import com.example.prj.entity.Maid;
import com.example.prj.repository.JobRepository;
import com.example.prj.repository.UserRepository;
import org.assertj.core.api.Assertions;
import com.example.prj.entity.Job;
import com.example.prj.repository.UserRepository;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import org.springframework.test.annotation.Rollback;
import java.util.List;
import java.util.Optional;


@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class JobRepositoryTest {

    @Autowired
    private JobRepository jobRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveItem() {
        Job user = new Job();
        user.setUser(3);
        user.setPost(5);
        user.setMaid(2);
        user.setAccepted(true);
        user.setRejected(false);




        jobRepository.save(user);

        Assertions.assertThat(user.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findById(){
        Job user =jobRepository.findById(1).get();
        Assertions.assertThat(user.getId()).isEqualTo(1);
    }

    @Test
    @Order(3)
    public void findAllData(){
        List<Job> userList= jobRepository.findAll();
        Assertions.assertThat(userList.size()).isGreaterThan(0);
    }


    @Test
    @Order(4)
    public void updateItem(){
        Job user=jobRepository.findById(1).get();
        user.setPost(1);
        jobRepository.save(user);

        Assertions.assertThat(user.getPost()).isEqualTo(1);
    }


    @Test
    @Order(5)
    public void deleteById(){
        jobRepository.deleteById(1);

        Job user1=null;

        Optional<Job> user=jobRepository.findById(1);
        if(user.isPresent()){
            user1=user.get();
        }
        Assertions.assertThat(user1).isNull();
    }
}
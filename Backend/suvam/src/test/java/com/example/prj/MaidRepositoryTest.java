package com.example.prj;
import com.example.prj.entity.Maid;
import com.example.prj.repository.MaidRepository;
import org.assertj.core.api.Assertions;
import com.example.prj.entity.User;
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
public class MaidRepositoryTest {

    @Autowired
    private MaidRepository maidRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveItem() {
        Maid user = new Maid();
        user.setName("Ayush");
        user.setPhonenumber("0123654789");
        user.setEmail("adh@gmail.com");
        user.setPassword("pass");
        user.setCount(10);
        user.setReview(5);



        maidRepository.save(user);

        Assertions.assertThat(user.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findById(){
        Maid user =maidRepository.findById(1).get();
        Assertions.assertThat(user.getId()).isEqualTo(1);
    }

    @Test
    @Order(3)
    public void findAllData(){
        List<Maid> userList= maidRepository.findAll();
        Assertions.assertThat(userList.size()).isGreaterThan(0);
    }


    @Test
    @Order(4)
    public void updateItem(){
        Maid user=maidRepository.findById(1).get();
        user.setPassword("password");
        maidRepository.save(user);

        Assertions.assertThat(user.getPassword()).isEqualTo("password");
    }


    @Test
    @Order(5)
    public void deleteById(){
        maidRepository.deleteById(1);

        Maid user1=null;

        Optional<Maid> user=maidRepository.findById(1);
        if(user.isPresent()){
            user1=user.get();
        }
        Assertions.assertThat(user1).isNull();
    }
}
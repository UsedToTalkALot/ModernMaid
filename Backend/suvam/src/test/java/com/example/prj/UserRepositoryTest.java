package com.example.prj;
import com.example.prj.repository.UserRepository;
import org.assertj.core.api.Assertions;
import com.example.prj.entity.User;
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
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveItem() {
        User user = new User();
        user.setName("Ayush");
        user.setAddress("Koteshowr");
        user.setPhonenumber("0123654789");
        user.setEmail("adh@gmail.com");
        user.setPassword("pass");
        user.setCount(10);
        user.setReview(5);



        userRepository.save(user);

        Assertions.assertThat(user.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findById(){
        User user =userRepository.findById(1).get();
        Assertions.assertThat(user.getId()).isEqualTo(1);
    }

    @Test
    @Order(3)
    public void findAllData(){
        List<User> userList= userRepository.findAll();
        Assertions.assertThat(userList.size()).isGreaterThan(0);
    }


    @Test
    @Order(4)
    public void updateItem(){
        User user=userRepository.findById(1).get();
        user.setPassword("password");
        userRepository.save(user);

        Assertions.assertThat(user.getPassword()).isEqualTo("password");
    }


    @Test
    @Order(5)
    public void deleteById(){
        userRepository.deleteById(1);

        User user1=null;

        Optional<User> user=userRepository.findById(1);
        if(user.isPresent()){
            user1=user.get();
        }
        Assertions.assertThat(user1).isNull();
    }
}
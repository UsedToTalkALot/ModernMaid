package com.example.prj.service.impl;

import com.example.prj.config.PasswordEncoderUtil;
import com.example.prj.entity.User;
import com.example.prj.pojo.UserPojo;
import com.example.prj.repository.UserRepository;
import com.example.prj.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public void saveUser(UserPojo userPojo) {

        User user = new User();

        if(userPojo.getId()!=null){
            user=userRepository.findById(userPojo.getId())
                    .orElseThrow(()-> new NoSuchElementException("No data found"));
        }

        user.setName(userPojo.getName());
        user.setEmail(userPojo.getEmail());
        user.setPassword(PasswordEncoderUtil.getInstance().encode(userPojo.getPassword()));
        user.setPhonenumber(userPojo.getPhonenumber());
        user.setAddress(userPojo.getAddress());



        userRepository.save(user);
    }

    @Override
    public List<User> getAllData() {
        return userRepository.findAll(); // select * from users
    }

    @Override
    public Optional<User> getById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    @Override
    public String getName(Integer id) {
        return userRepository.getName(id);
    }

    @Override
    public void updateUser(Integer id, UserPojo updatedUserDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        user.setName(updatedUserDetails.getName());
        user.setAddress(updatedUserDetails.getAddress());
        user.setEmail(updatedUserDetails.getEmail());
        user.setPhonenumber(updatedUserDetails.getPhonenumber());
        user.setPassword(PasswordEncoderUtil.getInstance().encode(updatedUserDetails.getPassword()));

        userRepository.save(user);
    }
}

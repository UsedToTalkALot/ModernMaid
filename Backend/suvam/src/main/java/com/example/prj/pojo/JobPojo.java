package com.example.prj.pojo;

import com.example.prj.entity.Maid;
import com.example.prj.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobPojo {

    private Integer id;

    @NotNull
    private Integer user;

    @NotNull
    private Integer maid;

    @NotNull
    private Integer post;

    @NotNull
    private  boolean accepted;

    @NotNull
    private  boolean rejected;





}

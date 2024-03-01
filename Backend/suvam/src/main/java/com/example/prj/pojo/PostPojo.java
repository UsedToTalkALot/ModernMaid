package com.example.prj.pojo;

import com.example.prj.entity.Post;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class PostPojo {
    private Integer id;


    @NotNull
    private Date start;

    @NotNull  // Change this annotation
    private Date finish;

    @NotNull
    private Integer salary;

    @NotEmpty
    private String discription;

    @NotNull
    private Integer noOfMaids;
    @NotNull
    private String address;


    @NotNull
    private Integer userId;
}

package com.example.prj.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name="post")
public class Post {

    @Id
    @SequenceGenerator(name = "item_seq_gen", sequenceName = "item_id_seq",allocationSize = 1)
    @GeneratedValue(generator="item_seq_gen", strategy = GenerationType.SEQUENCE)
    private Integer id;



    @Column(name="start", nullable = false, length = 255)
    private Date start;

    @Column(name="finish", nullable = false)
    private Date finish;

    @Column(name="salary", nullable = false)
    private Integer salary;

    @Column(name="discription", nullable = false, length = 255)
    private String discription;

    @Column(name="no_of_maids", nullable = false)
    private Integer noOfMaids;
    @Column(name= "address" , nullable = false, length = 255)
    private String address;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private User user;

}

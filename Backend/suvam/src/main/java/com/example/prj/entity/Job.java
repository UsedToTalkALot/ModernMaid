package com.example.prj.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="job")
public class Job {

    @Id
    @SequenceGenerator(name = "item_seq_gen", sequenceName = "item_id_seq",allocationSize = 1)
    @GeneratedValue(generator="item_seq_gen", strategy = GenerationType.SEQUENCE)
    private Integer id;



    @Column(name = "userid", nullable = false)
    private Integer user;

    @Column(name = "maidid", nullable = false)
    private Integer maid;

    @Column(name = "postid", nullable = false)
    private Integer post;

    @Column(name = "accepted", nullable = false)
    private boolean accepted = false;

    @Column(name = "rejected", nullable = false)
    private boolean rejected = false;




}

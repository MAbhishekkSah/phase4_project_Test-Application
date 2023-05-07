package com.project.simplilearn.Quiz_WebApplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.simplilearn.Quiz_WebApplication.model.Quiz;

public interface QuizRepo extends JpaRepository<Quiz, Integer> {

}

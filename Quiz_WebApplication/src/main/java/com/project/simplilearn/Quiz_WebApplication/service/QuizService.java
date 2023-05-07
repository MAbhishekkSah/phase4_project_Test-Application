package com.project.simplilearn.Quiz_WebApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.simplilearn.Quiz_WebApplication.model.Quiz;
import com.project.simplilearn.Quiz_WebApplication.repository.QuizRepo;

@Service
public class QuizService {
	
	@Autowired
	private QuizRepo repository;
	
	public List<Quiz> getAllQuizQuestions()
	{
		return repository.findAll();
	}
}

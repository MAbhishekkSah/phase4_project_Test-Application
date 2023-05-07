package com.project.simplilearn.Quiz_WebApplication.controller;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.simplilearn.Quiz_WebApplication.model.Quiz;
import com.project.simplilearn.Quiz_WebApplication.service.QuizService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class QuizController {
	
	@Autowired
	private QuizService service;
	
	@GetMapping(path="/getAllQuestions")
	public List<Quiz> getQuizQuestions()
	{
		List<Quiz> quizList = new ArrayList<Quiz>();
		quizList = service.getAllQuizQuestions();
		return quizList;
	}
}

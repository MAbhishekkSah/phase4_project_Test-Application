import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { QuizServiceService } from '../quiz-service.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

interface CurrentQuestion {
  id:Number;
  question:String;
  choice1:String;
  choice2:String;
  choice3:String;
  choice4:String;
  answer:String;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})


export class QuizComponent implements OnInit {

  constructor(private quiz_service:QuizServiceService , private _router:Router){  }

  questionsList:any = [];
  currentIndex:number = 0;
  currentQuestion!: CurrentQuestion;
  selectedAnswers = new Array();
  marks:number = 0;

  ngOnInit(){
    return this.quiz_service.getAllQuizQuestions().subscribe(
        data=>{
          console.log("Response recieved");
          this.questionsList=data;
          this.currentQuestion = this.questionsList[0];
          //console.log(this.questionsList[0] + " <-=");
        },
        error=>console.log("Exception")
    );
    
  }
  size():number
  {
    let ctr = 0, len = 0;
    while(1)
    {
      if(this.questionsList[ctr] != null)
      {
        len++;
      }
      else{
        break;
      }
      ctr++;
    }
    return len-1;
  }

  submit(userForm: any)
  {
    this.selectedAnswers[this.currentIndex] = userForm.value.quizOptions;
    console.log("Form Submitted! ",this.selectedAnswers);
    this.currentIndex++;
    this.currentQuestion = this.questionsList[this.currentIndex];
    let length = this.size();
    if(this.currentIndex<=length)
    {
      userForm.reset();
      console.log("Inside if -> ",userForm);
      this._router.navigate(['playquiz']);
    }
    else{
      console.log("Marks Scored :- ",this.marksScored(this.selectedAnswers));
      this._router.navigate(['playquiz']);
    }
  }
  
  marksScored(clickedAnswers:any) :number
  {
    let ctr = 0;
    //let marks = 0;
    this.questionsList.forEach((element: { answer: any; }) => {
      if(element.answer == clickedAnswers[ctr])
      {
        this.marks++;
      }
      ctr++;
    });
    return this.marks;
  }
  onclickOfBackBtn(userForm:any)
  {
    console.log(userForm);
    this.currentIndex--;
    userForm.value.quizOptions = this.selectedAnswers[this.currentIndex];
    //this.selectedAnswers[this.currentIndex] = null;
    this.currentQuestion = this.questionsList[this.currentIndex];
    console.log(this.selectedAnswers);
    this._router.navigate(['playquiz']);
  }
  pageReload()
  {
    this.currentIndex = 0;
    this.currentQuestion = this.questionsList[this.currentIndex];
    this.marks = 0;
    this.selectedAnswers.forEach(element => {
      element = null;
    });
    this._router.navigate(['playquiz']);
  }
}

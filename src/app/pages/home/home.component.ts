import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as CanvasJS from '../../../assets/scripts/canvasjs.min.js';
import { VotingService } from 'src/app/shared/services/api/index.js';
import { Voting } from 'src/app/shared/models/index.js';
import { SwalService, ChangeThemeService } from 'src/app/shared/services/index.js';

class IVote {
  UserId: number;
  VotingDetailsId: number;
  VotingDate: string;
  Comment: string;
  VotingID: number;
  
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ctor
  vote: Voting;
  userVote : IVote ;
  isAnswer : boolean = false;
  isVote : boolean = true;


  constructor(
    private spinner: NgxSpinnerService,
    private votingService: VotingService,
    private swal : SwalService,
    private changeThemeService :ChangeThemeService
  ) { }
   
  ngOnInit() {
    this.changeThemeService.changeColor();
    this.vote = new Voting();
    this.vote.answers = [];
    this.getQusetion();
    this.spinner.hide();
     this.getChart();
    this.userVote = new IVote();
    this.userVote.Comment = '';
  }
  getQusetion() {
    this.votingService.GetForUser().subscribe(res => {
      if(res != null){
        this.vote = res;
        this.isVote = false;
        setTimeout(() => {
        this.changeThemeService.changeColor();
          
        }, .3);
      }
     
    })


  }


  
  selectedAnswer(item : any){
    this.userVote.VotingDetailsId = item.VotingDetailsID;
    this.isAnswer = true
  }
  answerDetails():string[]{
  let arr =  [...this.vote.answers.map(item =>{
     return `<p class="text-center">${item.Answer} كانت النسبه ${item.Percent} وكان العدد ${item.AnswerCount}</h5>`
    })]
    return arr
  }
  save() {
    // if(!this.isAnswer)return this.swal.NotifierError('قم باختيار اجابه')
    this.userVote.VotingID = this.vote.VotingID;
    this.userVote.VotingDate = this.vote.VotingDate;
    this.userVote.UserId = JSON.parse(localStorage.getItem('User')).UserID;
    this.votingService.Vote(this.userVote).subscribe(res =>{
      this.isVote = true;
      this.swal.confirm(this.answerDetails().join())
    })

  }


  cancle(){
    this.isVote = true;
  }

  getChart() {

    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "dark1",
      animationEnabled: true,
      animationDuration: 2000,
      exportEnabled: true,
      title: {
        // text: "الحضور والانصراف",
        padding: 10,
        horizontalAlign: "right" // "left", "right", "center"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 450, name: "الحضور" },
          { y: 120, name: "الانصراف" },
          { y: 300, name: "الدقائق " },
          { y: 800, name: "الانصراف " },
          { y: 150, name: "اجمالي الغياب" },
          { y: 150, name: "ايام التاخير " },
        ]
      }]
    });

    chart.render();
  }

  
  
}

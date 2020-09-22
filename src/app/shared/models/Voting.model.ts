export class Voting{
    constructor(){
        this.answers = [];
    }
    VotingID : number;
    VotingName : string;
    VotingDate: string;
    VotingStartDate : string;
    VotingEndDate:string;
    VotingQuestion: string;
    Visible: boolean;
    AllCount : number;
    answers: IAnswer[];
}
interface IAnswer{
    VotingDetailsID : number;
    Answer : string;
    AnswerCount : number;
    Percent : number;
}
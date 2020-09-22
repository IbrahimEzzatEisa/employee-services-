export class Votings {
    
        VotingID: number ;
        VotingName: string;
        VotingDate: string;
        VotingStartDate:string;
        VotingEndDate: string;
        VotingQuestion: string;
        Visible: Boolean;
      
        VotingDetails: IVotingDetails[]
}

interface IVotingDetails{
    VotingDetailsID: number,
    VotingId: number,
    Answer: string;
}
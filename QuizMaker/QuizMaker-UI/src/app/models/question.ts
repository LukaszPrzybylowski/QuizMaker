export class Question {
    constructor(
        public id : number,
        public quizId : number,
        public text : string,
        public craetedDate : Date,
        public lastModifiedDate : Date,
        public notes? : string,
    ){}
    
}
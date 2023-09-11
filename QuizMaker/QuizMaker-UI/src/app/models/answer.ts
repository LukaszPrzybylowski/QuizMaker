export class Answer{
    constructor(
        public id : number,
        public quizId : number,
        public questionId : number,
        public text : string,
        public value : number,
        public createdDate : Date,
        public lastModifiedDate : Date
    ){}
}
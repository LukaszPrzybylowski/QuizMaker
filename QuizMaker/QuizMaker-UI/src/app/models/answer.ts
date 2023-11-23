export class Answer{
    constructor(
        public id : number,
        public quizId : number,
        public questionId : number,
        public text : string,
        public createdDate : Date,
        public lastModifiedDate : Date,
        public value ?: number,
    ){}
}
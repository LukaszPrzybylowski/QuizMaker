export class Result{
    constructor(
        public id : number,
        public quizId : number,
        public text : string,
        public createdDate : Date,
        public lastModifiedDate : Date,
        public minValue : number,
        public maxValue : number,
        public notes ?: string,
    ){}
}
export class Quiz {
  
  constructor(
  public id : number,
  public title : string,
  public description : string,
  public text : string,
  public userId : string,
  public viewCount : number,
  public createdDate : Date,
  public lastModifiedDate : Date,
  public notes ?: string,
  ){}
}

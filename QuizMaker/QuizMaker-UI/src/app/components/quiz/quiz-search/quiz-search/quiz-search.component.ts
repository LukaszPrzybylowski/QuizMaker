import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-quiz-search',
  templateUrl: './quiz-search.component.html',
  styleUrls: ['./quiz-search.component.css']
})
export class QuizSearchComponent {
  @Input() class!: string;
  @Input() placeholder!: string;
}

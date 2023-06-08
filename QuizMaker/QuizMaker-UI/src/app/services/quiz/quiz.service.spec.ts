import { TestBed } from '@angular/core/testing';

import { QuizListService } from './quiz-list.service';

describe('QuizService', () => {
  let service: QuizListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UsersAchievementsService } from './users-achievements.service';

describe('UserAchievementsService', () => {
  let service: UsersAchievementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersAchievementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TeamsUsersService } from './teams-users.service';

describe('TeamsUsersService', () => {
  let service: TeamsUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamsUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

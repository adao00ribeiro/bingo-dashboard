import { TestBed } from '@angular/core/testing';

import { ScratchSellerGameService } from './scratch-game-override.service';

describe('ScratchSellerGameService', () => {
  let service: ScratchSellerGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScratchSellerGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

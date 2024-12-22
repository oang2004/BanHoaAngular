import { TestBed } from '@angular/core/testing';

import { LoaiSPService } from './loai-sp.service';

describe('LoaiSpService', () => {
  let service: LoaiSPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaiSPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

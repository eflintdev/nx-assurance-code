import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App]
    }).compileComponents();
  });

  it('should have created the App', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect(fixture).toBeTruthy();
  });
});

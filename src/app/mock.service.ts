import { Injectable } from '@angular/core';
import { moock } from './mock';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  private mock = moock

  getMock() {
    return this.mock;
  }
}

import { Injectable, signal, computed, Signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Action {
  type: string;
  payload?: any;
}

export type Reducer<T> = (state: T, action: Action) => T;

@Injectable({
  providedIn: 'root',
})
export class Store<T extends Record<string, any>> {
  private state$ = new BehaviorSubject<T>({} as T);
  private reducers: Map<string, Reducer<any>> = new Map();

  getState(): T {
    return this.state$.value;
  }

  getState$(): Observable<T> {
    return this.state$.asObservable();
  }

  select<K extends keyof T>(key: K): Observable<T[K]> {
    return new Observable((observer) => {
      return this.state$.subscribe((state) => {
        observer.next(state[key]);
      });
    });
  }

  dispatch(action: Action): void {
    const currentState = this.getState();
    const newState: any = {};

    for (const [key, reducer] of this.reducers.entries()) {
      newState[key] = reducer(currentState[key], action);
    }

    this.state$.next(newState as T);
  }

  registerReducer<K extends keyof T>(key: K, reducer: Reducer<T[K]>): void {
    this.reducers.set(key as string, reducer);
  }
}

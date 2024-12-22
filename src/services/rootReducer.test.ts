import { constructorSlice } from './slices/constructorSlice';
import { feedsSlice } from './slices/feedsSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { newOrderSlice } from './slices/newOrderSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';
import { userSlice } from './slices/userSlice';
import store, { RootState } from './store';

describe('Проверка корректности работы root-reducer', () => {
  test('Проверка состояния по умолчанию', () => {
    const state: RootState = store.getState();

    expect(state[userSlice.name]).toBeDefined();
    expect(state[feedsSlice.name]).toBeDefined();
    expect(state[ingredientsSlice.name]).toBeDefined();
    expect(state[constructorSlice.name]).toBeDefined();
    expect(state[newOrderSlice.name]).toBeDefined();
    expect(state[userOrdersSlice.name]).toBeDefined();
  });
});

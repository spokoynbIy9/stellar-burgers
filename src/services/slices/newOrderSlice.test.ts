import { newOrderSlice, placeNewOrder } from './newOrderSlice';

describe('Тест на newOrderSlice', () => {
  test('newOrderSlice.pending изменяет loading на true', () => {
    const initialState = {
      orderRequest: false,
      orderModalData: null,
      error: undefined
    };
    const nextState = newOrderSlice.reducer(
      initialState,
      placeNewOrder.pending('requestId', [])
    );

    expect(nextState.orderRequest).toBe(true);
  });

  test('newOrderSlice.fulfilled изменяет loading на false', () => {
    const initialState = {
      orderRequest: false,
      orderModalData: null,
      error: undefined
    };

    const mockOrder = {
      _id: '67627d2e750864001d3722e5',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Метеоритный бургер',
      createdAt: '2024-12-18T07:43:42.331Z',
      updatedAt: '2024-12-18T07:43:43.383Z',
      number: 63153
    };
    const mockPayload = {
      order: mockOrder,
      success: true,
      name: ''
    };
    const nextState = newOrderSlice.reducer(
      initialState,
      placeNewOrder.fulfilled(mockPayload, 'requestId', [])
    );
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.orderModalData).toEqual(mockPayload.order);
  });

  test('newOrderSlice.rejected изменяет error на action.error.message, loading на false', () => {
    const initialState = {
      orderRequest: false,
      orderModalData: null,
      error: undefined
    };
    const mockError = { message: 'Ошибка загрузки', name: 'FetchError' };

    const nextState = newOrderSlice.reducer(
      initialState,
      placeNewOrder.rejected(mockError, 'requestId', [])
    );

    expect(nextState.orderRequest).toBe(false);
    expect(nextState.error).toBe('Ошибка загрузки');
  });
});

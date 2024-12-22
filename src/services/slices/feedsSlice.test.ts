import { feedsSlice, getAllFeeds } from './feedsSlice';

describe('Тесты для feedsSlice', () => {
  test('getAllFeeds.pending изменяет loading на true', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: undefined
    };
    const nextState = feedsSlice.reducer(
      initialState,
      getAllFeeds.pending('requestId')
    );
    expect(nextState.isLoading).toBe(true);
  });
  test('getAllFeeds.fullfulled изменяет loading на false', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: undefined
    };

    const mockPayload = {
      success: true,
      orders: [
        {
          _id: '1',
          name: 'Бургер 1',
          status: 'done',
          ingredients: ['ingredient1', 'ingredient2'],
          createdAt: '2024-12-18T10:00:00.000Z',
          updatedAt: '2024-12-18T11:00:00.000Z',
          number: 12345
        },
        {
          _id: '2',
          name: 'Бургер 2',
          status: 'in progress',
          ingredients: ['ingredient3', 'ingredient4'],
          createdAt: '2024-12-18T11:00:00.000Z',
          updatedAt: '2024-12-18T12:00:00.000Z',
          number: 12346
        }
      ],
      total: 10,
      totalToday: 2
    };
    const nextState = feedsSlice.reducer(
      initialState,
      getAllFeeds.fulfilled(mockPayload, 'requestId')
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.orders).toEqual(mockPayload.orders);
  });

  test('getAllFeeds.rejected изменяет error на action.error.message, loading на false', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: undefined
    };
    const mockError = { message: 'Ошибка загрузки', name: 'FetchError' };

    const nextState = feedsSlice.reducer(
      initialState,
      getAllFeeds.rejected(mockError, 'requestId')
    );

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Ошибка загрузки');
  });
});

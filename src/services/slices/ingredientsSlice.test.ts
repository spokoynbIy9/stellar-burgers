import { getIngredientsList, ingredientsSlice } from './ingredientsSlice';

describe('Тесты для ingredientsSlice', () => {
  test('getIngredientsList.pending изменяет loading на true', () => {
    const initialState = {
      ingredients: [],
      loading: false,
      error: null
    };
    const nextState = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.pending('requestId')
    );

    expect(nextState.loading).toBe(true);
  });

  test('getIngredientsList.fulfilled изменяет loading на false', () => {
    const initialState = {
      ingredients: [],
      loading: false,
      error: null
    };

    const mockPayload = [
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0,
        id: '3'
      }
    ];
    const nextState = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.fulfilled(mockPayload, 'requestId')
    );
    expect(nextState.loading).toBe(false);
    expect(nextState.ingredients).toEqual(mockPayload);
  });

  test('getIngredientsList.rejected изменяет error на action.error.message, loading на false', () => {
    const initialState = {
      ingredients: [],
      loading: false,
      error: null
    };
    const mockError = { message: 'Ошибка загрузки', name: 'FetchError' };

    const nextState = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.rejected(mockError, 'requestId')
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка загрузки');
  });
});

import { FC, useEffect } from 'react';

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';

import {
  getUserOrders,
  listOfOrders
} from '../../services/slices/userOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  const orders: TOrder[] = useSelector(listOfOrders);
  return <ProfileOrdersUI orders={orders} />;
};

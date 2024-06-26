import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducerList = {
    [reducerName in StateSchemaKey]?: Reducer;
}

interface DynamicModuleLoaderkProps {
    reducers: ReducerList;
    removeAfterUnMount?: boolean;
}

export const DynamicModuleLoader:FC<DynamicModuleLoaderkProps> = (props) => {
  const {
    children,
    reducers,
    removeAfterUnMount = true,
  } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    Object.entries(reducers).forEach(([reducerName, reducer]) => {
      const mounted = mountedReducers[reducerName as StateSchemaKey];

      if (!mounted) {
        store.reducerManager.add(reducerName as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${reducerName} reducer` });
      }
    });

    return () => {
      if (removeAfterUnMount) {
        Object.entries(reducers).forEach(([reducerName]) => {
          store.reducerManager.remove(reducerName as StateSchemaKey);
          dispatch({ type: `@DESTROY ${reducerName} reducer` });
        });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{ children }</>
  );
};

'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { RequestBodies } from './types';

const initialValue: RequestBodies = {
  '0': undefined,
  '1': undefined,
  '2': undefined,
  '3': null,
};

const requestBodiesContext = createContext(initialValue);
const setRequestBodiesContext = createContext<
  Dispatch<SetStateAction<RequestBodies>>
>(() => {});

export const RequestBodiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [requestBodies, setRequestBodies] = useState(initialValue);

  return (
    <requestBodiesContext.Provider value={requestBodies}>
      <setRequestBodiesContext.Provider value={setRequestBodies}>
        {children}
      </setRequestBodiesContext.Provider>
    </requestBodiesContext.Provider>
  );
};

export const useRequestBodiesValue = () => useContext(requestBodiesContext);
export const useSetRequestBodies = () => useContext(setRequestBodiesContext);

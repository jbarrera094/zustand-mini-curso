// implementacion minima necesaria para que funcione un custom middleware
// const loggerImpl: any =
//   (f: any, name: any) => (set: any, get: any, store: any) => {
//     const loggedSet: typeof set = (...a: any[]) => {
//       set(...(a as Parameters<typeof set>));
//       console.log(...(name ? [`${name}:`] : []), get());
//     };
//     const setState = store.setState;
//     store.setState = (...a: any[]) => {
//       setState(...(a as Parameters<typeof setState>));
//       console.log(...(name ? [`${name}:`] : []), store.getState());
//     };

//     return f(loggedSet, get, store);
//   };

import { StateCreator, StoreMutatorIdentifier } from "zustand";

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    set(...(a as Parameters<typeof set>));
    console.log(...(name ? [`${name}:`] : []), get());
  };
  const setState = store.setState;
  store.setState = (...a) => {
    setState(...(a as Parameters<typeof setState>));
    console.log(...(name ? [`${name}:`] : []), store.getState());
  };

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

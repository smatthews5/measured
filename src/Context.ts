import { createContext } from 'react';

import { Booze, User } from './interfaces';

interface Person {
  user: User;
  setUser: (user: User) => void;
}
interface Drink {
  booze: Booze;
  setBooze: (booze: Booze) => void;
}

const UserContext = createContext<Partial<Person>>({});
const BoozeContext = createContext<Partial<Drink>>({});

export { UserContext, BoozeContext };

import { createContext } from 'react';

import { Booze, User } from './interfaces';

interface Person {
  user: User;
  setUser: (user: User) => User;
}
interface Drink {
  booze: Booze;
  setBooze: (booze: Booze) => Booze;
}

const UserContext = createContext<Partial<Person>>({});
const BoozeContext = createContext<Partial<Drink>>({});

export { UserContext, BoozeContext };

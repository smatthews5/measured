import { createContext } from 'react';

import { Booze, User } from './interfaces';

interface IUser {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

interface IBooze {
  booze: Booze;
  setBooze: React.Dispatch<React.SetStateAction<Booze>>;
}

const UserContext = createContext({} as IUser);
const BoozeContext = createContext({} as IBooze);

export { UserContext, BoozeContext };

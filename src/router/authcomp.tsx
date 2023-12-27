import { ReactNode, createContext, useState } from 'react';

export interface AuthContextType {
  user: any;
  changeUser: (newUser: any) => void;
}

export let AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(
    localStorage.getItem('isLogin') === "true"
  );

  const changeUser = (newUser: any = null) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, changeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

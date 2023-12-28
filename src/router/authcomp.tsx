import { ReactNode, createContext, useState } from 'react';

export interface AuthContextType {
  isLogin: any;
  username: string;
  changeIsLogin: (newUser: any) => void;
  changeUsername: (newUsername: string) => void;
}

export let AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<any>(
    localStorage.getItem('isLogin') === "true"
  );
  const [username, setUsername] = useState<string>(localStorage.getItem('username') || "");

  const changeIsLogin = (newUser: any = null) => {
    setIsLogin(newUser);
  };

  const changeUsername = (newUsername: any = null) => {
    setUsername(newUsername);
  };

  return (
    <AuthContext.Provider value={{ isLogin, changeIsLogin, username, changeUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

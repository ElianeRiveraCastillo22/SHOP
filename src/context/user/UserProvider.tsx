// test
import { createContext, ReactNode, useState } from "react";

export interface UserCredentials {
    accessToken: string;
    email: string;
    firstName: string;
    gender: string;
    id: number;
    image: string;
    lastName: string;
    refreshToken: string;
    username: string;
}

const userContext = createContext<{
    userCredentials: UserCredentials | null;
    setUserCredentials: React.Dispatch<
        React.SetStateAction<UserCredentials | null>
    >;
}>({
    userCredentials: null,
    setUserCredentials: () => null,
});

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userCredentials, setUserCredentials] = useState<UserCredentials | null>(null);

    return (
        <userContext.Provider value={{ userCredentials, setUserCredentials }}>
            {children}
        </userContext.Provider>
    );
};

export { userContext, UserProvider };

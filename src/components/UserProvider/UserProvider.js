import React from 'react';
import { Amplify } from 'aws-amplify';
import {
  getCurrentUser,
  signOut,
  signIn,
  signUp,
  // resendSignUpCode,
  fetchUserAttributes,
  confirmSignUp,
  fetchAuthSession,
} from '@aws-amplify/auth';
import awsExports from '../../aws-exports';
import useInterval from '../../hooks/use-interval.hook';
Amplify.configure(awsExports);

export const UserContext = React.createContext();

// const ENDPOINT = process.env.REACT_APP_TASKS_API;
// const AUTH_ENDPOINT = process.env.REACT_APP_TASKS_API;
// const API_KEY = process.env.REACT_APP_API_KEY;

function UserProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [authUpdated, setAuthUpdated] = React.useState(0);
  const [user, setUser] = React.useState('');
  const [token, setToken] = React.useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [infiniteScrollToken, setInfiniteScrollToken] = React.useState(null);
  const [stats, setStats] = React.useState(null);
  const [name, setName] = React.useState('');

  const fetchToken = async () => {
    try {
      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      const idToken = tokens.idToken.toString();
      setToken(idToken);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  useInterval(fetchToken, isAuthenticated ? 3600000 : null);

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();
        setIsAuthenticated(true);
        setUser(username);
        setName(userAttributes['given_name']);
        const { tokens } = await fetchAuthSession({ forceRefresh: true });
        const idToken = tokens.idToken.toString();
        setToken(idToken);
      } catch (err) {
        //
        setIsAuthenticated(false);
      }
    };
    getUserData();
  }, [authUpdated]);

  // const deleteQuery = async (queryId) => {
  //   const oldQuery = userQueries.filter((query) => {
  //     return query.MATRIX_SHAREID.S === queryId;
  //   })[0];
  //   const oldUlid = oldQuery.MATRIX_ULID.S;
  //   setUserQueries((oldValue) => {
  //     return oldValue.filter((query) => {
  //       return query.MATRIX_SHAREID.S !== queryId;
  //     });
  //   });
  //   const URL = AUTH_ENDPOINT + `query?id=${queryId}&ulid=${oldUlid}`;
  //   const HEADERS = {
  //     'Content-Type': 'application/json',
  //     Authorization: token,
  //   };
  //   const request = new Request(URL, {
  //     method: 'DELETE',
  //     headers: HEADERS,
  //     timeout: 100000,
  //   });
  //   const response = await fetch(request);
  //   const json = await response.json();
  // };

  // const deleteSequence = async (sequenceId) => {
  //   const oldSequence = userSequences.filter((sequence) => {
  //     return sequence.id === sequenceId;
  //   })[0];
  //   const sequenceTitle = oldSequence.name;
  //   const payload = { title: sequenceTitle };
  //   const URL = AUTH_ENDPOINT + `sequence`;
  //   const HEADERS = {
  //     'Content-Type': 'application/json',
  //     Authorization: token,
  //   };
  //   const request = new Request(URL, {
  //     method: 'DELETE',
  //     headers: HEADERS,
  //     body: JSON.stringify(payload),
  //     timeout: 100000,
  //   });
  //   const response = await fetch(request);
  //   const json = await response.json();
  // };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser('');
      setName('');
      setAuthUpdated((oldValue) => oldValue + 1);
    } catch (err) {
      //
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const input = {
        username: email,
        password: password,
      };
      const response = await signIn(input);
      setAuthUpdated((oldValue) => oldValue + 1);
    } catch (err) {
      //
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      const input = {
        username: email,
        password: password,
        options: {
          userAttributes: {
            email,
          },
        },
      };
      const signUpResponse = await signUp(input);
    } catch (err) {
      //
    }
  };

  const handleConfirmSignUp = async (email, code) => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      setAuthUpdated((oldValue) => oldValue + 1);
    } catch (error) {
      //
    }
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        handleLogout,
        handleLogin,
        handleSignUp,
        handleConfirmSignUp,
        isAuthModalOpen,
        setIsAuthModalOpen,
        token,
        stats,
        name,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

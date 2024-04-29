import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleRole = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <UserContext.Provider value={{ isAdmin, toggleRole }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
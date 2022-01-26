import { createContext, useContext, useState } from "react";

const RecruitsContext = createContext();

export const RecruitsContextProvider = ({ children }) => {
  const [recruits, setRecruits] = useState([]);

  const addRecruit = async (recruit) => {
    setRecruits((prev) => [...prev, recruit]);
  };

  const updateRecruit = (id, updated) => {
    setRecruits((prev) =>
      prev.map((recruit) =>
        recruit.id === id ? { ...recruit, ...updated } : recruit
      )
    );
  };

  const deleteRecruit = (id) => {
    setRecruits((prev) => prev.filter((recruit) => recruit.id !== id));
  };

  return (
    <RecruitsContext.Provider
      value={{
        helpers: { setRecruits, addRecruit, updateRecruit, deleteRecruit },
        state: {
          recruits,
        },
      }}
    >
      {children}
    </RecruitsContext.Provider>
  );
};

export const useRecruitsContext = () => useContext(RecruitsContext);

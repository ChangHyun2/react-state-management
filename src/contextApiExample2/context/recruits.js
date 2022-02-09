import { createContext, useContext, useState } from "react";

import RecruitsApi from "../../api/recruits";

const RecruitsContext2 = createContext();

export const RecruitsContext2Provider = ({ children }) => {
  const [recruits, setRecruits] = useState([]);

  const addRecruit = async (data) => {
    const created = await RecruitsApi.post(data);

    setRecruits((prev) => [...prev, created]);
  };

  const updateRecruit = async (id, data) => {
    const updated = await RecruitsApi.patch(id, data);

    setRecruits((prev) =>
      prev.map((recruit) =>
        recruit.id === id ? { ...recruit, ...updated } : recruit
      )
    );
  };

  const deleteRecruit = async (id) => {
    await RecruitsApi.delete(id);

    setRecruits((prev) => prev.filter((recruit) => recruit.id !== id));
  };

  return (
    <RecruitsContext2.Provider
      value={{
        helpers: { setRecruits, addRecruit, updateRecruit, deleteRecruit },
        state: {
          recruits,
        },
      }}
    >
      {children}
    </RecruitsContext2.Provider>
  );
};

export const useRecruitsContext = () => useContext(RecruitsContext2);

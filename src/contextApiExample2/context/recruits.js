import { createContext, useContext, useState } from "react";

import RecruitApi from "../../api/recruit";

const RecruitsContext2 = createContext();

export const RecruitsContext2Provider = ({ children }) => {
  const [recruits, setRecruits] = useState([]);

  const addRecruit = async (data) => {
    const created = await RecruitApi.post(data);

    setRecruits((prev) => [...prev, created]);
  };

  const updateRecruit = async (id, data) => {
    await RecruitApi.patch(id, data);

    setRecruits((prev) =>
      prev.map((recruit) =>
        recruit.id === id ? { ...recruit, ...data } : recruit
      )
    );
  };

  const deleteRecruit = async (id) => {
    await RecruitApi.delete(id);
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

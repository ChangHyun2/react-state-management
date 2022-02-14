import { createContext, useContext, useState, useEffect } from "react";

import RecruitsApi from "../../api/recruits";

const RecruitsContext2 = createContext();

export const RecruitsContext2Provider = ({ children }) => {
  const [recruits, setRecruits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecruits = async () => {
    setIsLoading(true);
    try {
      const recruits = await RecruitsApi.get();
      setRecruits(recruits);
      setError(null);
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  };

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

  useEffect(() => {
    fetchRecruits();
  }, []);

  return (
    <RecruitsContext2.Provider
      value={{
        helpers: {
          setRecruits,
          addRecruit,
          updateRecruit,
          deleteRecruit,
          fetchRecruits,
        },
        state: {
          error,
          recruits,
          isLoading,
        },
      }}
    >
      {children}
    </RecruitsContext2.Provider>
  );
};

export const useRecruitsContext = () => useContext(RecruitsContext2);

export const useToken = () => {
  // Récupère le token
  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  // Ajoute le token
  const setToken = (token) => {
    sessionStorage.setItem("token", token);
  };

  // Suppression du token
  const deleteToken = () => {
    sessionStorage.removeItem("token");
  };

  return {
    getToken,
    setToken,
    deleteToken,
  };
};

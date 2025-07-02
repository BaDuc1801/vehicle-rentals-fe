const sessionKey = import.meta.env.VITE_SESSION_TYPE_KEY;

export const getSessionType = () => {
  const match = document.cookie.match(new RegExp(`${sessionKey}=([^;]+)`));
  return match ? match[1] : "guest";
};

export const setSessionType = (type) => {
  document.cookie = `${sessionKey}=${type}; path=/; max-age=31536000`;
};

export const clearSessionType = () => {
  document.cookie = `${sessionKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const clearSession = () => {
  document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  clearSessionType();
};

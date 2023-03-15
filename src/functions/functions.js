export const setLocalStorage = (key, time) => {
  localStorage.setItem(key, JSON.stringify(time));
};

export const getLocalStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) {
    return "";
  }
  return JSON.parse(storedValue);
};

export const deleteStorage = (key) => {
  localStorage.removeItem(key);
};

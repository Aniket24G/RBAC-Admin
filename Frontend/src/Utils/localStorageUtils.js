export const loadFromLocalStorage = (key, defaultValue) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

export const saveToLocalStorage = (key, value) => {
localStorage.setItem(key, JSON.stringify(value))
}


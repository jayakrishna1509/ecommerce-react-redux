// LocalStorage utilities
export const localStorageUtils = {
    /**
     * Get item from localStorage with error handling
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if key doesn't exist
     * @returns {*} Parsed value or default value
     */
    getItem: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (error) {
            console.error(`Error reading ${key} from localStorage:`, error);
            return defaultValue;
        }
    },

    /**
     * Set item in localStorage with error handling
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @returns {boolean} Success status
     */
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
            if (error.name === 'QuotaExceededError') {
                console.warn('LocalStorage quota exceeded. Consider clearing old data.');
            }
            return false;
        }
    },

    /**
     * Remove item from localStorage
     * @param {string} key - Storage key
     * @returns {boolean} Success status
     */
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing ${key} from localStorage:`, error);
            return false;
        }
    },

    /**
     * Clear all localStorage
     * @returns {boolean} Success status
     */
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    /**
     * Check if localStorage is available
     * @returns {boolean} Availability status
     */
    isAvailable: () => {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
};

// SessionStorage utilities
export const sessionStorageUtils = {
    /**
     * Get item from sessionStorage with error handling
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if key doesn't exist
     * @returns {*} Parsed value or default value
     */
    getItem: (key, defaultValue = null) => {
        try {
            const item = sessionStorage.getItem(key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (error) {
            console.error(`Error reading ${key} from sessionStorage:`, error);
            return defaultValue;
        }
    },

    /**
     * Set item in sessionStorage with error handling
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @returns {boolean} Success status
     */
    setItem: (key, value) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error saving ${key} to sessionStorage:`, error);
            if (error.name === 'QuotaExceededError') {
                console.warn('SessionStorage quota exceeded. Consider clearing old data.');
            }
            return false;
        }
    },

    /**
     * Remove item from sessionStorage
     * @param {string} key - Storage key
     * @returns {boolean} Success status
     */
    removeItem: (key) => {
        try {
            sessionStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing ${key} from sessionStorage:`, error);
            return false;
        }
    },

    /**
     * Clear all sessionStorage
     * @returns {boolean} Success status
     */
    clear: () => {
        try {
            sessionStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing sessionStorage:', error);
            return false;
        }
    },

    /**
     * Check if sessionStorage is available
     * @returns {boolean} Availability status
     */
    isAvailable: () => {
        try {
            const test = '__storage_test__';
            sessionStorage.setItem(test, test);
            sessionStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
};

// Storage keys constants
export const STORAGE_KEYS = {
    CART: 'cart',
    USER: 'users',
    FILTER_CATEGORY: 'filterCategory',
    FILTER_PRICE_RANGES: 'filterPriceRanges',
    FILTER_RATING: 'filterRating',
    WISHLIST: 'wishlist'
};

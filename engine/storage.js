/**
 * ==========================================
 * QEDEV Engine
 * Storage
 * ==========================================
 */

const Storage = (() => {
  /**
   * Generate Storage Key
   */
  function storageKey(key) {
    return `${CONFIG.STORAGE_PREFIX}_${key}`;
  }

  /**
   * Set Value
   */
  function set(key, value) {
    localStorage.setItem(storageKey(key), JSON.stringify(value));
  }

  /**
   * Get Value
   */
  function get(key, defaultValue = null) {
    const value = localStorage.getItem(storageKey(key));

    if (value === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(value);
    } catch {
      return defaultValue;
    }
  }

  /**
   * Has Key
   */
  function has(key) {
    return localStorage.getItem(storageKey(key)) !== null;
  }

  /**
   * Remove Key
   */
  function remove(key) {
    localStorage.removeItem(storageKey(key));
  }

  /**
   * Clear QEDEV Storage
   */
  function clear() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(`${CONFIG.STORAGE_PREFIX}_`)) {
        localStorage.removeItem(key);
      }
    });
  }

  return {
    set,

    get,

    has,

    remove,

    clear,
  };
})();

window.Storage = Storage;

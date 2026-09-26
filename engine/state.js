/**
 * ==========================================
 * QEDEV Engine
 * State
 * ==========================================
 */

const State = (() => {
  /**
   * Internal State
   */
  const state = {};

  /**
   * Set Value
   */
  function set(key, value) {
    state[key] = value;
  }

  /**
   * Get Value
   */
  function get(key, defaultValue = null) {
    return key in state ? state[key] : defaultValue;
  }

  /**
   * Has Key
   */
  function has(key) {
    return key in state;
  }

  /**
   * Remove Key
   */
  function remove(key) {
    delete state[key];
  }

  /**
   * Clear State
   */
  function clear() {
    Object.keys(state).forEach((key) => {
      delete state[key];
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

window.State = State;

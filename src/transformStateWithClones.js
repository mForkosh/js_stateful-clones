'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const history = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        addProperties(stateCopy, obj.extraData);
        break;
      case 'removeProperties':
        removeProperties(stateCopy, obj.keysToRemove);
        break;
      case 'clear':
        clearObject(stateCopy);
        break;
      default:
        history.push('1');
    }
  }

  function addProperties(object, extraData) {
    Object.assign(object, extraData);

    const copy = { ...object };

    history.push(copy);
  }

  function removeProperties(object, keysToRemove) {
    for (const key of keysToRemove) {
      delete object[key];
    }

    const copy = { ...object };

    history.push(copy);
  }

  function clearObject(object) {
    for (const key in object) {
      delete object[key];
    }

    const copy = { ...object };

    history.push(copy);
  }

  return history;
}

module.exports = transformStateWithClones;

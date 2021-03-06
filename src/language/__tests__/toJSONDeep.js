/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

/**
 * Deeply transforms an arbitrary value to a JSON-safe value by calling toJSON
 * on any nested value which defines it.
 */
export default function toJSONDeep<T>(value: T): T {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (typeof value.toJSON === 'function') {
    return value.toJSON();
  }

  if (Array.isArray(value)) {
    return value.map(toJSONDeep);
  }

  const result: any = {};
  for (const prop in value) {
    if (value.hasOwnProperty(prop)) {
      result[prop] = toJSONDeep(value[prop]);
    }
  }
  return result;
}

'use strict';

import test from 'tape';
import { toSeconds } from '../dist';

function roundTime(time) {
  return Math.round(parseFloat(time) * 10000) / 10000;
}

test('toSeconds with valid values', t => {

  const tests = [
    // using default at 25fps
    ['00:00:00:00', 0, 25],
    ['00:00:00:01', 0.04, 25],
    ['00:00:00:02', 0.08, 25],
    ['00:00:00:10', 0.4, 25],
    ['00:00:00:25', 1, 25],
    ['00:00:00:26', 1.04, 25],
    ['00:00:01:00', 1, 25],
    ['00:01:01:00', 61, 25],
    ['00:23:47:10', 1427.4, 25],
    ['01:01:01:00', 3661, 25],
    ['01:10:31:00', 4231, 25],
    ['99:59:59:00', 359999, 25],
    ['99:59:59:99', 360002.96, 25],
    // 29.97
    ['00:00:00:00', 0, 29.97],
    ['00:00:00:01', 1000 / 29.97 / 1000 * 1, 29.97],
    ['00:00:00:02', 1000 / 29.97 / 1000 * 2, 29.97],
    ['00:00:00:10', 1000 / 29.97 / 1000 * 10, 29.97],
    ['00:00:00:25', 1000 / 29.97 / 1000 * 25, 29.97],
    ['00:00:00:26', 1000 / 29.97 / 1000 * 26, 29.97],
    ['00:00:00:27', 1000 / 29.97 / 1000 * 27, 29.97],
    ['00:00:00:30', 1000 / 29.97 / 1000 * 30, 29.97],
    ['00:00:01:00', 1, 29.97],
    ['00:01:01:00', 61, 29.97],
    ['01:01:01:00', 3661, 29.97],
    ['01:10:31:00', 4231, 29.97],
    ['99:59:59:00', 359999, 29.97],
    ['99:59:59:99', 1000 / 29.97 / 1000 * 99 + 359999, 29.97]
  ];

  tests.forEach(sample => {
    const expected = roundTime(sample[1]),
      actual = roundTime(toSeconds(sample[0], sample[2]));

    t.equal(actual, expected, `${sample[0]} -> ${expected} (${sample[2]}fps)`);
  });

  t.end();
});



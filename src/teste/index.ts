import assert = require('assert');
import { describe, it } from 'mocha';

describe('Array', () => {
  describe('indexOf()', () => {
    it('deve retornar -1 quando o valor não estiver presente', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

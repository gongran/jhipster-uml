'use strict';

const expect = require('chai').expect,
  fail = expect.fail,
  merge = require('../../lib/utils/object_utils').merge,
  values = require('../../lib/utils/object_utils').values;

describe('ObjectUtils', () => {
  describe('::merge', () => {
    const object1 = {
      a: 1,
      b: 2
    };

    const object2 = {
      b: 3,
      c: 4
    };

    describe('when merging two object', () => {
      describe('with the first being nil or empty', () => {
        const merged1 = merge(null, {a: 1});
        const merged2 = merge({}, {a: 1});

        it('returns the second', () => {
          expect(merged1).to.deep.eq({a: 1});
          expect(merged2).to.deep.eq({a: 1});
        });
      });
      describe('with the second being nil or empty', () => {
        const merged1 = merge({a: 1}, null);
        const merged2 = merge({a: 1}, null);

        it('returns the first', () => {
          expect(merged1).to.deep.eq({a: 1});
          expect(merged2).to.deep.eq({a: 1});
        });
      });
      it('returns the merged object by merging the second into the first', () => {
        expect(
          merge(object1, object2)
        ).to.deep.equal({a: 1, b: 3, c: 4});

        expect(
          merge(object2, object1)
        ).to.deep.equal({a: 1, b: 2, c: 4});
      });

      it('does not modify any of the two objects', () => {
        merge(object1, object2);
        expect(
          object1
        ).to.deep.equal({a: 1, b: 2});
        expect(
          object2
        ).to.deep.equal({b: 3, c: 4});
      });
    });
  });
  describe('::values', () => {
    describe('when passing a nil object', () => {
      it('fails', () => {
        try {
          values(null);
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
        try {
          values(undefined);
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
      });
    });
    describe('when passing a valid object', () => {
      it("returns its keys' values", () => {
        expect(values({
          a: 42,
          b: 'A string',
          c: [1, 2, 3, 4, 5],
          d: {d1: '', d2: 'something'}
        })).to.deep.eq([42, 'A string', [1, 2, 3, 4, 5], {d1: '', d2: 'something'}]);
      });
    });
  });
});

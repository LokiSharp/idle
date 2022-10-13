import { DataWriter } from "../src/DataWriter";
const dw = new DataWriter();

afterEach(() => {
  dw.data = [];
});

test("addNumber", () => {
  const array = [];
  for (let i = 0; i < 10000; i++) {
    dw.addNumber(i);
    array.push(i);
  }

  expect(dw.data).toStrictEqual(array);
});

test("addBool", () => {
  dw.addBool(true);
  dw.addBool(false);
  expect(dw.data).toStrictEqual([1, 0]);
});

test("addChunk", () => {
  dw.addChunk([1, 2, 3, 4, 5]);
  expect(dw.data).toStrictEqual([1, 2, 3, 4, 5]);
});

test("addVariableLengthChunk", () => {
  dw.addVariableLengthChunk([1, 2, 3, 4, 5]);
  expect(dw.data).toStrictEqual([5, 1, 2, 3, 4, 5]);
});

test("addBoolArray", () => {
  dw.addBoolArray([true, false]);
  expect(dw.data).toStrictEqual([2, 1, 0]);
});

test("addString", () => {
  dw.addString("addString");
  expect(dw.data).toStrictEqual([9, 97, 100, 100, 83, 116, 114, 105, 110, 103]);
});

import { DataReader } from "../src/DataReader";

test("dataLength", () => {
  const dr = new DataReader([1, 2, 3, 4]);
  expect(dr.dataLength).toBe(4);
});

test("atEnd", () => {
  const dr = new DataReader([1, 2, 3, 4]);
  expect(dr.atEnd).toBe(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  dr.dataIndex = 4;
  expect(dr.atEnd).toBe(true);
});

test("getBool", () => {
  const dr = new DataReader([1, 0]);
  expect(dr.getBool()).toBe(true);
  expect(dr.getBool()).toBe(false);
});

test("getNumber", () => {
  const dr = new DataReader([1, 0]);
  expect(dr.getNumber()).toBe(1);
  expect(dr.getNumber()).toBe(0);
  expect(dr.getNumber()).toBe(Infinity);
});

test("nextValue", () => {
  const dr = new DataReader([1, 0]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(dr.dataIndex).toBe(0);
  expect(dr.nextValue()).toBe(1);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(dr.dataIndex).toBe(1);
  expect(dr.nextValue()).toBe(0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(dr.dataIndex).toBe(2);
  expect(dr.nextValue()).toBe(undefined);
});

test("getChunk", () => {
  const dr = new DataReader([1, 0]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(dr.dataIndex).toBe(0);
  expect(dr.getChunk(2)).toStrictEqual([1, 0]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(dr.dataIndex).toBe(2);
});

test("getString", () => {
  const dr = new DataReader([9, 103, 101, 116, 83, 116, 114, 105, 110, 103]);
  expect(dr.getString()).toBe("getString");
});

test("getRawData", () => {
  const dr = new DataReader([1, 0]);
  expect(dr.getRawData()).toStrictEqual([1, 0]);
});

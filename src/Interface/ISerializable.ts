import { DataReader } from "../DataReader";

export interface ISerializable {
  serialize(): number[];
  deserialize(reader: DataReader, version: number): void;
}

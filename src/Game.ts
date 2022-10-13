import { DataReader } from "./DataReader";
import { ISerializable } from "./Interface/ISerializable";
import { ITickable } from "./Interface/ITickable";

export class Game implements ISerializable, ITickable {
  public tick(): void {
    throw new Error("Method not implemented.");
  }
  public serialize(): number[] {
    throw new Error("Method not implemented.");
  }
  public deserialize(reader: DataReader): void {
    reader.dataLength;
  }
}

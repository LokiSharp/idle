import { DataReader } from "../DataReader";
import { DataWriter } from "../DataWriter";
import { ISerializable } from "../Interface/ISerializable";
import { ITickable } from "../Interface/ITickable";
import { CharacterStats } from "./CharacterStats";

export class Character implements ISerializable, ITickable {
  public hitpoints = 0;
  public stats = new CharacterStats();

  public tick(): void {
    throw new Error("Method not implemented.");
  }
  public serialize(): number[] {
    const writer = new DataWriter();
    writer.addNumber(this.hitpoints);
    return writer.data;
  }
  public deserialize(reader: DataReader): void {
    this.hitpoints = reader.getNumber();
  }
}

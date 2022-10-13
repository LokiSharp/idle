import { DataReader } from "../DataReader";
import { DataWriter } from "../DataWriter";
import { ISerializable } from "../Interface/ISerializable";
import { ITickable } from "../Interface/ITickable";
import { clampValue, roundToTickInterval } from "../utils";
import { CharacterStats } from "./CharacterStats";
import { EquipmentStats } from "./EquipmentStats";

export class Character implements ISerializable, ITickable {
  public hitpoints = 0;
  public stats = new CharacterStats();
  public equipmentStats = new EquipmentStats();
  public levels: Levels<number> = {
    Hitpoints: 0,
    Attack: 0,
    Strength: 0,
    Defence: 0,
    Ranged: 0,
    Magic: 0,
  };

  public attackType: AttackType = "melee";

  public tick(): void {
    throw new Error("Method not implemented.");
  }
  public static calculateStandardStat(values: BaseStatValues): number {
    return (values.effectiveLevel + 9) * (values.bonus + 64);
  }
  public computeEvasion(): void {
    const evasion = {
      melee: Character.calculateStandardStat({
        effectiveLevel: this.levels.Defence,
        bonus: this.getMeleeDefenceBonus(),
      }),
      ranged: Character.calculateStandardStat({
        effectiveLevel: this.levels.Defence,
        bonus: this.getRangedDefenceBonus(),
      }),
      magic: Character.calculateStandardStat({
        effectiveLevel: this.levels.Defence,
        bonus: this.getMagicDefenceBonus(),
      }),
    };
    this.stats.evasion = evasion;
  }
  public getMeleeDefenceBonus(): number {
    return this.equipmentStats.meleeDefenceBonus;
  }
  public getRangedDefenceBonus(): number {
    return this.equipmentStats.rangedDefenceBonus;
  }
  public getMagicDefenceBonus(): number {
    return this.equipmentStats.magicDefenceBonus;
  }
  public computeAccuracy(): void {
    const accuracy = Character.calculateStandardStat(this.getAccuracyValue());
    this.stats.accuracy = accuracy;
  }
  public getAccuracyValue(): BaseStatValues {
    let effectiveLevel = 0;
    let bonus = 0;
    switch (this.attackType) {
      case "melee":
        effectiveLevel = this.levels.Attack;
        bonus = this.equipmentStats.meleeAttackBonus;
        break;
      case "ranged":
        effectiveLevel = this.levels.Ranged;
        bonus = this.equipmentStats.rangedAttackBonus;
        break;
      case "magic":
        effectiveLevel = this.levels.Magic;
        bonus = this.equipmentStats.magicAttackBonus;
        break;
    }
    return {
      effectiveLevel,
      bonus,
    };
  }
  public computeMinHit(): void {
    const minHit = 1;
    this.stats.minHit = minHit;
  }
  public computeMaxHit(): void {
    const maxHit = Character.calculateStandardMaxHit(this.getMaxHitValue());
    this.stats.maxHit = maxHit;
  }
  public getMaxHitValue(): BaseStatValues {
    let effectiveLevel = 0;
    let bonus = 0;
    switch (this.attackType) {
      case "melee":
        effectiveLevel = this.levels.Strength;
        bonus = this.equipmentStats.meleeStrengthBonus;
        break;

      case "ranged":
        effectiveLevel = this.levels.Strength;
        bonus = this.equipmentStats.rangedStrengthBonus;
        break;
      case "magic":
        effectiveLevel = this.levels.Strength;
        bonus = this.equipmentStats.magicDamageBonus;
        break;
    }
    return {
      effectiveLevel,
      bonus,
    };
  }
  public static calculateStandardMaxHit(values: BaseStatValues): number {
    return Math.floor(
      10 *
        (1.3 +
          (values.effectiveLevel + 9) / 10 +
          values.bonus / 80 +
          (values.effectiveLevel * values.bonus) / 640)
    );
  }
  public computeAttackInterval(): void {
    let attackInterval = this.equipmentStats.attackSpeed || 4000;
    attackInterval = roundToTickInterval(attackInterval);
    attackInterval = Math.max(attackInterval, 250);
    this.stats.attackInterval = attackInterval;
  }
  public computeDamageReduction(): void {
    let reduction = this.equipmentStats.damageReduction;
    reduction = Math.floor(reduction);
    this.stats.damageReduction = clampValue(reduction, 0, 95);
  }
  public computeStats(): void {
    this.computeEvasion();
    this.computeAccuracy();
    this.computeMaxHit();
    this.computeMinHit();
    this.computeAttackInterval();
    this.computeDamageReduction();
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

declare type Levels<T> = {
  Hitpoints: T;
  Attack: T;
  Strength: T;
  Defence: T;
  Ranged: T;
  Magic: T;
};

declare type BaseStatValues = {
  effectiveLevel: number;
  bonus: number;
};

declare type AttackType = "melee" | "ranged" | "magic";

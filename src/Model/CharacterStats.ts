export class CharacterStats {
  public evasion: Evasion<number> = {
    melee: 0,
    ranged: 0,
    magic: 0,
  };
  public accuracy = 0;
  public minHit = 0;
  public maxHit = 0;
  public attackInterval = 0;
  public damageReduction = 0;

  public get averageEvasion(): number {
    return (this.evasion.melee + this.evasion.ranged + this.evasion.magic) / 3;
  }
  public get maxEvasion(): number {
    return Math.max(
      this.evasion.melee,
      this.evasion.ranged,
      this.evasion.magic
    );
  }
}

declare type Evasion<T> = {
  melee: T;
  ranged: T;
  magic: T;
};

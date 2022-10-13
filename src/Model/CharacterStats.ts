export class CharacterStats {
  public evasion = new Evasion();
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

class Evasion {
  public melee = 0;
  public ranged = 0;
  public magic = 0;
}

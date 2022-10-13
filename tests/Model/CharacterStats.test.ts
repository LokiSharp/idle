import { CharacterStats } from "../../src/Model/CharacterStats";

test("averageEvasion", () => {
  const cs = new CharacterStats();
  cs.evasion.melee = 100;
  cs.evasion.ranged = 200;
  cs.evasion.magic = 300;
  expect(cs.averageEvasion).toBe(200);
});

test("maxEvasion", () => {
  const cs = new CharacterStats();
  cs.evasion.melee = 100;
  cs.evasion.ranged = 200;
  cs.evasion.magic = 300;
  expect(cs.maxEvasion).toBe(300);
});

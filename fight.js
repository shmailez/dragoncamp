import { 
    update, 
    text,
    xpText,
    monsterHealthText, 
    monsterStats,
    lose,
    winGame
} from "./script.js";
import { 
    monsterHealth, 
    fighting,
    health,
    xp,
    currentWeapon,
    gold, 
    inventory
} from "./constants.js";
import { 
    locations, 
    monsters, 
    weapons
} from "./db.js";

export function fightSlime() {
    fighting.fighting = 0;
    goFight();
}

export function fightBeast() {
    fighting.fighting = 1;
    goFight();
}

export function fightDragon() {
    fighting.fighting = 2;
    goFight();
}

export function goFight() {
    update(locations[3]);
    monsterHealth.monsterHealth = monsters[fighting.fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting.fighting].name;
    monsterHealthText.innerText = monsterHealth.monsterHealth;
}

export function attack() {
    text.innerText = "The " + monsters[fighting.fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon.currentWeapon].name + ".";
    health.health -= getMonsterAttackValue(monsters[fighting.fighting].level);
    if (isMonsterHit()) {
      monsterHealth.monsterHealth -= weapons[currentWeapon.currentWeapon].power + Math.floor(Math.random() * xp.xp) + 1;    
    } else {
      text.innerText += " You miss.";
    }
    healthText.innerText = health.health;
    monsterHealthText.innerText = monsterHealth.monsterHealth;
    if (health.health <= 0) {
      lose();
    } else if (monsterHealth.monsterHealth <= 0) {
      if (fighting.fighting === 2) {
        winGame();
      } else {
        defeatMonster();
      }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
      text.innerText += " Your " + inventory.pop() + " breaks.";
      currentWeapon.currentWeapon--;
    }
}
  
export function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp.xp));
    return hit > 0 ? hit : 0;
}

export function isMonsterHit() {
    return Math.random() > .2 || health.health < 20;
}

export function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting.fighting].name;
}
  
export function defeatMonster() {
    gold.gold += Math.floor(monsters[fighting.fighting].level * 6.7);
    xp.xp += monsters[fighting.fighting].level;
    goldText.innerText = gold.gold;
    xpText.innerText = xp.xp;
    update(locations[4]);
}
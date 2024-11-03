import { gold, health, currentWeapon, inventory } from "./constants.js";
import { weapons } from "./db.js";

export function buyHealth() {
    if (gold.gold >= 10) {
      gold.gold -= 10;
      health.health += 10;
      goldText.innerText = gold.gold;
      healthText.innerText = health.health;
    } else {
      text.innerText = "You do not have enough gold to buy health.";
    }
}  
  
export function buyWeapon() {
  if (currentWeapon.currentWeapon < weapons.length - 1) {
    if (gold.gold >= 30) {
      gold.gold -= 30;
      currentWeapon.currentWeapon++;
      goldText.innerText = gold.gold;
      let newWeapon = weapons[currentWeapon.currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory + " ";
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}
  
export function sellWeapon() {
  if (inventory.length > 1) {
    gold.gold += 15;
    goldText.innerText = gold.gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}
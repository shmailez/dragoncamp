import { weapons, monsters, locations }from "./db.js";
import { goStore, goTown, goCave } from "./moving.js";
import { buyHealth, buyWeapon, sellWeapon } from "./treading.js";
import { xp, health, gold, currentWeapon, fighting, monsterHealth } from "./constants.js";
import { fightSlime, fightBeast, fightDragon, goFight } from "./fight.js";

export const button1 = document.querySelector('#button1');
export const button2 = document.querySelector("#button2");
export const button3 = document.querySelector("#button3");

export const text = document.querySelector("#text");
export const xpText = document.querySelector("#xpText");
export const healthText = document.querySelector("#healthText");
export const goldText = document.querySelector("#goldText");
export const monsterStats = document.querySelector("#monsterStats");
export const monsterName = document.querySelector("#monsterName");
export const monsterHealthText = document.querySelector("#monsterHealth");

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

export function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

export function lose() {
  update(locations[5]);
}

export function winGame() {
  update(locations[6]);
}

export function restart() {
  xp.xp = 0;
  health.health = 100;
  gold.gold = 50;
  currentWeapon.currentWeapon = 0;
  let inventory = ['stick'];
  goldText.innerText = gold.gold;
  healthText.innerText = health.health;
  xpText.innerText = xp.xp;
  goTown();
}

export function easterEgg() {
  update(locations[7]);
}

export function pickTwo() {
  pick(2);
}

export function pickEight() {
  pick(8);
}

export function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold.gold += 20;
    goldText.innerText = gold.gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health.health -= 10;
    healthText.innerText = health.health;
    if (health.health <= 0) {
      lose();
    }
  }
}
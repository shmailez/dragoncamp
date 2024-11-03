import { 
  update
 } from "./script.js";
import { locations } from "./db.js";

export function goTown() {
  update(locations[0]);
}

export function goStore() {
  update(locations[1]);
}

export function goCave() {
  update(locations[2]);
}
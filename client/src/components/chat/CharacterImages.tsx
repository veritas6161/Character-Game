import { Character } from "@shared/schema";
import philosopherImg from "../../assets/philosopher.png";
import strategistImg from "../../assets/strategist.png";
import heroImg from "../../assets/hero.png";
import lonerImg from "../../assets/loner.png";
import tricksterImg from "../../assets/trickster.png";
import healerImg from "../../assets/healer.png";

interface CharacterImage {
  image: string;
  name: string;
  description: string;
}

export const characterImages: Record<Character, CharacterImage> = {
  philosopher: {
    image: philosopherImg,
    name: "The Cryptic Philosopher",
    description: "Speaks in riddles and inverted syntax. Wisdom wrapped in mystery."
  },
  strategist: {
    image: strategistImg,
    name: "The Eloquent Strategist",
    description: "Polished, witty, with dry sarcasm. Always thinking five steps ahead."
  },
  hero: {
    image: heroImg,
    name: "The Loud, Passionate Hero",
    description: "Shouts often, speaks in motivational bursts, always fired up with big emotions."
  },
  loner: {
    image: lonerImg,
    name: "The Deadpan Loner",
    description: "Minimalist, monotone speech in fragments. Low-energy delivery with high impact."
  },
  trickster: {
    image: tricksterImg,
    name: "The Theatrical Trickster",
    description: "Over-the-top, rhyming with dramatic flair. Mischief meets Shakespeare."
  },
  healer: {
    image: healerImg,
    name: "The Soft-Spoken Healer",
    description: "Whispery, compassionate, always positive, sometimes eerily ethereal."
  },
};

export function getCharacterImage(character?: Character | null): string {
  if (!character || !characterImages[character]) {
    // Default to loner as the default image
    return lonerImg;
  }
  return characterImages[character].image;
}

export function getCharacterInfo(character: Character): CharacterImage {
  return characterImages[character];
}
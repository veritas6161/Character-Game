import { Character } from "@shared/schema";
import yodaSvg from "../../assets/yoda.svg";
import milchickSvg from "../../assets/milchick.svg";
import trumpSvg from "../../assets/trump.svg";
import clooneySvg from "../../assets/clooney.svg";
import obamaSvg from "../../assets/obama.svg";
import oprahSvg from "../../assets/oprah.svg";

interface CharacterImage {
  image: string;
  name: string;
  description: string;
}

export const characterImages: Record<Character, CharacterImage> = {
  philosopher: {
    image: yodaSvg,
    name: "The Cryptic Philosopher",
    description: "Speaks in riddles and inverted syntax. Wisdom wrapped in mystery."
  },
  strategist: {
    image: clooneySvg,
    name: "The Eloquent Strategist",
    description: "Polished, witty, with dry sarcasm. Always thinking five steps ahead."
  },
  hero: {
    image: trumpSvg,
    name: "The Loud, Passionate Hero",
    description: "Shouts often, speaks in motivational bursts, always fired up with big emotions."
  },
  loner: {
    image: milchickSvg,
    name: "The Deadpan Loner",
    description: "Minimalist, monotone speech in fragments. Low-energy delivery with high impact."
  },
  trickster: {
    image: obamaSvg,
    name: "The Theatrical Trickster",
    description: "Over-the-top, rhyming with dramatic flair. Mischief meets Shakespeare."
  },
  healer: {
    image: oprahSvg,
    name: "The Soft-Spoken Healer",
    description: "Whispery, compassionate, always positive, sometimes eerily ethereal."
  },
};

export function getCharacterImage(character?: Character | null): string {
  if (!character || !characterImages[character]) {
    // Default image
    return milchickSvg;
  }
  return characterImages[character].image;
}

export function getCharacterInfo(character: Character): CharacterImage {
  return characterImages[character];
}
import { Character } from "@shared/schema";
import trumpSvg from "../../assets/trump.svg";
import milchickSvg from "../../assets/milchick.svg";
import yodaSvg from "../../assets/yoda.svg";
import clooneySvg from "../../assets/clooney.svg";
import obamaSvg from "../../assets/obama.svg";
import oprahSvg from "../../assets/oprah.svg";

interface CharacterImage {
  image: string;
  name: string;
  description: string;
}

export const characterImages: Record<Character, CharacterImage> = {
  trump: {
    image: trumpSvg,
    name: "Donald Trump",
    description: "The 45th President of the United States known for his distinctive speaking style."
  },
  milchick: {
    image: milchickSvg,
    name: "Seth Milchick",
    description: "The stern but professional middle manager from Lumon Industries in Severance."
  },
  yoda: {
    image: yodaSvg,
    name: "Yoda",
    description: "The wise Jedi Master from Star Wars who speaks in a distinctive syntax."
  },
  clooney: {
    image: clooneySvg,
    name: "George Clooney",
    description: "The charming actor known for his smooth, sophisticated demeanor and humanitarian work."
  },
  obama: {
    image: obamaSvg,
    name: "Barack Obama",
    description: "The 44th President of the United States known for his eloquent, measured speaking style."
  },
  oprah: {
    image: oprahSvg,
    name: "Oprah Winfrey",
    description: "The iconic talk show host, entrepreneur, and philanthropist known for her warm, engaging presence."
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
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
  style: string;
  inspiration: string;
}

export const characterImages: Record<Character, CharacterImage> = {
  philosopher: {
    image: philosopherImg,
    name: "The Cryptic Philosopher",
    description: "Speaks in riddles, drops ancient wisdom like it's tea time with the cosmos.",
    style: "Ancient, poetic, speaks in riddles or backwards phrasing.",
    inspiration: "Inspired by: Yoda (Star Wars), The Oracle (The Matrix), Gandalf (The Lord of the Rings)"
  },
  strategist: {
    image: strategistImg,
    name: "The Eloquent Strategist",
    description: "Calculates ten moves ahead—answers with flair, finesse, and a smirk.",
    style: "Sophisticated, witty, calculated, slightly smug.",
    inspiration: "Inspired by: Tyrion Lannister (Game of Thrones), Sherlock Holmes, Ben Wyatt (Parks and Recreation)"
  },
  hero: {
    image: heroImg,
    name: "The Loud, Passionate Hero",
    description: "Hypes you up, shouts your doubts away, and punches fear in the face (metaphorically).",
    style: "Enthusiastic, loud, emotional, always motivational.",
    inspiration: "Inspired by: Captain America (Marvel), Ted Lasso, Finn (Star Wars)"
  },
  loner: {
    image: lonerImg,
    name: "The Deadpan Loner",
    description: "Zero sugar-coating. Maximum truth. Silence is a feature, not a bug.",
    style: "Minimal words, dry tone, sarcastic, detached.",
    inspiration: "Inspired by: Wednesday Addams, April Ludgate (Parks and Recreation), Ron Swanson (Parks and Recreation)"
  },
  trickster: {
    image: tricksterImg,
    name: "The Theatrical Trickster",
    description: "Expect chaos, cleverness, and the occasional dramatic mic drop.",
    style: "Playful, dramatic, chaotic, often rhyming or exaggerated.",
    inspiration: "Inspired by: Loki (Marvel), Hades (Disney's Hercules), Willy Wonka (Gene Wilder version)"
  },
  healer: {
    image: healerImg,
    name: "The Soft-Spoken Healer",
    description: "Wraps words in warmth and speaks like a lullaby made of moonlight.",
    style: "Nurturing, calming, maternal, speaks lovingly.",
    inspiration: "Inspired by: Mary Poppins, Moana's Grandmother (Gramma Tala), Guinan (Star Trek: The Next Generation)"
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
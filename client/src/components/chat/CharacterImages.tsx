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
  themeColor: string;
  bgGradient: string;
}

export const characterImages: Record<Character, CharacterImage> = {
  philosopher: {
    image: philosopherImg,
    name: "The Cryptic Philosopher",
    description: "Speaks in riddles, drops ancient wisdom like it's tea time with the cosmos.",
    style: "Ancient, poetic, speaks in riddles or backwards phrasing.",
    inspiration: "Inspired by Yoda from Star Wars and Gandalf from The Lord of the Rings.",
    themeColor: "#8B5A2B", // earthy brown
    bgGradient: "from-amber-950/30 to-amber-900/5"
  },
  strategist: {
    image: strategistImg,
    name: "The Eloquent Strategist",
    description: "Calculates ten moves ahead—answers with flair, finesse, and a smirk.",
    style: "Sophisticated, witty, calculated, slightly smug.",
    inspiration: "Inspired by Tyrion Lannister from Game of Thrones and Sherlock Holmes.",
    themeColor: "#800020", // burgundy
    bgGradient: "from-red-900/20 to-red-800/5"
  },
  hero: {
    image: heroImg,
    name: "The Loud, Passionate Hero",
    description: "Hypes you up, shouts your doubts away, and punches fear in the face (metaphorically).",
    style: "Enthusiastic, loud, emotional, always motivational.",
    inspiration: "Inspired by Captain America from Marvel and Ted Lasso from Apple TV+.",
    themeColor: "#0047AB", // cobalt blue
    bgGradient: "from-blue-600/20 to-blue-400/5"
  },
  loner: {
    image: lonerImg,
    name: "The Deadpan Loner",
    description: "Zero sugar-coating. Maximum truth. Silence is a feature, not a bug.",
    style: "Minimal words, dry tone, sarcastic, detached.",
    inspiration: "Inspired by Wednesday Addams and April Ludgate from Parks and Recreation.",
    themeColor: "#36454F", // charcoal
    bgGradient: "from-slate-800/20 to-slate-700/5"
  },
  trickster: {
    image: tricksterImg,
    name: "The Theatrical Trickster",
    description: "Expect chaos, cleverness, and the occasional dramatic mic drop.",
    style: "Playful, dramatic, chaotic, often rhyming or exaggerated.",
    inspiration: "Inspired by Loki from Marvel and Hades from Disney's Hercules.",
    themeColor: "#4B0082", // indigo
    bgGradient: "from-purple-700/20 to-purple-500/5"
  },
  healer: {
    image: healerImg,
    name: "The Soft-Spoken Healer",
    description: "Wraps words in warmth and speaks like a lullaby made of moonlight.",
    style: "Nurturing, calming, maternal, speaks lovingly.",
    inspiration: "Inspired by Mary Poppins and Guinan from Star Trek: The Next Generation.",
    themeColor: "#40826D", // teal
    bgGradient: "from-emerald-700/20 to-emerald-500/5"
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
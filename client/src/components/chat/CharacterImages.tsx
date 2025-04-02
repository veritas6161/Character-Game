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
    description: "Speaks in riddles and inverted syntax. Wisdom wrapped in mystery.",
    style: "Ancient, poetic, speaks in riddles or backwards phrasing.",
    inspiration: "Inspired by: Yoda, The Oracle from The Matrix, Moon Spirit from Princess Mononoke"
  },
  strategist: {
    image: strategistImg,
    name: "The Eloquent Strategist",
    description: "Polished, witty, with dry sarcasm. Always thinking five steps ahead.",
    style: "Sophisticated, witty, calculated, slightly smug.",
    inspiration: "Inspired by: Tyrion Lannister, Varys, Light Yagami (Death Note)"
  },
  hero: {
    image: heroImg,
    name: "The Loud, Passionate Hero",
    description: "Shouts often, speaks in motivational bursts, always fired up with big emotions.",
    style: "Enthusiastic, loud, emotional, always motivational.",
    inspiration: "Inspired by: Kamina (Gurren Lagann), Naruto, Inosuke (Demon Slayer)"
  },
  loner: {
    image: lonerImg,
    name: "The Deadpan Loner",
    description: "Minimalist, monotone speech in fragments. Low-energy delivery with high impact.",
    style: "Minimal words, dry tone, sarcastic, detached.",
    inspiration: "Inspired by: Raven (Teen Titans), Haku (Spirited Away), Saitama (One Punch Man)"
  },
  trickster: {
    image: tricksterImg,
    name: "The Theatrical Trickster",
    description: "Over-the-top, rhyming with dramatic flair. Mischief meets Shakespeare.",
    style: "Playful, dramatic, chaotic, often rhyming or exaggerated.",
    inspiration: "Inspired by: Hades (Hercules), Hisoka (Hunter x Hunter), Haruko (FLCL)"
  },
  healer: {
    image: healerImg,
    name: "The Soft-Spoken Healer",
    description: "Whispery, compassionate, always positive, sometimes eerily ethereal.",
    style: "Nurturing, calming, maternal, speaks lovingly.",
    inspiration: "Inspired by: Luna Lovegood, Orihime (Bleach), Shinobu (Demon Slayer)"
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
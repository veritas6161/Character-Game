import React from "react";
import { Character, characterTypes } from "@shared/schema";
import { getCharacterImage, characterImages } from "./CharacterImages";

interface CharacterCardProps {
  character: Character;
  name: string;
  description: string;
  image: string;
  selected: boolean;
  onSelect: () => void;
}

const CharacterCard = ({ character, name, description, image, selected, onSelect }: CharacterCardProps) => {
  return (
    <div 
      className={`p-6 border rounded-lg cursor-pointer transition-all overflow-hidden ${
        selected 
          ? "border-primary bg-primary/10 shadow-md" 
          : "border-border hover:border-primary/50 hover:shadow-sm"
      }`}
      onClick={onSelect}
    >
      <div className="flex flex-col items-center mb-4">
        <div className="w-32 h-32 mb-4 rounded-lg overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center justify-between w-full mb-2">
          <h3 className="text-xl font-bold">{name}</h3>
          {selected && (
            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )}
        </div>
      </div>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  );
};

interface CharacterSelectionProps {
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
}

export default function CharacterSelection({ 
  selectedCharacter, 
  onSelectCharacter 
}: CharacterSelectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose a Character</h2>
        <p className="text-muted-foreground">Select a personality to chat with</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {characterTypes.map((character) => (
          <CharacterCard
            key={character}
            character={character}
            name={characterImages[character].name}
            description={characterImages[character].description}
            image={characterImages[character].image}
            selected={selectedCharacter === character}
            onSelect={() => onSelectCharacter(character)}
          />
        ))}
      </div>
    </div>
  );
}
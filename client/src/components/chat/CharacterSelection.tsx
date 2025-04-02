import React from "react";
import { Character, characterTypes } from "@shared/schema";
import { getCharacterImage, characterImages } from "./CharacterImages";

interface CharacterCardProps {
  character: Character;
  name: string;
  description: string;
  style: string;
  inspiration: string;
  image: string;
  themeColor: string;
  bgGradient: string;
  selected: boolean;
  onSelect: () => void;
}

const CharacterCard = ({ 
  character, 
  name, 
  description, 
  style, 
  inspiration, 
  image, 
  themeColor,
  bgGradient,
  selected, 
  onSelect 
}: CharacterCardProps) => {
  return (
    <div 
      className={`relative p-6 border rounded-xl cursor-pointer transition-all duration-300 overflow-hidden ${
        selected 
          ? `bg-gradient-to-b ${bgGradient} shadow-lg` 
          : `border-border hover:shadow-md`
      }`}
      style={{
        borderColor: selected ? themeColor : undefined,
        boxShadow: selected ? `0 8px 24px rgba(0,0,0,0.12), 0 0 0 2px ${themeColor}30` : undefined,
        background: selected 
          ? undefined 
          : `linear-gradient(to bottom, ${themeColor}05, transparent)`,
        transform: selected ? 'translateY(-2px)' : undefined
      }}
      onClick={onSelect}
    >
      <div className="flex flex-col items-center">
        <div 
          className="w-36 h-36 mb-5 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105" 
          style={{ 
            boxShadow: `0 4px 14px ${themeColor}25` 
          }}
        >
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        
        <div className="w-full text-center mb-4">
          <h3 
            className="text-xl font-bold mb-1 bg-clip-text text-transparent inline-block" 
            style={{ 
              backgroundImage: `linear-gradient(to right, ${themeColor}, ${themeColor}90)` 
            }}
          >
            {name}
          </h3>
          
          {selected && (
            <div className="absolute top-3 right-3 h-7 w-7 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: themeColor }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )}
          
          <p 
            className="mt-3 mb-3 font-medium p-3 rounded-lg leading-tight" 
            style={{ 
              backgroundColor: `${themeColor}15`, 
              color: themeColor 
            }}
          >
            {description}
          </p>
          
          <p className="text-xs text-muted-foreground italic">{inspiration}</p>
        </div>
      </div>
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
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Choose a Character
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Select a unique AI personality to engage with in conversation
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {characterTypes.map((character) => (
          <CharacterCard
            key={character}
            character={character}
            name={characterImages[character].name}
            description={characterImages[character].description}
            style={characterImages[character].style}
            inspiration={characterImages[character].inspiration}
            image={characterImages[character].image}
            themeColor={characterImages[character].themeColor || "#6366f1"} 
            bgGradient={characterImages[character].bgGradient || "from-indigo-500/20 to-indigo-400/5"}
            selected={selectedCharacter === character}
            onSelect={() => onSelectCharacter(character)}
          />
        ))}
      </div>
    </div>
  );
}
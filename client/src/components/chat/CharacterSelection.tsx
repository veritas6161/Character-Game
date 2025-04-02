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
      className={`relative rounded-xl cursor-pointer transition-all duration-300 overflow-hidden ${
        selected ? 'shadow-lg' : 'shadow-md hover:shadow-lg'
      }`}
      style={{
        boxShadow: selected ? `0 8px 24px rgba(0,0,0,0.15), 0 0 0 2px ${themeColor}60` : undefined,
        transform: selected ? 'translateY(-2px)' : undefined,
        background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}05)`,
        borderTop: `3px solid ${themeColor}`,
        borderBottom: `3px solid ${themeColor}`
      }}
      onClick={onSelect}
    >
      {/* Decorative diagonal pattern */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 100 M100 0 L0 100' stroke='${themeColor.replace('#', '%23')}' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Left vertical accent line */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1.5" 
        style={{ backgroundColor: themeColor }}
      />

      {/* Right vertical accent line */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-1.5" 
        style={{ backgroundColor: themeColor }}
      />

      {/* Content container */}
      <div className="p-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Image container */}
          <div 
            className="w-36 h-36 mb-5 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105" 
            style={{ 
              boxShadow: `0 4px 14px ${themeColor}40` 
            }}
          >
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          
          {/* Text content */}
          <div className="w-full text-center mb-2">
            <h3 
              className="text-xl font-bold mb-1 bg-clip-text text-transparent inline-block" 
              style={{ 
                backgroundImage: `linear-gradient(to right, ${themeColor}, ${themeColor}80)`,
                filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))'
              }}
            >
              {name}
            </h3>
            
            {selected && (
              <div 
                className="absolute top-3 right-3 h-7 w-7 rounded-full flex items-center justify-center text-white shadow-md" 
                style={{ backgroundColor: themeColor }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
            
            <div 
              className="mt-3 mb-3 p-3 rounded-lg" 
              style={{ 
                backgroundColor: `${themeColor}20`,
                boxShadow: `inset 0 0 0 1px ${themeColor}30`
              }}
            >
              <p className="font-medium" style={{ color: themeColor }}>
                {description}
              </p>
            </div>
            
            <p className="text-xs text-muted-foreground italic">{inspiration}</p>
          </div>
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
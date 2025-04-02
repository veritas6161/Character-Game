import { Character } from "@shared/schema";
import { characterImages, getCharacterImage } from "./CharacterImages";

interface ChatHeaderProps {
  onClearChat: () => void;
  character?: Character | null;
  onChangeCharacter?: () => void;
}

export default function ChatHeader({ 
  onClearChat, 
  character, 
  onChangeCharacter 
}: ChatHeaderProps) {
  return (
    <header className="border-b border-muted p-4 bg-muted/30">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {character && (
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-primary/20 shadow-sm">
              <img 
                src={getCharacterImage(character)} 
                alt={characterImages[character].name}
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          <h1 className="text-xl font-semibold">
            {character && characterImages[character]
              ? characterImages[character].name
              : "Character Chat"
            }
          </h1>
        </div>
        <div className="flex gap-2">
          {character && onChangeCharacter && (
            <button
              onClick={onChangeCharacter}
              className="text-sm px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Change character
            </button>
          )}
          <button 
            onClick={onClearChat}
            className="text-sm px-3 py-1.5 rounded-md bg-secondary hover:bg-muted transition-colors"
          >
            Clear chat
          </button>
        </div>
      </div>
    </header>
  );
}

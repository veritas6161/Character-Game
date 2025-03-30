import { Character } from "@shared/schema";

interface ChatHeaderProps {
  onClearChat: () => void;
  character?: Character | null;
  onChangeCharacter?: () => void;
}

const characterNames: Record<Character, string> = {
  trump: "Donald Trump",
  milchick: "Seth Milchick",
  yoda: "Yoda"
};

export default function ChatHeader({ 
  onClearChat, 
  character, 
  onChangeCharacter 
}: ChatHeaderProps) {
  return (
    <header className="border-b border-muted p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold">
          {character 
            ? `Chat with ${characterNames[character]}` 
            : "Character Chat"
          }
        </h1>
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

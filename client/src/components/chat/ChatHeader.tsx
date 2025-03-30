interface ChatHeaderProps {
  onClearChat: () => void;
}

export default function ChatHeader({ onClearChat }: ChatHeaderProps) {
  return (
    <header className="border-b border-muted p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
        <button 
          onClick={onClearChat}
          className="text-sm px-3 py-1.5 rounded-md bg-secondary hover:bg-muted transition-colors"
        >
          Clear chat
        </button>
      </div>
    </header>
  );
}

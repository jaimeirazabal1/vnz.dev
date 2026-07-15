export default function MessagesPage() {
  return (
    <div className="flex h-full">
      {/* Conversations list */}
      <div className="w-72 border-r border-border overflow-auto">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">Messages</h2>
        </div>
        <div className="divide-y divide-border">
          {[
            { name: "Maria Garcia", preview: "Sure, I can start next week", time: "2h ago", unread: true },
            { name: "Carlos Mendez", preview: "The deployment looks good", time: "5h ago", unread: false },
            { name: "Ana Rodriguez", preview: "Let me check the designs", time: "1d ago", unread: false },
          ].map((conv) => (
            <button
              key={conv.name}
              className="w-full text-left p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-medium ${conv.unread ? "text-foreground" : "text-muted-foreground"}`}>
                  {conv.name}
                </span>
                <span className="text-xs text-muted-foreground">{conv.time}</span>
              </div>
              <p className={`text-sm truncate ${conv.unread ? "text-foreground" : "text-muted-foreground"}`}>
                {conv.preview}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
        <p className="text-lg">Select a conversation to start messaging</p>
      </div>
    </div>
  );
}

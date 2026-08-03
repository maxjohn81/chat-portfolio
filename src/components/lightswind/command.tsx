import * as React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "./dialog";
import { Search, Loader2 } from "lucide-react";

interface CommandContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  visibleItemCount: number;
  registerItem: (id: string, text: string) => void;
  unregisterItem: (id: string) => void;
  setItemVisible: (id: string, visible: boolean) => void;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  itemIds: string[];
}

const CommandContext = React.createContext<CommandContextType | undefined>(
  undefined
);

function useCommand() {
  const context = React.useContext(CommandContext);
  if (!context) {
    throw new Error("useCommand must be used within a Command component");
  }
  return context;
}

interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  emptyMessage?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  (
    {
      className,
      isLoading = false,
      emptyMessage = "No results found.",
      value: controlledValue,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledQuery, setUncontrolledQuery] = React.useState("");
    const isControlled = controlledValue !== undefined;
    const searchQuery = isControlled ? controlledValue : uncontrolledQuery;

    const setSearchQuery = React.useCallback(
      (q: string) => {
        if (!isControlled) {
          setUncontrolledQuery(q);
        }
        onValueChange?.(q);
      },
      [isControlled, onValueChange]
    );

    const [itemsMap, setItemsMap] = React.useState<Map<string, { text: string; visible: boolean }>>(new Map());
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const registerItem = React.useCallback((id: string, text: string) => {
      setItemsMap((prev) => {
        const next = new Map(prev);
        next.set(id, { text, visible: true });
        return next;
      });
    }, []);

    const unregisterItem = React.useCallback((id: string) => {
      setItemsMap((prev) => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
    }, []);

    const setItemVisible = React.useCallback((id: string, visible: boolean) => {
      setItemsMap((prev) => {
        const existing = prev.get(id);
        if (!existing || existing.visible === visible) return prev;
        const next = new Map(prev);
        next.set(id, { ...existing, visible });
        return next;
      });
    }, []);

    const visibleItems = React.useMemo(() => {
      const list: string[] = [];
      itemsMap.forEach((val, id) => {
        if (val.visible) list.push(id);
      });
      return list;
    }, [itemsMap]);

    const visibleItemCount = visibleItems.length;

    // Reset selection when query changes
    React.useEffect(() => {
      setSelectedIndex(0);
    }, [searchQuery]);

    return (
      <CommandContext.Provider
        value={{
          searchQuery,
          setSearchQuery,
          isLoading,
          emptyMessage,
          visibleItemCount,
          registerItem,
          unregisterItem,
          setItemVisible,
          selectedIndex,
          setSelectedIndex,
          itemIds: visibleItems,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-popover text-popover-foreground shadow-2xl backdrop-blur-xl transition-all duration-300",
            "[.lw-3d_&]:bg-gradient-to-b [.lw-3d_&]:from-white [.lw-3d_&]:to-zinc-50/95 dark:[.lw-3d_&]:from-zinc-900 dark:[.lw-3d_&]:to-zinc-950",
            "[.lw-3d_&]:border-black/10 dark:[.lw-3d_&]:border-white/10",
            "[.lw-3d_&]:shadow-[inset_0_1.5px_0_0_rgba(255,255,255,0.45),0_16px_32px_-8px_rgba(0,0,0,0.1)]",
            "dark:[.lw-3d_&]:shadow-[inset_0_1.5px_0_0_rgba(255,255,255,0.15),0_16px_32px_-8px_rgba(0,0,0,0.4)]",
            className
          )}
          {...props}
          cmdk-root=""
        >
          {children}
        </div>
      </CommandContext.Provider>
    );
  }
);
Command.displayName = "Command";

interface CommandDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const CommandDialog: React.FC<CommandDialogProps> = ({
  children,
  open,
  onOpenChange,
  className,
}) => {
  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange?.(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "overflow-hidden p-0 shadow-2xl border-zinc-200/80 dark:border-zinc-800/80 bg-background/95 backdrop-blur-2xl max-w-2xl sm:max-w-2xl rounded-2xl z-[70] transition-all duration-300",
          className
        )}
        onClick={handleDialogClick}
      >
        <Command className="border-none shadow-none bg-transparent">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

interface CommandInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
  isLoading?: boolean;
}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  (
    { className, onValueChange, isLoading: controlledLoading, ...props },
    ref
  ) => {
    const { searchQuery, setSearchQuery, isLoading: contextLoading, itemIds, selectedIndex, setSelectedIndex } = useCommand();
    const isLoading = controlledLoading !== undefined ? controlledLoading : contextLoading;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      if (onValueChange) onValueChange(q);
      else setSearchQuery(q);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (itemIds.length > 0 ? (prev + 1) % itemIds.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (itemIds.length > 0 ? (prev - 1 + itemIds.length) % itemIds.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (itemIds.length > 0 && itemIds[selectedIndex]) {
          const activeEl = document.querySelector(`[data-cmdk-id="${itemIds[selectedIndex]}"]`) as HTMLElement;
          if (activeEl) activeEl.click();
        }
      }
    };

    return (
      <div className="flex items-center border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 py-1" cmdk-input-wrapper="">
        {isLoading ? (
          <Loader2 className="mr-3 h-4 w-4 animate-spin text-indigo-500 shrink-0" />
        ) : (
          <Search className="mr-3 h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <input
          ref={ref}
          value={props.value !== undefined ? props.value : searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex h-11 w-full rounded-md bg-transparent py-3 text-sm border-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          placeholder={props.placeholder || "Type a command or search..."}
          cmdk-input=""
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          {...props}
        />
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-medium text-muted-foreground bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700">
          ESC
        </kbd>
      </div>
    );
  }
);
CommandInput.displayName = "CommandInput";

interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, isLoading: controlledLoading, children, ...props }, ref) => {
    const { isLoading: contextLoading } = useCommand();
    const isLoading = controlledLoading !== undefined ? controlledLoading : contextLoading;

    return (
      <div
        ref={ref}
        className={cn(
          "max-h-[340px] overflow-y-auto overflow-x-hidden p-2 space-y-1",
          className
        )}
        data-lenis-prevent
        {...props}
      >
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
          </div>
        )}
        {!isLoading && children}
      </div>
    );
  }
);
CommandList.displayName = "CommandList";

interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> { }

const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  (props, ref) => {
    const { visibleItemCount, emptyMessage } = useCommand();

    if (visibleItemCount > 0) return null;

    return (
      <div
        ref={ref}
        className="py-10 text-center text-xs font-medium text-muted-foreground space-y-1"
        {...props}
      >
        <Search className="w-5 h-5 mx-auto opacity-40 mb-1" />
        <p>{props.children || emptyMessage || "No results found."}</p>
      </div>
    );
  }
);
CommandEmpty.displayName = "CommandEmpty";

interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  title?: string;
}

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, title, children, ...props }, ref) => {
    const displayHeading = heading || title;

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden py-1 text-foreground [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/70",
          className
        )}
        {...props}
      >
        {displayHeading && <div cmdk-group-heading="">{displayHeading}</div>}
        <div className="space-y-0.5">{children}</div>
      </div>
    );
  }
);
CommandGroup.displayName = "CommandGroup";

interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> { }

const CommandSeparator = React.forwardRef<
  HTMLDivElement,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("-mx-2 my-1.5 h-px bg-zinc-200/60 dark:bg-zinc-800/60", className)} {...props} />
));
CommandSeparator.displayName = "CommandSeparator";

interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  onSelect?: () => void;
  value?: string;
  keywords?: string[];
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, disabled, onSelect, value, keywords, children, ...props }, ref) => {
    const { searchQuery, registerItem, unregisterItem, setItemVisible, itemIds, selectedIndex, setSelectedIndex } = useCommand();
    const itemId = React.useId();

    const textToMatch = React.useMemo(() => {
      let result = value || "";
      if (typeof children === "string" || typeof children === "number") {
        result += " " + children;
      } else if (Array.isArray(children)) {
        children.forEach((c) => {
          if (typeof c === "string" || typeof c === "number") result += " " + c;
        });
      }
      if (keywords) {
        result += " " + keywords.join(" ");
      }
      return result.toLowerCase();
    }, [value, children, keywords]);

    const isMatch = React.useMemo(() => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase().trim();
      return textToMatch.includes(q);
    }, [searchQuery, textToMatch]);

    React.useEffect(() => {
      registerItem(itemId, textToMatch);
      return () => unregisterItem(itemId);
    }, [itemId, textToMatch, registerItem, unregisterItem]);

    React.useEffect(() => {
      setItemVisible(itemId, isMatch);
    }, [itemId, isMatch, setItemVisible]);

    if (!isMatch) return null;

    const isFocused = itemIds[selectedIndex] === itemId;

    return (
      <div
        ref={ref}
        data-cmdk-id={itemId}
        className={cn(
          "relative flex cursor-pointer select-none items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium outline-none transition-all duration-150",
          "hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800/80",
          isFocused && "bg-zinc-100 text-foreground dark:bg-zinc-800/80 font-semibold",
          disabled && "pointer-events-none opacity-40",
          className
        )}
        data-disabled={disabled ? "true" : undefined}
        data-selected={isFocused ? "true" : undefined}
        onMouseEnter={() => {
          const idx = itemIds.indexOf(itemId);
          if (idx !== -1) setSelectedIndex(idx);
        }}
        onClick={() => {
          if (!disabled && onSelect) {
            onSelect();
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CommandItem.displayName = "CommandItem";

interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> { }

const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => {
  return (
    <span
      className={cn(
        "ml-auto text-[10px] font-mono font-medium tracking-widest text-muted-foreground/70 bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 px-1.5 py-0.5 rounded-md",
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

interface CommandBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "indigo" | "emerald" | "amber" | "rose";
}

const CommandBadge = ({ className, variant = "default", ...props }: CommandBadgeProps) => {
  const variantStyles = {
    default: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
    indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  };

  return (
    <span
      className={cn(
        "ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full border",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};
CommandBadge.displayName = "CommandBadge";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandBadge,
  CommandSeparator,
};

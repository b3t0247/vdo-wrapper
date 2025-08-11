import { useState } from "react";

export function useClipboard() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return { copiedKey, copy };
}

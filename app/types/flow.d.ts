export type Option = {
  label: string;
  nextId: string;
  variant?: "primary" | "secondary";
};

export type AccordionItem = {
  id: string;
  title: string;
  content: string;
  autoAdvanceOnOpen?: boolean;
};

export type Node = {
  id: string;
  title: string;
  body?: string;
  question?: string;
  options?: Option[];
  accordion?: AccordionItem[];
  slideHint?: string;
  view?: "default" | "rcp-timer" | "recovery";
};

export type Flow = {
  startId: string;
  nodes: Record<string, Node>;
};

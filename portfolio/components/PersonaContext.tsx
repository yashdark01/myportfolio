"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Persona } from "@/data/site";

interface PersonaContextValue {
  persona: Persona;
  setPersona: (persona: Persona) => void;
}

const PersonaContext = createContext<PersonaContextValue | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>("product");

  const setPersona = useCallback((next: Persona) => {
    setPersonaState(next);
  }, []);

  const value = useMemo(
    () => ({ persona, setPersona }),
    [persona, setPersona],
  );

  return (
    <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error("usePersona must be used within PersonaProvider");
  }
  return context;
}

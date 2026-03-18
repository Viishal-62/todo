# React Context (`useContext`) vs Zustand

When building a React Native (or React) app, state management is a crucial decision. Here is a detailed comparison between the built-in React Context API and the Zustand library.

## 1. Overview

**React Context (`useContext`)**
- Built directly into React. No extra libraries to install.
- Great for dependency injection (like themes, auth state, language settings).
- Designed to pass data deeply into the tree without "prop drilling".

**Zustand**
- A small, fast, and scalable bearbones state-management solution.
- Uses a simplified Flux pattern (like Redux but without the boilerplate).
- Hook-based API that can be used anywhere, even outside of React components.

---

## 2. Boilerplate & Setup

### React Context
Requires a lot of boilerplate. You need to:
1. Create the context.
2. Create a Provider component.
3. Set up inner state (usually with `useState` or `useReducer`).
4. Wrap your app (or part of it) with the Provider.
5. Create a custom hook to consume the context.

```typescript
// Context setup example
import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Must be used within ThemeProvider");
  return context;
};

// Usage (Requires app to be wrapped in <ThemeProvider>):
// const { theme, toggleTheme } = useThemeContext();
```

### Zustand
Incredibly minimal. You just create a hook and you are done. No Providers needed!

```typescript
// Zustand setup example
import { create } from 'zustand';

interface StoreState {
  count: number;
  increment: () => void;
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Usage in any component (No Provider needed!):
// const { count, increment } = useStore();
```

---

## 3. Performance & Re-renders (The Biggest Difference)

### React Context (Lower Performance for Frequent Updates)
When the value of a Context changes, **every single component that consumes that context re-renders**, even if they don't use the specific piece of data that changed.
- If you have `{ theme, user, settings }` in one Context, and the `theme` changes, components that only care about `user` will still re-render.
- **Fix:** You have to split your state into multiple Contexts (e.g., `ThemeProvider`, `AuthProvider`), leading to "Provider Hell" (deeply nested providers in `_layout.tsx`).

### Zustand (High Performance)
Zustand allows components to "subscribe" only to the specific pieces of state they care about using selectors.
- If a component only needs `count`, it won't re-render if a different state like `user` changes.

```typescript
// Only re-renders if 'count' changes. Ignores other state updates!
const count = useStore((state) => state.count); 
```

---

## 4. Async Actions & Side Effects

**React Context**
You handle async actions exactly as you would in standard React components (inside `useEffect` or utility functions defined inside the Provider).

**Zustand**
Async actions are supported out of the box. You can just write `async/await` functions directly inside your Zustand store definition.

```typescript
export const useAuthStore = create((set) => ({
  user: null,
  login: async (credentials) => {
    const response = await api.login(credentials);
    set({ user: response.data });
  }
}));
```

---

## 5. Outside of React Components

**React Context**
Cannot be used outside of React components. If you want to access the theme or token in a plain JavaScript/TypeScript utility file (like an Axios interceptor), you can't use Context.

**Zustand**
Can easily be read from or written to completely outside of the React lifecycle!

```typescript
import { useStore } from './store';

// Outside any React component:
const currentState = useStore.getState();
useStore.setState({ count: 5 });
```

---

## Summary: Which Should You Choose?

| Feature | React Context | Zustand |
| :--- | :--- | :--- |
| **Installation** | Built-in (0 bytes) | Tiny library (~1.1kb) |
| **Setup** | High boilerplate | Extremely minimal |
| **Providers Required?**| Yes (can lead to deep nesting) | No |
| **Performance** | Causes unnecessary re-renders | Excellent (uses selectors) |
| **Outside React** | ❌ No | ✅ Yes (`.getState()`) |
| **Best suited for** | Low-frequency updates (Theme, Auth configs) | Global app state, frequent updates |

**Recommendation for your Native app:**
- Continue using **Context** for your `useTheme` if it only handles Light/Dark mode, since themes rarely change and wrapping the app makes sense.
- Use **Zustand** if you need to manage global application state (like the actual `Todos` list, user profiles, or shopping carts) because it drastically reduces boilerplate and ensures your app stays fast.

# ✅ Todo App — React Native + Convex

A modern, aesthetic todo application built with **React Native (Expo)** and **Convex** as the real-time backend. Features a polished UI with gradient cards, dark/light mode, and full CRUD functionality — runs on **Web**, **Android** & **iOS**.

---

## 📸 Screenshots

 

 
| ![banner](assets/images/banner.png) |  

---

## ✨ Features

- **Add, Edit, Delete** todos with real-time sync
- **Toggle completion** with animated gradient checkboxes
- **Filter tabs** — All / Active / Done
- **Progress bar** showing completion percentage
- **Dark / Light mode** with persistent theme preference
- **Clear completed** or **Clear all** todos from settings
- **Statistics** — total, completed, remaining counts
- **Custom confirmation modals** — works on both web & mobile
- **Real-time backend** — powered by Convex (no REST APIs needed)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (SDK 54) |
| Routing | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based) |
| Backend | [Convex](https://www.convex.dev/) (real-time BaaS) |
| Styling | `StyleSheet` + `expo-linear-gradient` |
| Icons | `@expo/vector-icons` (FontAwesome) |
| Storage | `@react-native-async-storage/async-storage` (theme persistence) |

---

## 📁 Project Structure

```
todo/
├── app/
│   ├── _layout.tsx            # Root layout (Convex + Theme providers)
│   └── (tabs)/
│       ├── _layout.tsx        # Tab bar configuration
│       ├── index.tsx          # Todos screen
│       └── settings.tsx       # Settings screen
├── components/
│   ├── AllTodos.tsx           # Todo list with filters
│   ├── Button.tsx             # Gradient add button
│   ├── ConfirmModal.tsx       # Cross-platform confirmation modal
│   ├── Headers.tsx            # Header with progress bar
│   └── InputFields.tsx        # Themed text input
├── convex/
│   ├── schema.ts              # Database schema
│   └── todos.ts               # Todo mutations & queries
├── hooks/
│   └── useTheme.tsx           # Theme context (dark/light)
└── assets/
    └── styles/
        ├── home.style.ts      # Todos screen styles
        └── settings.styles.ts # Settings screen styles
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A free [Convex](https://www.convex.dev/) account

### 1. Clone the repo

```bash
[[git clone https://github.com/Viishal-62/todo.git](https://github.com/Viishal-62/todo.git)]
cd todo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Convex

Create a free account at [convex.dev](https://www.convex.dev/), then:

```bash
npx convex dev
```

This will prompt you to create a new project or link to an existing one. It auto-generates the `.env.local` file with your Convex URL.

### 4. Environment Variables

Create a `.env.local` file in the root (auto-created by `npx convex dev`):

```env
EXPO_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

> ⚠️ **Required credential:** You need a Convex deployment URL. Get it by running `npx convex dev` or from your [Convex dashboard](https://dashboard.convex.dev/).

### 5. Run the app

```bash
# Start Convex backend (keep this running in a separate terminal)
npx convex dev

# Start the Expo app
npm run web       # for web
npm run android   # for Android
npm run ios       # for iOS
```

---

## 📦 Deployment

### Accounts Required

| Service | Purpose | Cost | Sign Up |
|---------|---------|------|---------|
| [Convex](https://www.convex.dev/) | Real-time backend & database | Free tier | [convex.dev](https://www.convex.dev/) |
| [Expo (EAS)](https://expo.dev/) | Build Android/iOS app | Free (30 builds/month) | [expo.dev/signup](https://expo.dev/signup) |
| [Vercel](https://vercel.com/) | Host web version (optional) | Free tier | [vercel.com](https://vercel.com/) |

---

### Step 1: Deploy Convex Backend to Production

```bash
npx convex deploy
```

- It will ask: **"Do you want to push your code to prod?"** → Yes
- Note the **production URL** it gives you (e.g., `https://fast-cormorant-349.convex.cloud`)
- You can also find it on your [Convex dashboard](https://dashboard.convex.dev/)

---

### Step 2: Build Android APK (EAS Build)

#### 2.1 Install EAS CLI & Login

```bash
npm install -g eas-cli
```

If you signed up with Google/GitHub (no password):
```bash
eas login --sso
```
Otherwise:
```bash
eas login

```

but if you get build error maybe it might be due to diff versions just run

```bash

 npx expo install --check 2>&1 to fix that issue 

 ```

#### 2.2 Set the Convex URL on Expo Dashboard

> ⚠️ **This is critical!** Without this, the APK won't connect to your backend.

1. Go to [expo.dev](https://expo.dev) → your project (`todo`)
2. Navigate to **Configuration** → **Environment variables**
3. Add a new variable:

| Key | Value | Environment | Visibility |
|-----|-------|-------------|------------|
| `EXPO_PUBLIC_CONVEX_URL` | `https://your-project.convex.cloud` | `preview` | **Plain text** |

Use the **production URL** from Step 1.

#### 2.3 Run the Build

```bash
eas build --platform android --profile preview
```

- **"Create an EAS project?"** → Yes
- **"Android application ID?"** → Press Enter to accept default
- **"Generate a new Android Keystore?"** → Yes

The build runs in Expo's cloud (~5-10 min). When done, you'll get a **download link** for the `.apk` file. Install it on any Android phone!

---

### Step 3: Deploy Web to Vercel (Optional)

```bash
# Build for web
npx expo export --platform web
```

Then deploy the `dist/` folder:

**Option A — Vercel CLI:**
```bash
npm install -g vercel
vercel dist/
```

**Option B — Vercel Dashboard:**
1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com/) → Import your repo
3. Set the **output directory** to `dist`
4. Add environment variable: `EXPO_PUBLIC_CONVEX_URL` = your production Convex URL
5. Deploy!

---

### Quick Reference

| What | Command |
|------|---------|
| Deploy backend | `npx convex deploy` |
| Build APK | `eas build --platform android --profile preview` |
| Build for Play Store | `eas build --platform android --profile production` |
| Build iOS | `eas build --platform ios` (needs Apple Dev $99/yr) |
| Export web | `npx expo export --platform web` |
| Deploy web | `vercel dist/` |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

# Amoga Mobile & Web App (`amogamobiledev1`)

A high-performance, cross-platform collaborative messaging and workspace application built with **React Native (Expo SDK 54)** and powered by the **Amoga Design System (`amogamobileds-v1`)**.

---

## 🏗️ Architecture & Design System Dependency

This application relies directly on the **`amogamobileds-v1`** design system package (`amogamobileds-v1-1.0.2.tgz` or published npm package).

```
                      ┌────────────────────────────────────────┐
                      │    amogamobileds-v1 (Design System)    │
                      │  • UI Primitives, Tokens & Themes      │
                      │  • ChatSidebar, ChatCardItem, Bubble   │
                      │  • FullPageCalendar & CalendarAppView  │
                      │  • FullPageMap & Location Engine       │
                      │  • Navigation Sidebar & Mobile Drawer  │
                      └───────────────────┬────────────────────┘
                                          │ npm install / file:
                                          ▼
                      ┌────────────────────────────────────────┐
                      │     amogamobiledev1 (Main App)         │
                      │  • Supabase Real-Time Engine           │
                      │  • Expo Router (Web & Native APK)      │
                      │  • Auth Provider & Session Management  │
                      │  • 2-Pane Chat & Calendar Applications │
                      └────────────────────────────────────────┘
```

### Components Consumed from `amogamobileds-v1`:
- **Navigation**: `AppNavigationSidebar`, `AppNavigationDrawer`, `ComingSoonView`
- **Chat**: `ChatSidebar`, `ChatCardItem`, `ChatInput`, `ChatHeader`, `ChatBubble`, `ChatMessageList`, `ChatEmptyState`, `ContactManager`, `GroupManager`, `TypingIndicator`, `ChatProfileModal`, `ContactInfoView`
- **Calendar & Tasks**: `CalendarAppView`, `FullPageCalendar`, `calendar_tasks_json`
- **Maps**: `FullPageMap`, `DEFAULT_MAP_MARKERS`
- **Drawers & Modals**: `ThemeSettingsDrawer`, `PreferencesDrawer`, `PreferencesView`
- **Theming & Context**: `ThemeProvider`, `ColorThemeProvider`, `ModeProvider`, `useTheme`, `useColorTheme`

---

## 📂 Project Structure

```
amogamobiledev1/
├── amogamobileds-v1-1.0.2.tgz    # Bundled design system npm tarball
├── app/
│   ├── _layout.tsx               # Root layout, fonts & theme provider wrapping
│   ├── index.tsx                 # Root entry router
│   ├── (auth)/                   # Authentication screens (Sign In, Sign Up, OTP)
│   └── (chat)/
│       ├── index.web.tsx         # Responsive desktop 2-pane web application
│       └── index.tsx             # Native iOS/Android mobile screen with drawer
├── components/                   # Application-specific local views & modals
├── hooks/
│   ├── useChat.ts                # Real-time chat messages, typing & contacts hook
│   └── useProfile.ts             # User profile & avatar management
├── lib/
│   └── supabase.ts               # Supabase client with large-storage auth adapter
├── providers/
│   ├── auth-provider.tsx         # Supabase Auth context
│   ├── theme-provider.tsx        # Dark / Light / System theme engine
│   └── color-theme-provider.tsx  # Dynamic color themes (Violet, Blue, Emerald, etc.)
└── package.json                  # Dependencies & scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### 2. Installation
```bash
# Install all dependencies including the local design system package
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
```

### 4. Running Locally

```bash
# Start Web Development Server
npm run web

# Start Android Emulator / Expo Go
npm run android

# Start iOS Simulator / Expo Go
npm run ios
```

---

## 🌐 Production Deployment

### Deploying to Vercel (Web)
1. Push your repository to GitHub or GitLab.
2. In Vercel, import the `amogamobiledev1` project.
3. Set the build command to `npm run build` (`expo export -p web`) and output directory to `dist`.
4. Add `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in **Environment Variables**.
5. Deploy! Vercel will install the self-contained `amogamobileds-v1-1.0.2.tgz` archive automatically.

### Building Native Android APK
```bash
# Build standalone Android Preview APK with EAS
npm run build:apk
```

---

## 🎨 Design Guidelines
For comprehensive layout, color tokens, typography, component specs, and guidelines to build matching views for new menus (Email, Files, Tasks, Notifications), refer to **[`DESIGN.md`](./DESIGN.md)**.

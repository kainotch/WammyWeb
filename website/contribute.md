# Contributing to Wammy

We welcome contributions of all shapes and sizes! Whether you want to fix a bug, polish the UI, add a new built-in source, or translate the app into your language, here is how you can get started.

---

## Where You Can Help

1. **Built-in Sources & Parsers** (`app/.../source/builtin/`):
   - Add view count and star rating parsing for new websites.
   - Fix broken scrapers or API endpoints when upstream sites change their layouts.
   - Improve Cloudflare bypass handling and clearance resilience.
2. **UI & Compose Components** (`presentation/` and `app/.../presentation/`):
   - Polish animations, transitions, and gesture handling.
   - Refine Material 3 styling and dark/light theme consistency.
   - Improve tablet and foldable layout responsiveness.
3. **Novel Reader & Plugins** (`app/.../source/builtin/novel/`):
   - Enhance the novel reader engine, TTS audio controls, and EPUB/HTML rendering.
4. **Performance & Optimization**:
   - Memory profiling, list scrolling smoothness, and image caching improvements.
5. **Translations (i18n)** (`i18n/` and `i18n-novel/`):
   - Help localize Wammy into your native language.

---

## Development Prerequisites

Before setting up the project locally, ensure you have:
- **Android Studio**: Ladybug (2024.2.1) or newer.
- **JDK**: Java 17+ (or Android Studio bundled JBR).
- **Android SDK**: API level 35.

---

## Contribution Workflow

### 1. Fork & Branch
- Fork the repository on [GitHub](https://github.com/kainotch/Wammy).
- Create your feature branch from **`dev`**:
  ```bash
  git checkout -b feat/my-new-feature dev
  ```
- > **Important**: Please always branch from and target **`dev`**, as `master` is reserved for stable production releases.

### 2. Verify Locally
Ensure the project compiles cleanly before submitting your changes:
```bash
# Fast Kotlin compilation check
./gradlew :app:compileDebugKotlin

# Assemble debug APK
./gradlew :app:assembleDebug
```

### 3. Commit & Pull Request
- Commit with descriptive commit messages following conventional commits (e.g. `feat(source): add ratings parsing for Webtoons` or `fix(discover): prevent hero carousel freeze`).
- Push to your fork and open a Pull Request targeting the **`dev`** branch.
- Include a clear description of your changes, along with screenshots or recordings for any UI modifications.

---

## Community & Questions

Have questions or want to discuss a feature idea before writing code?
- **Discord**: Join our [Discord community](https://discord.gg/qybFSATs7Q) to chat with developers and contributors.
- **GitHub Issues**: Open an issue on our [GitHub repository](https://github.com/kainotch/Wammy/issues) for bug reports or feature proposals.

# Orbit motion artwork

An original 8-second, 800 × 450, 24 fps loop rendered with Remotion. The MP4 and
poster in `../assets/` are the only files used by the Leptos website; no React or
Remotion runtime is shipped to visitors. The artwork has no audio or flashing.

```sh
cd motion
npm ci
npm test
npm run render
npm run poster
```

The pinned Remotion CLI downloads its headless browser on the first render.
Manrope is bundled by `@fontsource-variable/manrope` under the SIL Open Font
License, so rendering does not depend on fonts installed on the host. All
artwork and motion are created in `index.jsx`; the trajectories repeat exactly
every 192 frames. The poster uses frame 24 of the same composition.

For the website, use the poster initially with a muted, looping, inline `<video>`
and an explicit play/pause control. Respect `prefers-reduced-motion` and keep the
poster visible until playback is requested.

Official references: [rendering](https://www.remotion.dev/docs/cli/render),
[still frames](https://www.remotion.dev/docs/cli/still), and
[frame-based animation](https://www.remotion.dev/docs/use-current-frame).

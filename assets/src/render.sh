#!/bin/sh
# Renders the PNGs that `npm run icons` hands to @capacitor/assets.
# Needs rsvg-convert (macOS: brew install librsvg). Run from the app folder.
set -e
src=assets/src
rsvg-convert -w 1024 -h 1024 "$src/icon-only.svg" -o assets/icon-only.png
rsvg-convert -w 1024 -h 1024 "$src/icon-foreground.svg" -o assets/icon-foreground.png
rsvg-convert -w 1024 -h 1024 "$src/icon-background.svg" -o assets/icon-background.png
rsvg-convert -w 2732 -h 2732 "$src/splash.svg" -o assets/splash.png
rsvg-convert -w 2732 -h 2732 "$src/splash-dark.svg" -o assets/splash-dark.png

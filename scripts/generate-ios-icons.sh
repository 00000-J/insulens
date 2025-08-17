#!/bin/bash

# iOS Icon Generation Script
# Follows DRY principles with centralized configuration

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed. Please install it first:"
    echo "brew install imagemagick"
    exit 1
fi

# Configuration - centralized icon paths and sizes
SOURCE_ICON="public/app-icon.png"
IOS_ICONS_DIR="public/icons/ios"
TARGET_DIR="ios/App/App/Assets.xcassets/AppIcon.appiconset"

# Icon size definitions (following iOS Human Interface Guidelines)
declare -A ICON_SIZES=(
    # iPhone icons
    ["app-icon-20@2x.png"]="40x40"
    ["app-icon-20@3x.png"]="60x60"
    ["app-icon-29@2x.png"]="58x58"
    ["app-icon-29@3x.png"]="87x87"
    ["app-icon-40@2x.png"]="80x80"
    ["app-icon-40@3x.png"]="120x120"
    ["app-icon-60@2x.png"]="120x120"
    ["app-icon-60@3x.png"]="180x180"
    
    # iPad icons
    ["app-icon-20.png"]="20x20"
    ["app-icon-29.png"]="29x29"
    ["app-icon-40.png"]="40x40"
    ["app-icon-76.png"]="76x76"
    ["app-icon-76@2x.png"]="152x152"
    ["app-icon-83.5@2x.png"]="167x167"
)

# Check if source icon exists
if [ ! -f "$SOURCE_ICON" ]; then
    echo "Error: Source icon not found at $SOURCE_ICON"
    exit 1
fi

# Create directories if they don't exist
mkdir -p "$TARGET_DIR"
mkdir -p "$IOS_ICONS_DIR"

# Generate App Store icon (1024x1024) - copy source as-is
cp "$SOURCE_ICON" "$IOS_ICONS_DIR/app-icon-1024.png"

# Generate all icon sizes using centralized configuration
echo "Generating iOS app icons..."
for filename in "${!ICON_SIZES[@]}"; do
    size="${ICON_SIZES[$filename]}"
    output_path="$IOS_ICONS_DIR/$filename"
    
    echo "  Generating $filename ($size)"
    convert "$SOURCE_ICON" -resize "$size" "$output_path"
    
    if [ $? -ne 0 ]; then
        echo "Error: Failed to generate $filename"
        exit 1
    fi
done

# Copy all generated icons to Xcode assets directory
echo "Copying icons to Xcode assets..."
cp "$IOS_ICONS_DIR"/*.png "$TARGET_DIR/"

# Rename files to match Xcode Contents.json expectations (app-icon-* -> AppIcon-*)
echo "Renaming icons for Xcode compatibility..."
cd "$TARGET_DIR"
for f in app-icon-*.png; do
    if [ -f "$f" ]; then
        new_name="${f/app-icon-/AppIcon-}"
        mv "$f" "$new_name"
        echo "  Renamed $f -> $new_name"
    fi
done

echo ""
echo "✅ iOS app icons have been generated and stored successfully!"
echo "📁 Source icons saved in: $IOS_ICONS_DIR"
echo "📱 Xcode assets updated in: $TARGET_DIR"
echo "🎯 Total icons generated: $(ls -1 "$IOS_ICONS_DIR"/*.png | wc -l)"

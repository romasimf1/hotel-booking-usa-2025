#!/bin/bash

# Script to create GitHub repository and push the hotel booking site
# Run this script to automatically create and deploy to GitHub Pages

echo "🏨 USA Hotel Booking 2025 - GitHub Deployment Script"
echo "================================================="

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI is not installed. Please install it first:"
    echo "   https://cli.github.com/"
    echo ""
    echo "Or create repository manually and run:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/hotel-booking-usa-2025.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    exit 1
fi

# Check if user is logged in to GitHub CLI
if ! gh auth status &> /dev/null; then
    echo "❌ Not logged in to GitHub CLI. Please run:"
    echo "   gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"

# Get user info
USER=$(gh api user --jq '.login')
echo "👤 GitHub user: $USER"

# Repository name
REPO_NAME="hotel-booking-usa-2025"
REPO_FULL="$USER/$REPO_NAME"

echo "📦 Creating repository: $REPO_FULL"

# Create repository
if gh repo create "$REPO_NAME" --public --description "USA Hotel Booking Website 2025 - Premium hotels across America" --source=. --remote=origin --push; then
    echo "✅ Repository created successfully!"
    echo ""
    echo "🔗 Repository URL: https://github.com/$REPO_FULL"
    echo "🌐 Live site will be available at: https://$USER.github.io/$REPO_NAME/"
    echo ""
    echo "⏳ Please wait 2-3 minutes for GitHub Pages to deploy..."
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to repository Settings → Pages"
    echo "2. Ensure source is set to 'Deploy from a branch' with main branch"
    echo "3. The site will be live at the URL above"
    echo ""
    echo "🎉 Deployment complete! Your USA hotel booking site is ready!"
else
    echo "❌ Failed to create repository. It might already exist."
    echo ""
    echo "🔄 If repository exists, run these commands:"
    echo "   git remote add origin https://github.com/$USER/$REPO_NAME.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
fi

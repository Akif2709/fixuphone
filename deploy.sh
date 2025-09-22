#!/bin/bash

# FixUphone Deployment Script

echo "🚀 Starting FixUphone deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Check if we're connected to a remote repository
if ! git remote | grep -q origin; then
    echo "⚠️  No remote repository found."
    echo "Please create a GitHub repository and add it as origin:"
    echo "git remote add origin https://github.com/yourusername/fixuphone.git"
    echo ""
    echo "Or run: gh repo create fixuphone --public"
    exit 1
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

# Commit and push changes
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Deploy: $(date)"
git push origin main

echo "✅ Code pushed to GitHub!"
echo ""
echo "🌐 Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Import your GitHub repository"
echo "3. Add environment variables:"
echo "   - NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_79rn7rj"
echo "   - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id"
echo "   - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key"
echo "4. Deploy!"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"

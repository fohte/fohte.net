# Percy Visual Regression Testing Setup

## Overview

Percy has been integrated to provide visual regression testing for the fohte.net website. This setup captures screenshots at multiple viewport widths to ensure consistent rendering across devices.

## Configuration

### Percy Configuration (.percy.yml)

- **Viewport widths**: 375px (mobile), 768px (tablet), 1280px (desktop)
- **JavaScript**: Enabled for proper rendering of interactive elements
- **Static site mode**: Configured to work with Next.js static export

### Package Scripts

- `bun run percy`: Runs Percy snapshots on the built site (from `out/` directory)

### GitHub Actions Integration

- **Workflow**: `.github/workflows/percy.yml`
- **Triggers**: Pull requests and pushes to master branch
- **Caching**: Optimized with Next.js build cache

## Setup Instructions

1. **Create a Percy Project**

   - Go to [percy.io](https://percy.io) and create a new project
   - Copy the PERCY_TOKEN from the project settings

2. **Add GitHub Secret**

   - Go to your GitHub repository settings
   - Navigate to Settings → Secrets and variables → Actions
   - Add a new secret named `PERCY_TOKEN` with the token from Percy

3. **Running Locally** (optional)

   ```bash
   # Build the site first
   bun run build

   # Run Percy with your token
   PERCY_TOKEN=your_token_here bun run percy
   ```

## How It Works

1. On every pull request and push to master:

   - GitHub Actions builds the static site
   - Percy takes snapshots of all HTML pages
   - Visual differences are detected and shown in PR comments

2. Percy automatically:
   - Captures all pages at configured viewport widths
   - Compares against the baseline (master branch)
   - Highlights visual changes for review

## Reviewing Changes

- Percy comments on PRs with a link to the visual review
- Click the link to see side-by-side comparisons
- Approve or request changes based on visual differences

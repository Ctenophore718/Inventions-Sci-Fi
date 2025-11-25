# Performance Tips for VS Code

## What was optimized:

### 1. VS Code Settings (`.vscode/settings.json`)
- Disabled semantic highlighting (major CPU saver)
- Reduced TypeScript server memory usage
- Disabled minimap and breadcrumbs
- Optimized file watching to exclude build folders
- Disabled auto-fetch/refresh for git
- Reduced hover delay

### 2. Vite Configuration (`vite.config.ts`)
- Disabled HMR overlay
- Added code splitting for React vendor files
- Optimized build process
- Pre-optimized dependencies

### 3. TypeScript Configuration (`tsconfig.app.json`)
- Enabled incremental builds
- Added performance optimizations
- Excluded unnecessary files

### 4. Code Cleanup
- Removed 225 console.log statements that were slowing down runtime

## Additional Manual Steps You Can Take:

### VS Code Extensions
1. Disable or uninstall unused extensions
2. Keep only essential extensions enabled
3. In particular, disable:
   - Unused formatters
   - Unused linters
   - Heavy theme extensions

### System Level
1. Close other heavy applications
2. Ensure VS Code is running on your SSD (not OneDrive sync folder if possible)
3. Consider moving project off OneDrive to local drive for better performance

### OneDrive Sync Issue
⚠️ **IMPORTANT**: Your project is in `OneDrive\Desktop` which means OneDrive is constantly syncing your files. This significantly impacts performance.

**Solution**: 
- Move project to `C:\Dev\Inventions Sci-Fi` or similar local folder
- Or exclude the `node_modules` and `dist` folders from OneDrive sync

### If Still Slow
1. Restart VS Code after these changes
2. Run: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
3. Run: `Ctrl+Shift+P` → "Developer: Reload Window"
4. Close and reopen the folder

## Command to test performance:
```bash
npm run dev
```

The dev server should now start faster and run more smoothly.

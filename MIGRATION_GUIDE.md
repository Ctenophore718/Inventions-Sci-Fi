# Project Migration Guide
# Moving from OneDrive to Local Drive

## Why Move Out of OneDrive?

OneDrive causes performance issues because:
- ⚠️ Constantly syncs thousands of files in `node_modules`
- ⚠️ Syncs every build output file
- ⚠️ Causes file locking issues
- ⚠️ Dramatically slows down VS Code
- ⚠️ Slows down npm install/build operations

## Quick Migration (Automated)

### Option 1: Run the Migration Script (RECOMMENDED)

1. **Close VS Code completely**

2. **Open PowerShell as Administrator**
   - Press `Win + X`
   - Select "Windows PowerShell (Admin)" or "Terminal (Admin)"

3. **Navigate to your project**
   ```powershell
   cd "C:\Users\dcwes\OneDrive\Desktop\Inventions Sci-Fi"
   ```

4. **Run the migration script**
   ```powershell
   .\MIGRATE_PROJECT.ps1
   ```

5. **Follow the prompts**
   - The script will guide you through each step
   - It will copy files, reinstall dependencies, and verify everything

6. **Test the new location**
   ```powershell
   cd "C:\Dev\Inventions Sci-Fi"
   npm run dev
   ```

7. **If everything works, delete the old OneDrive folder**

---

## Manual Migration (Step-by-Step)

If you prefer to do it manually:

### Step 1: Commit Any Changes
```powershell
cd "C:\Users\dcwes\OneDrive\Desktop\Inventions Sci-Fi"
git status
git add .
git commit -m "Pre-migration commit"
git push origin main
```

### Step 2: Close VS Code
- Make sure VS Code is completely closed
- Check Task Manager if needed

### Step 3: Create Destination Folder
```powershell
mkdir "C:\Dev"
```

### Step 4: Copy Project Files
```powershell
# Using robocopy (faster, built into Windows)
robocopy "C:\Users\dcwes\OneDrive\Desktop\Inventions Sci-Fi" "C:\Dev\Inventions Sci-Fi" /E /XD node_modules dist .vercel
```

### Step 5: Navigate to New Location
```powershell
cd "C:\Dev\Inventions Sci-Fi"
```

### Step 6: Install Dependencies
```powershell
npm install
```

### Step 7: Test Everything
```powershell
npm run dev
```

### Step 8: Open in VS Code
```powershell
code .
```

### Step 9: Verify Git Still Works
```powershell
git status
git remote -v
```

### Step 10: Clean Up (After Verification)
Once you've verified everything works for a few days:
```powershell
# Delete the OneDrive copy
Remove-Item "C:\Users\dcwes\OneDrive\Desktop\Inventions Sci-Fi" -Recurse -Force
```

---

## Troubleshooting

### Issue: "Permission Denied" or "File in Use"
**Solution:** 
- Close VS Code completely
- Close any npm dev servers
- Check Task Manager for any node.exe processes

### Issue: Git Remote Lost
**Solution:**
```powershell
git remote add origin https://github.com/Ctenophore718/Inventions-Sci-Fi.git
```

### Issue: npm install fails
**Solution:**
```powershell
# Clear npm cache
npm cache clean --force
# Try again
npm install
```

### Issue: VS Code Extensions Don't Work
**Solution:**
- Reload VS Code: `Ctrl+Shift+P` → "Reload Window"
- Restart TypeScript Server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

---

## Expected Performance Improvements

After migration, you should see:

✅ **VS Code opens 3-5x faster**
✅ **No more file sync delays**
✅ **Faster npm install (30-50% faster)**
✅ **Faster builds**
✅ **No more OneDrive sync conflicts**
✅ **Smoother AI chat responses**
✅ **TypeScript intellisense works instantly**

---

## Alternative: Exclude Folders from OneDrive

If you MUST keep it in OneDrive:

1. Right-click the project folder → "Free up space"
2. Exclude these folders from sync:
   - `node_modules`
   - `dist`
   - `.git`
   - `.vercel`

But honestly, **moving to C:\Dev is much better**.

---

## Post-Migration Checklist

- [ ] Project runs: `npm run dev`
- [ ] Git works: `git status`
- [ ] Can commit: `git commit -m "test"`
- [ ] Can push: `git push`
- [ ] VS Code opens fast
- [ ] TypeScript works
- [ ] AI chat responds quickly
- [ ] No OneDrive sync icon on folder

If all checked, you're good to delete the OneDrive copy!

---

## Need Help?

If you encounter issues:
1. Don't delete the OneDrive folder yet
2. Keep both copies until verified
3. You can always copy back if needed

**Ready to migrate? Run the script!**
```powershell
.\MIGRATE_PROJECT.ps1
```

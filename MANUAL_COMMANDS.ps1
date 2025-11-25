# MANUAL MIGRATION COMMANDS
# Copy and paste these commands one at a time into PowerShell

# Step 1: Create destination directory
New-Item -ItemType Directory -Path "C:\Dev" -Force

# Step 2: Copy project files (this will take a few minutes)
robocopy "C:\Users\dcwes\OneDrive\Desktop\Inventions Sci-Fi" "C:\Dev\Inventions Sci-Fi" /E /XD node_modules dist .vercel /R:0 /W:0

# Step 3: Navigate to new location
cd "C:\Dev\Inventions Sci-Fi"

# Step 4: Install dependencies
npm install

# Step 5: Test it works
npm run dev

# Step 6: Open in VS Code
code .

# Step 7: (OPTIONAL) After verifying it works, delete the old OneDrive folder
# Remove-Item "C:\Users\dcwes\OneDrive\Desktop\Inventions Sci-Fi" -Recurse -Force

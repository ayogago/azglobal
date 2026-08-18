#!/bin/bash

# Add credentials: 'include' to all fetch calls in portal pages that don't have it

# Find all TypeScript files in portal directory
find app/portal -name "*.tsx" -type f | while read file; do
  # Check if file has fetch calls without credentials
  if grep -q "fetch('/api" "$file"; then
    echo "Processing: $file"

    # Use sed to add credentials: 'include' after method: 'POST' or method: 'GET' or after headers
    # Pattern 1: After method: 'POST' or 'GET' or 'PATCH' or 'DELETE'
    sed -i "s/method: '\(POST\|GET\|PATCH\|DELETE\)',$/method: '\1',\n        credentials: 'include',/g" "$file"

    # Pattern 2: After headers block ending with },
    sed -i "/headers: {/,/},/ s/},$/},\n        credentials: 'include',/" "$file"

    # Pattern 3: Simple fetch with just URL (no options)
    # This is trickier - skip for manual review
  fi
done

echo "Done! Please review the changes."

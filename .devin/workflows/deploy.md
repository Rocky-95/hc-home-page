---
description: How to deploy the Harry Clinton frontend to GitHub Pages
---

# Deploy the Harry Clinton frontend to GitHub Pages

1. Ensure all code changes are saved and committed to Git.
2. Verify the environment variables in `.env` are correct (especially `REACT_APP_API_BASE_URL` and `REACT_APP_RAZORPAY_KEY_ID`).
3. Run the build and deploy from the local machine:
   - `npm run deploy`
   - This runs `npm run build` then pushes the `build/` folder to the `gh-pages` branch.
4. After deployment, visit the GitHub Pages URL and smoke-test the home page, login, and a category page.

## Notes
- `homepage` in `package.json` is set to `https://harryclinton.in/`.
- GitHub Pages requires the repository to have the `gh-pages` branch enabled as the Pages source.
- For production, replace the Razorpay test key in `.env` with a live key before building.

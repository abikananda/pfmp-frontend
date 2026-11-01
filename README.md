
===========
npm version patch   # Increments the patch version (1.0.0 -> 1.0.1)
npm version minor   # Increments the minor version (1.0.0 -> 1.1.0)
npm version major   # Increments the major version (1.0.0 -> 2.0.0)


Scans code for bad patterns and suggests improvements.
ng add @angular-eslint/schematics
To check problem: ng lint


Detects unused dependencies in package.json
npm install -g depcheck
depcheck

Run this to generate a stats.json file with build stats:
ng build --stats-json
Then analyze it with Webpack Bundle Analyzer (below).

📦 2. Webpack Bundle Analyzer
Visualizes your bundle size and shows which packages are taking the most space.
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/your-project-name/stats.json


const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');
const centralRepoRoot = path.resolve(workspaceRoot, 'amogamobileds-v1');

const config = getDefaultConfig(projectRoot);

// 1. Watch central design system repository for live updates
config.watchFolders = [centralRepoRoot];

// 2. Resolve modules exclusively from project root to prevent duplicate react/lucide/expo instances
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

// 3. Block central repository's node_modules from being bundled
config.resolver.blockList = [
  new RegExp(
    `^${path.resolve(centralRepoRoot, 'node_modules').replace(/[/\\]/g, '[/\\\\]')}.*`
  ),
];

/**
 * Resolve a bare path to an existing file by trying common TS/JS extensions.
 * Returns the resolved filepath or null if nothing found.
 */
function resolveWithExtensions(basePath) {
  const extensions = [
    '',           // exact match (e.g. already has extension)
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '/index.ts',
    '/index.tsx',
    '/index.js',
  ];
  for (const ext of extensions) {
    const candidate = basePath + ext;
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

// 4. Resolve @/ and @ds/ path aliases and amogamobileds-v1 cleanly in Metro
const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // @/ maps to the project root (amogamobiledev1/)
  if (moduleName.startsWith('@/')) {
    const relativePath = moduleName.slice(2); // e.g. "lib/supabase"
    const basePath = path.resolve(projectRoot, relativePath);
    const resolved = resolveWithExtensions(basePath);
    if (resolved) {
      return { type: 'sourceFile', filePath: resolved };
    }
    // Fallback: return without extension and let metro figure it out
    return { type: 'sourceFile', filePath: basePath };
  }

  // @ds/ maps to the central design system root
  if (moduleName.startsWith('@ds/')) {
    const relativePath = moduleName.slice(4);
    const basePath = path.resolve(centralRepoRoot, relativePath);
    const resolved = resolveWithExtensions(basePath);
    if (resolved) {
      return { type: 'sourceFile', filePath: resolved };
    }
    return { type: 'sourceFile', filePath: basePath };
  }

  // amogamobileds-v1 maps to the central repo's index
  if (moduleName === 'amogamobileds-v1') {
    return { type: 'sourceFile', filePath: path.resolve(centralRepoRoot, 'index.ts') };
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

if (!config.resolver.assetExts.includes('ttf')) {
  config.resolver.assetExts.push('ttf');
}
if (!config.resolver.assetExts.includes('otf')) {
  config.resolver.assetExts.push('otf');
}

module.exports = config;

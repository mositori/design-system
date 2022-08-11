import { build, BuildOptions } from "esbuild"
import pkg from "../package.json"

const shared: BuildOptions = {
    logLevel: 'info',
    charset: 'utf8',
    minify: true,
    bundle: true,
    platform: 'node',
    define: {
        VERSION: JSON.stringify(pkg.version),
    }
}

const p = [
    build({
        ...shared,
        format: 'esm',
        entryPoints: ['src/index.ts'],
        outfile: pkg.exports['.'].import,
    }),
    build({
        ...shared,
        format: 'cjs',
        entryPoints: ['src/index.ts'],
        outfile: pkg.exports['.'].require,
    }),
    build({
        ...shared,
        format: 'esm',
        platform: 'browser',
        entryPoints: ['src/index.ts'],
        outfile: pkg.exports['.'].browser,
    })
]

await Promise.all(p).catch(err => {
    console.error(err.stack || err)
    throw err
})
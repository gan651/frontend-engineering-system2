import { promises as fs } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, "..", "dist")

const cssImportLineRe = /^import\s+["'][^"']+\.css["'];?\s*$/gm

async function main() {
    const files = await fs.readdir(distDir)
    let changed = 0

    for (const file of files) {
        if (!file.endsWith(".d.ts")) continue
        const filePath = path.join(distDir, file)
        const original = await fs.readFile(filePath, "utf-8")
        const cleaned = original.replace(cssImportLineRe, "")

        if (cleaned !== original) {
            await fs.writeFile(filePath, cleaned, "utf-8")
            console.log(`[strip-css-imports] cleaned ${file}`)
            changed++
        }
    }

    if (changed === 0) {
        console.log("[strip-css-imports] no CSS imports found to strip")
    }
}

main().catch((err) => {
    console.error("[strip-css-imports] failed:", err)
    process.exit(1)
})

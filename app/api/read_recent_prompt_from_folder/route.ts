import fs from 'fs';
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {

    const {searchParams} = new URL(request.url);
    const index = searchParams.get('index') || "0";
    const count = parseInt(index) || 0;

    const folder = searchParams.get('folder') || "0";

    console.log("count", count);

    try {
        const fileDir = `./tmp/${folder}`
        if (!fs.existsSync(fileDir)) {
            throw new Error("Folder not found: " + folder);
        }
        const mostRecentFileNames = fs.readdirSync(fileDir).sort().reverse();
        if (count >= mostRecentFileNames.length) {
            throw new Error("Index out of bounds: " + count);
        }
        const filename = mostRecentFileNames[count];
        const filepath = `${fileDir}/${filename}`;
        const prompt = fs.readFileSync(filepath, 'utf8');
        
        console.log("prompt", prompt);

        return new Response(JSON.stringify(prompt));
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify("FAIL"));
    }
}
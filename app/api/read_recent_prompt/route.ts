import fs from 'fs';
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {

    const {searchParams} = new URL(request.url);
    const index = searchParams.get('index') || "0";
    const count = parseInt(index) || 0;

    console.log("count", count);

    try {
        const mostRecentFileNames = fs.readdirSync('./tmp/prompts').sort().reverse();
        if (count >= mostRecentFileNames.length) {
            throw new Error("Index out of bounds");
        }
        const filename = mostRecentFileNames[count];
        const filepath = `./tmp/prompts/${filename}`;
        const prompt = fs.readFileSync(filepath, 'utf8');
        
        console.log("prompt", prompt);

        return new Response(JSON.stringify(prompt));
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify("FAIL"));
    }
}
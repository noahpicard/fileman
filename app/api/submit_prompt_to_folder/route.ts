import fs from 'fs';
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
export async function PUT(request: NextRequest) {

    const data = await request.json();

    let prompt = data?.['prompt'] as string;
    if (prompt.length === 6) {
        prompt = prompt + " ";
    }
    const folder = data?.['folder'] as string || "prompts";
    const date = new Date().toISOString();

    console.log("prompt", prompt);
    console.log("folder", folder);
    console.log("date", date);

    try {
        const fileDir = `./tmp/${folder}`
        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir);
        }
        const filepath = `${fileDir}/${date}.txt`;
        fs.writeFileSync(filepath, prompt);
        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ success: false }));
    }
}
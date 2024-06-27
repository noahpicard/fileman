import fs from 'fs';
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
export async function PUT(request: NextRequest) {

    const data = await request.json();
    console.log("data", data);

    const prompt = data?.['prompt'] as string;
    const date = new Date().toISOString();

    console.log("prompt", prompt);
    console.log("date", date);

    try {
        fs.writeFileSync(`./tmp/prompts/${date}.txt`, prompt);
        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ success: false }));
    }
}
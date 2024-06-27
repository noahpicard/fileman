import fs from 'fs';
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {

    // console.log("HEH")

    // const data = await request.json();
    // console.log("data", data);

    // const countString = (data?.['count'] || "10") as string;
    const count = 10;

    console.log("count", count);

    try {
        // get X most recent files in dir
        const mostRecentFileNames = fs.readdirSync('./tmp/prompts').sort().reverse().slice(0, count);

        console.log("mostRecentFileNames", mostRecentFileNames);
        
        // read from each file
        const prompts = mostRecentFileNames.map((fileName) => {
            const filepath = `./tmp/prompts/${fileName}`;
            return fs.readFileSync(filepath, 'utf8');
        })
        
        console.log("prompts", prompts);

        return new Response(JSON.stringify(
            { success: true, prompts: prompts }
        ));
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ success: false, prompts: [] }));
    }
}
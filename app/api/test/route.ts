import { NextResponse } from "next/server";
import { emailSent, getBids, getItems } from "../../utils/databaseCalls";

export async function GET() {
    try{
        const items = await getItems();
        return NextResponse.json({message: "test function executed successfully"});
    }
    catch(error){
        console.error("Error in sendEmail function:", error);
        return NextResponse.error();
    }
}
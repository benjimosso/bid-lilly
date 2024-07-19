import { NextRequest, NextResponse } from 'next/server';
import { twiml } from 'twilio';

export async function POST(req: NextRequest) {
  const messagingResponse = new twiml.MessagingResponse();

  // Set the response message
  messagingResponse.message('For any further assistance, please contact Taylor Tinley at (805) 637-5758.');

  // Respond with the TwiML content
  return new NextResponse(messagingResponse.toString(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
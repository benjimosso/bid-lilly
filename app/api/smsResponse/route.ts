import { NextRequest, NextResponse } from 'next/server';
import { twiml } from 'twilio';

export async function POST(req: NextRequest) {
  const messagingResponse = new twiml.MessagingResponse();

  // Set the response message
  messagingResponse.message('Thank you for your message! if you have any questions or need further assistance, please feel free to text Taylor at (310)-890-0647');

  // Respond with the TwiML content
  return new NextResponse(messagingResponse.toString(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
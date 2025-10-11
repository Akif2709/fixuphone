import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    mongodbUri: process.env.MONGODB_URI ? '✅ Set' : '❌ Not Set',
    mongodbDb: process.env.MONGODB_DB_NAME || '❌ Not Set',
    nodeEnv: process.env.NODE_ENV || '❌ Not Set',
    emailjsService: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? '✅ Set' : '❌ Not Set',
    emailjsTemplate: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? '✅ Set' : '❌ Not Set',
    emailjsKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? '✅ Set' : '❌ Not Set',
    timestamp: new Date().toISOString()
  });
}

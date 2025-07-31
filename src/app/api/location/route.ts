import { NextRequest, NextResponse } from 'next/server';

export async function POST(req : NextRequest) {
  const body = await req.json();

  try {
    const getLocation = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${body}&limit=5&appid=${process.env.WEATHER_API_KEY}`, {
      method: 'GET',
    });

    const data = await getLocation.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending activity:', error);
    return NextResponse.json({ error: 'Failed to send activity' }, { status: 500 });
  }
}

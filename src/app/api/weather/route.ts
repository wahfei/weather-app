import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();
	console.log("Received body:", body);

	try {
		const getLocation = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${body.lat}&lon=${body.lon}&appid=${process.env.WEATHER_API_KEY}`, {
			method: "GET",
		});

		const data = await getLocation.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error sending activity:", error);
		return NextResponse.json({ error: "Failed to send activity" }, { status: 500 });
	}
}

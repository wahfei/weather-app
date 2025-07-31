"use client";

import { useState, useEffect } from "react";
import { Weather } from "../../types";
import Image from "next/image";
import SearchIcon from "@/app/assets/search-icon.png";
import CurrentWeather from "@/components/currentWeather";
import SearchHistory from "@/components/searchHistory";
import { getDateTime } from "./lib/getDateTime";

type HistoryItem = {
	name: string;
	dateTime: string;
};

export default function Home() {
	const [locationInput, setLocationInput] = useState("");
	const [submittedLocation, setSubmittedLocation] = useState("");
	const [weatherData, setWeatherData] = useState<Weather | null>(null);
	const [history, setHistory] = useState<HistoryItem[]>([]);

	// Load history on mount
	useEffect(() => {
		const stored = localStorage.getItem("search-history");
		if (stored) {
			setHistory(JSON.parse(stored));
		}
	}, []);

	async function fetchLocationAndWeather(location: string) {
		if (!location.trim()) return;

		try {
			const res = await fetch("/api/location", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(location),
			});

			if (!res.ok) throw new Error("Failed to fetch location data");

			const locationData = await res.json();

			if (locationData.length === 0) {
				setWeatherData(null);
				return;
			}

			const { lat, lon } = locationData[0];
			setSubmittedLocation(location);
			await fetchWeather(lat, lon);
			storeSearchInHistory(location);
		} catch (err) {
			console.error("Error fetching location:", err);
		}
	}

	async function fetchWeather(lat: number, lon: number) {
		try {
			const res = await fetch("/api/weather", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ lat, lon }),
			});

			if (!res.ok) throw new Error("Failed to fetch weather data");

			const weather = await res.json();
			setWeatherData(weather);
		} catch (err) {
			console.error("Error fetching weather:", err);
		}
	}

	function storeSearchInHistory(location: string) {
		const newEntry = {
			name: location,
			dateTime: getDateTime(new Date()),
		};

		const updated = [newEntry, ...history].slice(0, 10);
		setHistory(updated);
		localStorage.setItem("search-history", JSON.stringify(updated));
	}

	return (
		<main className="max-w-7xl mx-auto px-4 min-h-screen pb-12">
			<div className="max-w-[700px] mx-auto">
				{/* Search Bar */}
				<div className="flex items-center justify-center mt-10 gap-3.5">
					<input
						name="location"
						type="text"
						value={locationInput}
						onChange={(e) => setLocationInput(e.target.value)}
						placeholder="Eg: London, New York, etc. "
						className="bg-[#ffffff33] rounded-2xl px-6 py-2 h-[60px] w-full"
					/>
					<button
						className="w-[60px] h-[60px] cursor-pointer"
						onClick={() => fetchLocationAndWeather(locationInput)}
						aria-label="Search Weather"
					>
						<Image
							src={SearchIcon}
							alt="Search"
							width={60}
							height={60}
							className="w-full h-full object-contain"
						/>
					</button>
				</div>

				<div className="mt-28 relative border-[1px] border-[#ffffff33] bg-[#ffffff33] px-4 sm:px-7 md:px-12 py-10 rounded-4xl">
					{/* Weather Display */}
					<CurrentWeather
						weatherData={weatherData}
						location={submittedLocation}
						inputData={locationInput}
					/>

					{/* History */}
					<SearchHistory
						history={history}
						setHistory={setHistory}
						onSearch={fetchLocationAndWeather}
					/>
				</div>
			</div>
		</main>
	);
}

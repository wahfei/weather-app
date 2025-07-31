import React from "react";
import { Weather } from "../../types";
import { getTemperatureInCelcius } from "@/app/lib/getTemperatureInCelcius";
import { getDateTime } from "@/app/lib/getDateTime";
import Temperature from "./temperature";
import CloudImage from "@/app/assets/cloud.png";
import SunImage from "@/app/assets/sun.png";
import Image from "next/image";

export default function CurrentWeather({ weatherData, location, inputData }: { weatherData: Weather | null; location: string; inputData: string }) {
	const currentTime = getDateTime(new Date());

	return (
		<>
			{!weatherData ? (
				<p className="text-center">No weather data available for <b className="text-red-600">{inputData}</b></p>
			) : (
				<div className="flex justify-between items-end">
					<div className="flex flex-col gap-2">
						<p>Today&apos;s Weather</p>
						<Temperature
							current={getTemperatureInCelcius(weatherData?.main.temp || 0)}
							min={getTemperatureInCelcius(weatherData?.main.temp_min || 0)}
							max={getTemperatureInCelcius(weatherData?.main.temp_max || 0)}
						/>
						<span className="font-bold capitalize">{location}</span>
					</div>
					<div className="flex-col items-end justify-end flex md:flex-row md:items-center md:justify-between mt-4 text-[#666666] gap-3 md:gap-6">
						<span className="max-md:order-3 leading-[1]">{currentTime}</span>
						<span className="max-md:order-2 leading-[1]">Humidity: {weatherData?.main.humidity}%</span>
						<span className="max-md:order-1 leading-[1]">{weatherData?.weather[0].main}</span>
					</div>

					<Image
						src={weatherData?.weather[0].main !== "Clouds" ? SunImage : CloudImage}
						alt="Sun"
						width={300}
						height={300}
						className="size-40 sm:size-64 md:size-72 mt-4 absolute top-0 right-0 !m-0 translate-y-[-40%] translate-x-[-10%] object-contain"
					/>
				</div>
			)}
		</>
	);
}

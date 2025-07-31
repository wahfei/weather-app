import React from "react";

export default function Temperature({ current, min, max }: { current: number; min: number; max: number }) {
	return (
		<div>
			<span className="text-7xl md:text-8xl text-[#6C40B5] font-bold">{current}°</span>
			<div className="flex items-center gap-4 mt-0 text-black">
				<span>H:{min}°</span>
				<span>L:{max}°</span>
			</div>
		</div>
	);
}

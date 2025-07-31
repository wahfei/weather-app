"use client";

import { Dispatch, SetStateAction } from "react";
import DeleteIcon from "@/app/assets/Delete.png";
import SearchIcon from "@/app/assets/Search.png";
import Image from "next/image";

type HistoryItem = {
	name: string;
	dateTime: string;
};

export default function SearchHistory({
	history,
	setHistory,
	onSearch,
}: {
	history: HistoryItem[];
	setHistory: Dispatch<SetStateAction<HistoryItem[]>>;
	onSearch: (location: string) => void;
}) {
	const handleDelete = (index: number) => {
		const updated = [...history];
		updated.splice(index, 1);
		setHistory(updated);
		localStorage.setItem("search-history", JSON.stringify(updated));
	};

	return (
		<div className="mt-10 px-4 py-6 sm:p-6 bg-[#ffffff33] rounded-2xl">
			<h2 className="font-semibold text-lg mb-2">Search History</h2>
			{history.length === 0 && <p className="text-sm text-gray-500">No history yet.</p>}
			<div className="space-y-2">
				{history.map((item, index) => (
					<div
						key={index}
						className="flex justify-between items-center px-5 py-3 bg-[#ffffff66] rounded-2xl gap-3"
					>
						<div className="flex flex-1 justify-between max-md:flex-col gap-1">
							<p className="font-medium">{item.name}</p>
							<p className="max-sm:!text-[10px] font-medium">{item.dateTime}</p>
						</div>
						<div className="flex items-center gap-3">
							<button
								onClick={() => onSearch(item.name)}
								className="text-black text-sm cursor-pointer bg-white p-3 rounded-full"
							>
								<Image
									src={SearchIcon}
									alt="Search"
									width={20}
									height={20}
								/>
							</button>
							<button
								onClick={() => handleDelete(index)}
								className="text-red-500 text-sm cursor-pointer bg-white p-3 rounded-full"
							>
								<Image
									src={DeleteIcon}
									alt="Delete"
									width={20}
									height={20}
								/>
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

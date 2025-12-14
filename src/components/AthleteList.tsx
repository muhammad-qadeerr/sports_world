import { useContext, useState, useEffect, useRef } from "react";
import { FinanceContext } from "../contexts/FinanceContext";
import { getImageUrl } from "../utils/imageUtils";
import type { IAthlete } from "../interfaces/Athlete";

const AthleteList = () => {
	const ctx = useContext(FinanceContext);
	const [search, setSearch] = useState("");
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editForm, setEditForm] = useState<IAthlete | null>(null);
	const [displayedAthletes, setDisplayedAthletes] = useState<IAthlete[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const editImageFileRef = useRef<HTMLInputElement | null>(null);
	const [editSelectedFileName, setEditSelectedFileName] = useState<string>("");

	if (!ctx) return null;

	useEffect(() => {
		if (search.trim() === "") {
			setDisplayedAthletes(ctx.athletes);
			setIsSearching(false);
		} else {
			const timeoutId = setTimeout(async () => {
				setIsSearching(true);
				const result = await ctx.searchAthletes(search);
				if (result.success && result.data) {
					setDisplayedAthletes(result.data);
				} else {
					setDisplayedAthletes([]);
				}
				setIsSearching(false);
			}, 300);

			return () => clearTimeout(timeoutId);
		}
	}, [search, ctx.athletes, ctx]);

	useEffect(() => {
		if (!isSearching && search.trim() === "") {
			setDisplayedAthletes(ctx.athletes);
		}
	}, [ctx.athletes, isSearching, search]);

	const startEdit = (athlete: IAthlete) => {
		setEditingId(athlete.id!);
		setEditForm({ ...athlete });
		setEditSelectedFileName("");
		if (editImageFileRef.current) {
			editImageFileRef.current.value = "";
		}
	};

	const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setEditSelectedFileName(file.name);
		} else {
			setEditSelectedFileName("");
		}
	};

	const saveEdit = async () => {
		if (!editForm || !editingId) return;
		
		const imageFile = editImageFileRef.current?.files?.[0];
		const formData = new FormData();
		formData.append("Id", editForm.id?.toString() || "0");
		formData.append("Name", editForm.name);
		formData.append("Gender", editForm.gender);
		formData.append("Price", editForm.price.toString());
		formData.append("PurchaseStatus", editForm.purchaseStatus?.toString() || "false");
		
		// Always send current image URL so backend knows the original image
		formData.append("Image", editForm.image || "");
		
		// If user selected a new file, send it as form file
		if (imageFile) {
			formData.append("image", imageFile);
		}
		
		const res = await ctx.editAthlete(editingId, formData);
		if (res.success) {
			setEditingId(null);
			setEditForm(null);
			setEditSelectedFileName("");
			if (editImageFileRef.current) editImageFileRef.current.value = "";
		} else {
			alert(res.error || "Edit athlete failed");
		}
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditForm(null);
		setEditSelectedFileName("");
		if (editImageFileRef.current) {
			editImageFileRef.current.value = "";
		}
	};

	const deleteAthlete = async (id: number) => {
		if (confirm("Are you sure you want to delete this athlete?")) {
			const res = await ctx.deleteAthlete(id);
			if (res.success) {
				await ctx.refresh();
			} else {
				alert("Delete athlete failed");
			}
		}
	};


	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Athlete List</h2>
			<input
				type="text"
				placeholder="Search by name"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>
			{isSearching && (
				<p className="text-sm text-gray-500 mb-4">Searching...</p>
			)}
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white">
					<thead className="bg-gray-50">
						<tr>
							<th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Profile Photo
							</th>
							<th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Name
							</th>
							<th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Gender
							</th>
							<th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Price
							</th>
							<th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Purchase Status
							</th>
							<th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{displayedAthletes.map((a) => (
							<tr key={a.id} className="hover:bg-gray-50">
								<td className="py-4 px-4 whitespace-nowrap">
									{editingId === a.id ? (
										<div className="flex flex-col gap-2">
											{editForm?.image && (
												<div className="flex items-center gap-2">
													<img
														src={getImageUrl(editForm.image)}
														alt=""
														className="w-12 h-12 object-cover rounded border border-gray-300"
														onError={(e) => {
															// Hide image when it fails to load
															e.currentTarget.style.display = 'none';
														}}
													/>
												</div>
											)}
											<label className="cursor-pointer">
												<input
													ref={editImageFileRef}
													type="file"
													accept="image/*"
													onChange={handleEditFileChange}
													className="hidden"
												/>
												<div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm w-fit">
													<svg
														className="w-4 h-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
														/>
													</svg>
													<span className="font-medium">Choose New Profile Photo</span>
												</div>
											</label>
											{editSelectedFileName && (
												<span className="text-xs text-gray-600">
													Selected: {editSelectedFileName}
												</span>
											)}
										</div>
									) : (
										a.image ? (
											<img
												src={getImageUrl(a.image)}
												alt=""
												title={a.name}
												className="w-12 h-12 object-cover rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
												onClick={() => window.open(getImageUrl(a.image), '_blank')}
												onError={(e) => {
													// Hide image when it fails to load
													e.currentTarget.style.display = 'none';
												}}
											/>
										) : (
											<span className="text-sm text-gray-400">No image</span>
										)
									)}
								</td>
								<td className="py-4 px-4 whitespace-nowrap">
									{editingId === a.id ? (
										<input
											type="text"
											value={editForm?.name || ""}
											onChange={(e) =>
												setEditForm((prev) =>
													prev ? { ...prev, name: e.target.value } : null
												)
											}
											className="border border-gray-300 p-1 rounded"
										/>
									) : (
										<span className="text-sm font-medium text-gray-900">
											{a.name}
										</span>
									)}
								</td>
								<td className="py-4 px-4 whitespace-nowrap">
									{editingId === a.id ? (
										<input
											type="text"
											value={editForm?.gender || ""}
											onChange={(e) =>
												setEditForm((prev) =>
													prev ? { ...prev, gender: e.target.value } : null
												)
											}
											className="border border-gray-300 p-1 rounded"
										/>
									) : (
										<span className="text-sm text-gray-500">{a.gender}</span>
									)}
								</td>
								<td className="py-4 px-4 whitespace-nowrap">
									{editingId === a.id ? (
										<input
											type="number"
											value={editForm?.price || 0}
											onChange={(e) =>
												setEditForm((prev) =>
													prev
														? {
																...prev,
																price: parseFloat(e.target.value) || 0,
														  }
														: null
												)
											}
											className="border border-gray-300 p-1 rounded"
										/>
									) : (
										<span className="text-sm text-gray-500">
											${a.price.toFixed(2)}
										</span>
									)}
								</td>
								<td className="py-4 px-4 whitespace-nowrap">
									<span
										className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
											a.purchaseStatus
												? "bg-green-100 text-green-800"
												: "bg-yellow-100 text-yellow-800"
										}`}
									>
										{a.purchaseStatus ? "Purchased" : "Not Purchased"}
									</span>
								</td>
								<td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
									{editingId === a.id ? (
										<div className="flex space-x-2">
											<button
												onClick={saveEdit}
												className="text-green-600 hover:text-green-900"
											>
												Save
											</button>
											<button
												onClick={cancelEdit}
												className="text-gray-600 hover:text-gray-900"
											>
												Cancel
											</button>
										</div>
									) : (
										<div className="flex space-x-2">
											<button
												onClick={() => startEdit(a)}
												className="text-indigo-600 hover:text-indigo-900"
											>
												Edit
											</button>
											<button
												onClick={() => deleteAthlete(a.id!)}
												className="text-red-600 hover:text-red-900"
											>
												Delete
											</button>
										</div>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AthleteList;

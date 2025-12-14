import { useContext, useRef, useState } from "react";
import { FinanceContext } from "../contexts/FinanceContext";

const AthleteForm = () => {
	const ctx = useContext(FinanceContext);
	const [status, setStatus] = useState<{ msg: string; ok: boolean | null }>({
		msg: "",
		ok: null,
	});

	const nameRef = useRef<HTMLInputElement | null>(null);
	const genderRef = useRef<HTMLInputElement | null>(null);
	const priceRef = useRef<HTMLInputElement | null>(null);
	const imageFileRef = useRef<HTMLInputElement | null>(null);
	const [selectedFileName, setSelectedFileName] = useState<string>("");

	if (!ctx) return null;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFileName(file.name);
		} else {
			setSelectedFileName("");
		}
	};

	const save = async () => {
		if (!nameRef.current || !genderRef.current || !priceRef.current) return;
		const name = nameRef.current.value.trim();
		const gender = genderRef.current.value.trim();
		const price = parseFloat(priceRef.current.value);
		const imageFile = imageFileRef.current?.files?.[0];

		if (!name || !gender || isNaN(price) || price <= 0) {
			setStatus({ msg: "Please fill all required fields correctly", ok: false });
			setTimeout(() => setStatus({ msg: "", ok: null }), 3000);
			return;
		}

		const normalizedGender = gender.toLowerCase();
		if (normalizedGender !== "male" && normalizedGender !== "female") {
			setStatus({ 
				msg: "Gender must be 'Male' or 'Female' (case-insensitive)", 
				ok: false 
			});
			setTimeout(() => setStatus({ msg: "", ok: null }), 3000);
			return;
		}

		const formData = new FormData();
		formData.append("Id", "0");
		formData.append("Name", name);
		formData.append("Gender", gender);
		formData.append("Price", price.toString());
		formData.append("PurchaseStatus", "false");
		
		if (imageFile) {
			formData.append("image", imageFile);
			formData.append("Image", imageFile.name);
		} else {
			formData.append("Image", "");
			formData.append("image", "");
		}

		const res = await ctx.saveAthlete(formData);
		if (res.success) {
			setStatus({
				msg: "Athlete registered successfully! Status: Not Purchased",
				ok: true,
			});
			if (nameRef.current) nameRef.current.value = "";
			if (genderRef.current) genderRef.current.value = "";
			if (priceRef.current) priceRef.current.value = "";
			if (imageFileRef.current) imageFileRef.current.value = "";
			setSelectedFileName("");
		} else {
			setStatus({ 
				msg: res.error || "Error saving athlete", 
				ok: false 
			});
		}

		setTimeout(() => setStatus({ msg: "", ok: null }), 3000);
	};

	return (
		<section className="p-8 border-2 border-gray-300 rounded-lg bg-white shadow-lg max-w-2xl">
			<h3 className="text-2xl font-bold mb-2 text-gray-800">
				Register Potential Athlete
			</h3>

			<div className="mb-5">
				<label htmlFor="athlete-name" className="block text-gray-700 font-semibold mb-2">
					Athlete Name *
				</label>
				<input
					id="athlete-name"
					ref={nameRef}
					className="border-2 border-gray-300 p-3 w-full rounded focus:outline-none focus:border-blue-500"
					type="text"
					placeholder="Enter athlete's full name"
					required
				/>
			</div>

			<div className="mb-5">
				<label htmlFor="athlete-gender" className="block text-gray-700 font-semibold mb-2">
					Gender *
				</label>
				<input
					id="athlete-gender"
					ref={genderRef}
					className="border-2 border-gray-300 p-3 w-full rounded focus:outline-none focus:border-blue-500"
					type="text"
					placeholder="Male or Female (case-insensitive)"
					required
				/>
				<p className="text-sm text-gray-500 mt-1">
					Must be "Male" or "Female" (any case)
				</p>
			</div>

			<div className="mb-5">
				<label htmlFor="athlete-price" className="block text-gray-700 font-semibold mb-2">
					Price ($) *
				</label>
				<input
					id="athlete-price"
					ref={priceRef}
					className="border-2 border-gray-300 p-3 w-full rounded focus:outline-none focus:border-blue-500"
					type="number"
					min="0"
					step="1"
					placeholder="Enter athlete price"
					required
				/>
			</div>

			<div className="mb-6">
				<label htmlFor="athlete-image" className="block text-gray-700 font-semibold mb-2">
					Profile Photo
				</label>
				<div className="flex items-center gap-3">
					<label htmlFor="athlete-image" className="cursor-pointer">
						<input
							id="athlete-image"
							ref={imageFileRef}
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="hidden"
						/>
						<div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
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
							<span className="font-medium">Choose File</span>
						</div>
					</label>
					{selectedFileName && (
						<span className="text-sm text-gray-700 font-medium">
							{selectedFileName}
						</span>
					)}
				</div>
				<p className="text-sm text-gray-500 mt-1">
					Upload an image file (optional)
				</p>
			</div>

			<div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
				<p className="text-sm text-gray-700">
					<span className="font-semibold">Note:</span> New athletes will
					automatically be marked as{" "}
					<span className="font-bold text-red-600">"Not Purchased"</span> until
					they are purchased by the organization.
				</p>
			</div>

			<button
				onClick={save}
				className="w-full bg-blue-600 text-white px-4 py-3 rounded font-semibold hover:bg-blue-700 transition-colors"
			>
				Register Athlete
			</button>

			{status.msg && (
				<p
					className={`mt-4 p-3 rounded text-center font-semibold ${
						status.ok
							? "bg-green-100 text-green-700"
							: "bg-red-100 text-red-700"
					}`}
				>
					{status.msg}
				</p>
			)}
		</section>
	);
};

export default AthleteForm;

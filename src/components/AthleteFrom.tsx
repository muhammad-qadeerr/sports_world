import { useContext, useRef, useState } from "react";
import { FinanceContext } from "../contexts/FinanceContext";

const AthleteFrom = () => {
	const ctx = useContext(FinanceContext);
	const [status, setStatus] = useState<{ msg: string; ok: boolean | null }>({
		msg: "",
		ok: null,
	});

	const nameRef = useRef<HTMLInputElement | null>(null);
	const genderRef = useRef<HTMLInputElement | null>(null);
	const priceRef = useRef<HTMLInputElement | null>(null);
	const imageFileRef = useRef<HTMLInputElement | null>(null);

	if (!ctx) return null;

	const save = async () => {
		if (!nameRef.current || !genderRef.current || !priceRef.current) return;
		const name = nameRef.current.value.trim();
		const gender = genderRef.current.value.trim();
		const price = parseFloat(priceRef.current.value);
		const imageFile = imageFileRef.current?.files?.[0];

		// Validation
		if (!name || !gender || isNaN(price) || price <= 0) {
			setStatus({ msg: "Please fill all required fields correctly", ok: false });
			setTimeout(() => setStatus({ msg: "", ok: null }), 3000);
			return;
		}

		// Gender validation - must be male or female (case-insensitive)
		const normalizedGender = gender.toLowerCase();
		if (normalizedGender !== "male" && normalizedGender !== "female") {
			setStatus({ 
				msg: "Gender must be 'Male' or 'Female' (case-insensitive)", 
				ok: false 
			});
			setTimeout(() => setStatus({ msg: "", ok: null }), 3000);
			return;
		}

		// Create FormData
		const formData = new FormData();
		formData.append("Id", "0");
		formData.append("Name", name);
		formData.append("Gender", gender);
		formData.append("Price", price.toString());
		formData.append("PurchaseStatus", "false");
		
		// Handle image - if file is provided, use it
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
			// Clear form
			if (nameRef.current) nameRef.current.value = "";
			if (genderRef.current) genderRef.current.value = "";
			if (priceRef.current) priceRef.current.value = "";
			if (imageFileRef.current) imageFileRef.current.value = "";
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
				<label className="block text-gray-700 font-semibold mb-2">
					Athlete Name *
				</label>
				<input
					ref={nameRef}
					className="border-2 border-gray-300 p-3 w-full rounded focus:outline-none focus:border-blue-500"
					type="text"
					placeholder="Enter athlete's full name"
					required
				/>
			</div>

			<div className="mb-5">
				<label className="block text-gray-700 font-semibold mb-2">
					Gender *
				</label>
				<input
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
				<label className="block text-gray-700 font-semibold mb-2">
					Price ($) *
				</label>
				<input
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
				<label className="block text-gray-700 font-semibold mb-2">
					Upload Image File
				</label>
				<input
					ref={imageFileRef}
					className="border-2 border-gray-300 p-3 w-full rounded focus:outline-none focus:border-blue-500"
					type="file"
					accept="image/*"
				/>
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

export default AthleteFrom;

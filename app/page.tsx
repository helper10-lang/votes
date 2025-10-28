"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [theVoterName, setName] = useState("");
  return (
    <div className="poster-bg min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-6">
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            الاسم الرباعي
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            type="text"
            placeholder="اكتب الاسم هنا"
            className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>

        <Link
          href={`/names?name=${theVoterName}`}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          إرسال
        </Link>
      </div>
    </div>
  );
}

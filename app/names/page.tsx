/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface VoteData {
  // define shape of your API response, e.g.:
  voterName: string;
  votesCount: number;
  school: string;
  placeNumber: number;

  // add other fields you expect
}

export default function Home() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "";

  const [voteData, setVoteData] = useState<VoteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(voteData);
  useEffect(() => {
    if (!name) {
      setLoading(false);
      return;
    }

    const fetchVotes = async () => {
      try {
        const res = await fetch(`/api/voter?name=${encodeURIComponent(name)}`);
        if (!res.ok) {
          throw new Error(`Error fetching votes: ${res.status}`);
        }
        const json = await res.json();
        setVoteData(json);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchVotes();
  }, [name]);

  return (
    <div className="poster-bg min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">المرشح</p>
            <h1 className="text-3xl font-extrabold text-gray-900">
              محمود عادل شعّلان
            </h1>
            <p className="text-lg text-gray-700">
              مرشح حزب مستقبل وطن — دائرة بندر و مركز كفر الدوار
            </p>
          </div>

          <div className="space-y-3">
            {/* Example: Show vote data or placeholder */}
            {loading && <p>جاري التحميل...</p>}
            {error && <p className="text-red-500">خطأ: {error}</p>}

            <div>
              <label className="block text-gray-600">الاسم الرباعي :</label>
              <input
                type="text"
                className="text-black w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                value={voteData?.voterName}
              />
            </div>
            <div>
              <label className="block text-gray-600">اسم المدرسة :</label>
              <input
                type="text"
                value={voteData?.school}
                className="text-black w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">
                رقم اللجنة الفرعية :
              </label>
              <input
                type="text"
                value={voteData?.placeNumber}
                className="text-black w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">
                رقمك في الكشوف الإنتخابية :
              </label>
              <input
                type="text"
                value={voteData?.votesCount}
                className="text-black w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

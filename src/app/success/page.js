"use client";

import { useEffect, useState } from "react";

const SuccessPage = () => {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const sessionId = queryParams.get("session_id");

      if (sessionId) {
        try {
          const response = await fetch(
            `/api/get-session?session_id=${sessionId}`
          );
          const data = await response.json();

          if (response.ok) {
            setSession(data);
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError("An error occurred while fetching the session.");
        }
      }
    };

    fetchSession();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">
          Payment Successful!
        </h1>
        {error ? (
          <p className="text-[#F65D4E] text-center">{error}</p>
        ) : session ? (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-2">
              Thank you for your purchase!
            </h2>
            <p className="text-lg text-center mb-2">
              <span className="font-bold">Subscription Plan:</span>{" "}
              {session.mode}
            </p>
            <p className="text-lg text-center mb-4">
              <span className="font-bold">Session ID:</span> {session.id}
            </p>
            <p className="text-lg text-center">
              Your subscription will be active shortly.
            </p>
          </div>
        ) : (
          <p className="text-lg text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;

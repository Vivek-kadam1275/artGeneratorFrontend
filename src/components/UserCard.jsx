import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function UserCard({ userDetails }) {
    if (!userDetails) return null;

    const { name, email } = userDetails;
    // console.log(name,email);

    return (
        <div className="bg-purple-800 text-white w-80 p-6 rounded-xl shadow-lg border border-purple-400">
            <div className="flex flex-col items-center gap-4">
                <FaUserCircle className="text-6xl text-purple-300" />
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-sm text-purple-200">{email}</p>

                {/* Optional: Add Edit Button for future enhancements */}
                {/* <button className="mt-4 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-md transition">
          Edit Profile
        </button> */}
            </div>
        </div>
    );
}

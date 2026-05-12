import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/api";

export default function Dashboard() {

  const [stats, setStats] = useState({

    totalClients: 0,
    totalTemplates: 0,
    totalEmails: 0,
    totalDocuments: 0,

  });

  const fetchStats = async () => {

    try {

      const { data } = await api.get(
        "/dashboard/stats"
      );

      setStats(data.stats);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}
      <div
        className="
          w-[250px]
          min-h-screen
          bg-black
          text-white
          p-6
          shadow-2xl
        "
      >

        <h2 className="text-4xl font-bold mb-12">
          ClientFlow
        </h2>

        <div className="flex flex-col gap-6 text-xl">

          <Link
            to="/dashboard"
            className="
              hover:text-blue-400
              transition
            "
          >
            Dashboard
          </Link>

          <Link
            to="/clients"
            className="
              hover:text-blue-400
              transition
            "
          >
            Clients
          </Link>

          <Link
            to="/templates"
            className="
              hover:text-blue-400
              transition
            "
          >
            Templates
          </Link>

          <Link
            to="/emails"
            className="
              hover:text-blue-400
              transition
            "
          >
            Emails
          </Link>

          <Link
            to="/uploads"
            className="
              hover:text-blue-400
              transition
            "
          >
            Uploads
          </Link>

        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-10">

          Admin Dashboard

        </h1>

        <div className="grid grid-cols-4 gap-8">

          {/* CLIENTS */}
          <div
            className="
              bg-white
              p-8
              rounded-2xl
              shadow-lg
              hover:scale-105
              transition
            "
          >

            <h3 className="text-xl font-semibold">
              Total Clients
            </h3>

            <p className="text-5xl mt-4 font-bold text-blue-600">
              {stats.totalClients}
            </p>

          </div>

          {/* TEMPLATES */}
          <div
            className="
              bg-white
              p-8
              rounded-2xl
              shadow-lg
              hover:scale-105
              transition
            "
          >

            <h3 className="text-xl font-semibold">
              Templates
            </h3>

            <p className="text-5xl mt-4 font-bold text-green-600">
              {stats.totalTemplates}
            </p>

          </div>

          {/* EMAILS */}
          <div
            className="
              bg-white
              p-8
              rounded-2xl
              shadow-lg
              hover:scale-105
              transition
            "
          >

            <h3 className="text-xl font-semibold">
              Emails Sent
            </h3>

            <p className="text-5xl mt-4 font-bold text-purple-600">
              {stats.totalEmails}
            </p>

          </div>

          {/* DOCS */}
          <div
            className="
              bg-white
              p-8
              rounded-2xl
              shadow-lg
              hover:scale-105
              transition
            "
          >

            <h3 className="text-xl font-semibold">
              Uploaded Docs
            </h3>

            <p className="text-5xl mt-4 font-bold text-red-600">
              {stats.totalDocuments}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
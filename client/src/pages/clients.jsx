import { useEffect, useState } from "react";
import api from "../api/api";

export default function Clients() {

  const [clients, setClients] = useState([]);

  const fetchClients = async () => {

    try {

      // IMPORTANT
      // only /clients
      const { data } = await api.get("/clients");

      console.log(data);

      setClients(data.clients || []);

    } catch (error) {

      console.log(
        "Client fetch error:",
        error
      );

    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Clients Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all registered clients
          </p>

        </div>

        <div
          className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
            shadow
            font-semibold
            text-lg
          "
        >

          Total Clients:
          {" "}
          {clients.length}

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>

              <th className="p-5 text-left">
                Name
              </th>

              <th className="p-5 text-left">
                Email
              </th>

              <th className="p-5 text-left">
                Mobile
              </th>

              <th className="p-5 text-left">
                PAN
              </th>

              <th className="p-5 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {clients.length > 0 ? (

              clients.map((client) => (

                <tr
                  key={client.id}
                  className="
                    border-b
                    hover:bg-gray-50
                    transition
                  "
                >

                  <td className="p-5 font-medium">
                    {client.name}
                  </td>

                  <td className="p-5">
                    {client.email}
                  </td>

                  <td className="p-5">
                    {client.mobile || "-"}
                  </td>

                  <td className="p-5">
                    {client.pan || "-"}
                  </td>

                  <td className="p-5">

                    <span
                      className="
                        bg-green-100
                        text-green-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                      "
                    >
                      {client.status}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="
                    text-center
                    p-10
                    text-gray-500
                  "
                >

                  No clients found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
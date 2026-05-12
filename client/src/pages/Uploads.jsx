import { useEffect, useState } from "react";
import api from "../api/api";

export default function Uploads() {

  const [uploads, setUploads] = useState([]);

  const fetchUploads = async () => {

    try {

      const { data } = await api.get(
        "/upload/tracking"
      );

      setUploads(data.uploads || []);

    } catch (error) {

      console.log(
        "Upload fetch error:",
        error
      );

    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  return (

    <div className="p-8 min-h-screen bg-gray-100">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-bold">
          Uploaded Documents
        </h1>

        <div
          className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
            shadow
            text-lg
            font-semibold
          "
        >

          Total Files:
          {" "}
          {uploads.length}

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>

              <th className="p-5 text-left">
                Client
              </th>

              <th className="p-5 text-left">
                File
              </th>

              <th className="p-5 text-left">
                Uploaded At
              </th>

              <th className="p-5 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {uploads.length > 0 ? (

              uploads.map((item) => (

                <tr
                  key={item.id}
                  className="
                    border-b
                    hover:bg-gray-50
                    transition
                  "
                >

                  <td className="p-5 font-medium">

                    {item.client?.name}

                  </td>

                  <td className="p-5">

                    {item.fileName}

                  </td>

                  <td className="p-5 text-gray-600">

                    {new Date(
                      item.uploadedAt
                    ).toLocaleString()}

                  </td>

                  <td className="p-5">

                    <a
                      href={`http://localhost:5000/uploads/${item.filePath.split("\\").pop()}`}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        transition
                      "
                    >
                      View File
                    </a>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="
                    p-10
                    text-center
                    text-gray-500
                  "
                >

                  No uploaded documents found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
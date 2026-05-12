import { useEffect, useState } from "react";
import api from "../api/api";

export default function Emails() {

  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {

    try {

      // DON'T ADD /api HERE
      const { data } = await api.get(
        "/email/history"
      );

      setEmails(data.emails || []);

    } catch (error) {

      console.log(
        "Email fetch error:",
        error
      );

    }

  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Email History
          </h1>

          <p className="text-gray-500 mt-2">
            View all sent emails
          </p>

        </div>

        <div
          className="
            bg-green-600
            text-white
            px-6
            py-3
            rounded-xl
            shadow
            font-semibold
            text-lg
          "
        >

          Total Emails:
          {" "}
          {emails.length}

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
                Email
              </th>

              <th className="p-5 text-left">
                Subject
              </th>

              <th className="p-5 text-left">
                Sent At
              </th>

            </tr>

          </thead>

          <tbody>

            {emails.length > 0 ? (

              emails.map((mail) => (

                <tr
                  key={mail.id}
                  className="
                    border-b
                    hover:bg-gray-50
                    transition
                  "
                >

                  <td className="p-5 font-medium">
                    {mail.client?.name || "-"}
                  </td>

                  <td className="p-5">
                    {mail.client?.email || "-"}
                  </td>

                  <td className="p-5">
                    {mail.subject || "-"}
                  </td>

                  <td className="p-5 text-gray-600">

                    {mail.sentAt
                      ? new Date(
                          mail.sentAt
                        ).toLocaleString()
                      : "-"}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="
                    text-center
                    p-10
                    text-gray-500
                  "
                >

                  No emails found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}
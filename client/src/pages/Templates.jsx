import { useEffect, useState } from "react";
import api from "../api/api";

export default function Templates() {

  const [templates, setTemplates] = useState([]);

  const fetchTemplates = async () => {

    try {

      // DON'T ADD /api HERE
      const { data } = await api.get(
        "/templates"
      );

      setTemplates(data.templates || []);

    } catch (error) {

      console.log(
        "Template fetch error:",
        error
      );

    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Email Templates
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all email templates
          </p>

        </div>

        <div
          className="
            bg-purple-600
            text-white
            px-6
            py-3
            rounded-xl
            shadow
            font-semibold
            text-lg
          "
        >

          Total Templates:
          {" "}
          {templates.length}

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {templates.length > 0 ? (

          templates.map((template) => (

            <div
              key={template.id}
              className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
                hover:shadow-2xl
                transition
              "
            >

              <h2 className="text-2xl font-bold text-gray-800 mb-3">

                {template.name}

              </h2>

              <p className="text-gray-500 mb-4">

                Subject:
                {" "}
                {template.subject}

              </p>

              <div
                className="
                  bg-gray-100
                  rounded-xl
                  p-4
                  h-[250px]
                  overflow-auto
                  text-sm
                  text-gray-700
                "
              >

                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      template.html ||
                      "<p>No content</p>",
                  }}
                />

              </div>

            </div>

          ))

        ) : (

          <div
            className="
              bg-white
              p-10
              rounded-2xl
              shadow
              text-center
              text-gray-500
              col-span-2
            "
          >

            No templates found

          </div>

        )}

      </div>

    </div>
  );
}
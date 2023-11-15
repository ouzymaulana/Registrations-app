import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DataRegistrations() {
  const [data, setData] = useState([]);
  const handleSubmit = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <main className="h-screen bg-violet-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded-3xl">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-2 text-center">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-2 text-center">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-2 text-center">
                        Address
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, i) => (
                      <tr className="border-b dark:border-neutral-500" key={i}>
                        <td className="whitespace-nowrap px-6 py-2">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {item.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {item.address}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

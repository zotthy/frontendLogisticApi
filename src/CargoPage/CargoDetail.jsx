import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MapTest from "/Users/sebastianstarzec/LogisticApiFront/my-project/src/assets/mapTest.png";

function CargoDetail() {
  const { id } = useParams();
  const [cargoDetails, setCargoDetails] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Token"));
    console.log(token);
    axios
      .get(`http://localhost:8080/cargo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCargoDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  console.log(cargoDetails)
  if (!cargoDetails) return null;

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h1 className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Cargo detail
        </h1>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Price
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {cargoDetails.price}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Type cargo
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {cargoDetails.typeCargo}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Owner
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {cargoDetails.owner}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Create cargo
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {cargoDetails.localDateTime}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Load address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p>{cargoDetails.loadAddress.city}</p>
              <p>{cargoDetails.loadAddress.province}</p>
              <p>{cargoDetails.loadAddress.zip_code}</p>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Unload address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p>{cargoDetails.unloadAddress.city}</p>
              <p>{cargoDetails.unloadAddress.province}</p>
              <p>{cargoDetails.unloadAddress.zip_code}</p>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Map</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <img
                width="500"
                height="300"
                src={MapTest}
                className="border-4 rounded-md"
              />
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              <h1>fds</h1>
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <a href={`/getJob/${cargoDetails.id}`}>Get Job</a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
export default CargoDetail;

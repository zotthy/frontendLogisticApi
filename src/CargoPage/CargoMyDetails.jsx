import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MapRender from "../components/MapRender/MapRender.jsx";

function CargoMyDetails() {
  const { id } = useParams();
  const [cargoDetails, setCargoDetails] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Token"));
    console.log(token);
    axios
      .get(`${import.meta.env.VITE_API_URL}/my/cargo/${id}`, {
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

  console.log(cargoDetails);
  if (!cargoDetails) return null;

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h1 className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Szczególy ładunku
        </h1>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Stawka za przewóz
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {`${cargoDetails.price} zł`}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Opis
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {cargoDetails.typeCargo}
            </dd>
          </div>
        
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Data utworzenia
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {cargoDetails.cargoDateTime}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Adres załadunku
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p>{cargoDetails.loadAddress.city}</p>
              <p>{cargoDetails.loadAddress.street}</p>
              <p>{cargoDetails.loadAddress.province}</p>
              <p>{cargoDetails.loadAddress.zip_code}</p>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Adres rozładunku
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p>{cargoDetails.unloadAddress.city}</p>
              <p>{cargoDetails.unloadAddress.street}</p>
              <p>{cargoDetails.unloadAddress.province}</p>
              <p>{cargoDetails.unloadAddress.zip_code}</p>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Przewoźnik
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p>{cargoDetails.handlerFirstName}</p>
              <p>{cargoDetails.handlerLastName}</p>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Kierowca
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p>{cargoDetails.driverFirstName}</p>
              <p>{cargoDetails.driverSurname}</p>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Mapa</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <MapRender startAddress={cargoDetails.loadAddress.city} endAddress={cargoDetails.unloadAddress.city}/>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default CargoMyDetails;

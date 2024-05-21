// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import axios from "axios";
import BoxIcon from "../assets/box.svg";
import DivData from "../components/DataDisplay/DivData.jsx";

function CargoActual() {
    const [actualCargo, setActualCargo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("Token"));
        console.log(token);
        axios
            .get(`http://localhost:8080/my/actual/cargo?page=${currentPage - 1}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setActualCargo(response.data.content);
                console.log(response.data.content);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [currentPage]);

    const handlePreviousPage = (event) => {
        event.preventDefault();
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = (event) => {
        event.preventDefault();
        setCurrentPage(prev => prev + 1);
    };

    if (!actualCargo) return null;

    return (
        <>
            <div className="flex items-center justify-center min-h-6">
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="text-green-500">
                <img src={BoxIcon} className="h-8" alt="image"/>
              </span>
                        <span className="tracking-wide">Aktualne zlecenia</span>
                    </div>

                    <div className="text-gray-600">
                        <div className="grid md:grid-cols-6 text-sm border-b-4 border-indigo-500">
                            <DivData value={"Price"}/>
                            <DivData value={"Type"}/>
                            <DivData value={"Owner"}/>
                            <DivData value={"Loads"}/>
                            <DivData value={"Unload"}/>
                        </div>
                    </div>

                    {actualCargo.map((data, index) =>
                        <div key={index} className="text-gray-600 border-b-4">
                            <div className="grid md:grid-cols-6 text-sm">
                                <DivData value={data.cargoPrice}/>
                                <DivData value={data.typeCargo}/>
                                <DivData value={data.cargoOwner}/>
                                <DivData value={data.loadAddress.city}/>
                                <DivData value={data.unloadAddress.city}/>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold"><a
                                        href={`/my/cargo/${data.cargoId}`}>edw</a></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="">
                        <a href="#" onClick={handlePreviousPage} className="items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border
            border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
            dark:hover:bg-gray-700 dark:hover:text-white">
                            Previous
                        </a>
                        <a href="#" onClick={handleNextPage} className="items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border
            border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
            dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                        </a>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CargoActual;
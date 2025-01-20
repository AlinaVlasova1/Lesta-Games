import React, {useEffect, useState} from "react";
import {IVehicleModel} from "../../models/IVehicleModel.ts";
import {VehiclesCard} from "../../component/VehiclesCard/VehiclesCard.tsx";
import style from "./main.module.scss";
import {VehicleService} from "../../services/vehicle-service.ts";
import {useDebounce} from "../../hooks/useDebounce.tsx";

export default function Main(): React.JSX.Element {
    const [vehicles, setVehicles] = useState<Array<IVehicleModel> | null>(null);
    const [nameVehicles, setNameVehicles] = useState<string>('');
    const debounceSearch = useDebounce(getVehicleByName, 800);
    // const entry = 'I-56';
    const vehicleService: VehicleService = new VehicleService();
    useEffect(() => {
        getAllVehicles();
    },[])

    function getAllVehicles() {
        vehicleService.getAllVehicles().then((r) => r.json())
            .then((data) => {
                const vehicles = data.data.vehicles;
                setVehicles(vehicles);
                console.log('data redataturned:', data);

            })
    }

    function getVehicleByName() {

        vehicleService.getVehicleByName(nameVehicles).then((r) => r.json())
            .then((data) => {
                const vehicles = data.data.vehicles;
                setVehicles(vehicles);
                console.log('data redataturned:', data);

            })
    }

    function updateSearchNameVehicle(e: any) {
        console.log("updateSearchNameVehicle", e);
        setNameVehicles(e.target.value);
        debounceSearch();
    }

    return (
        <div  className={style.main}>
            <h1>Все корабли игры «Мир Кораблей»</h1>
            <input value={nameVehicles} onChange={(e) => updateSearchNameVehicle(e)} />
            <div className={style.cards}>
                {vehicles && vehicles.map((vehicle: IVehicleModel, index) =>
                    <VehiclesCard title={vehicle.title}
                                  description={vehicle.description}
                                  icons={vehicle.icons}
                                  level={vehicle.level}
                                  nation={vehicle.nation}
                                  type={vehicle.type} key={index}></VehiclesCard>
                )}
            </div>

        </div>

    )
}


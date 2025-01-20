import React, {useEffect, useState} from "react";
import {IVehicleModel} from "../../models/IVehicleModel.ts";
import {VehiclesCard} from "../../component/VehiclesCard/VehiclesCard.tsx";
import style from "./main.module.scss";

export default function Main(): React.JSX.Element {
    const [vehicles, setVehicles] = useState<Array<IVehicleModel> | null>(null);
    const query = `query Vehicles($languageCode: String = "ru") {
 vehicles(lang: $languageCode) {
 title
 description
 icons {
 large
 medium
 }
 level
 type {
 name
 title
 icons {
 default
 }
 }
 nation {
 name
 title
 color
 icons {
 small
 medium
 large
 }
 }
 }
}
`
    // const entry = 'I-56'
    useEffect(() => {
        fetch('https://vortex.korabli.su/api/graphql/glossary/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                query,
                // variables: {
                //     title: entry,
                // },
            }),
        })
            .then((r) => r.json())
            .then((data) => {
              const vehicles = data.data.vehicles;
              setVehicles(vehicles);
                console.log('data redataturned:', data);

            })
    })

    return (
        <div  className={style.main}>
            <h1>Все корабли игры «Мир Кораблей»</h1>
            <div className={style.cards}>
                {vehicles && vehicles.map((vehicle: IVehicleModel) =>
                    <VehiclesCard title={vehicle.title}
                                  description={vehicle.description}
                                  icons={vehicle.icons}
                                  level={vehicle.level}
                                  nation={vehicle.nation}
                                  type={vehicle.type}></VehiclesCard>
                )}
            </div>

        </div>

    )
}


import React, {useEffect} from "react";
import {IVehicleModel} from "../../models/IVehicleModel.ts";
import {VehiclesCard} from "../../component/VehiclesCard/VehiclesCard.tsx";
import style from "./main.module.scss";
import {VehicleService} from "../../services/vehicle-service.ts";
import {useDebounce} from "../../hooks/useDebounce.tsx";
import vehicleStore from '../../stores/vehlicle-store.tsx';
import { observer } from "mobx-react-lite";

type Function = (value: unknown) => void;


export default observer(
    function Main(): React.JSX.Element {
        const searchNamedDebounce = useDebounce(getVehicleByName, 800);
        const searchClassDebounce = useDebounce(getVehicleByClass, 800);
        const searchNationDebounce = useDebounce(getVehicleByNation, 800);
        const searchLevelDebounce = useDebounce(getVehicleByLevel, 800);
        
        const {displayedPageVehicles, updateVehicle, showVehiclesByLevel,
            showVehiclesByNation, showVehiclesByClass, showVehiclesByName,} = vehicleStore;
        // const entry = 'I-56';
        // Подводная лодка
        const vehicleService: VehicleService = new VehicleService();
        const nameVehicles: string = '';
        const classVehicles: string = '';
        const nationVehicles: string = '';
        const levelVehicles: number | undefined = undefined;
        useEffect(() => {
            getAllVehicles();
        },[])

        function getAllVehicles() {
            vehicleService.getAllVehicles().then((r) => r.json())
                .then((data) => {
                    const vehicles = data.data.vehicles;
                    updateVehicle(vehicles);
                })
        }

        function getVehicleByName(value: string) {
            console.log('nameVehicles', value)
            showVehiclesByName(value)
        }

        function getVehicleByClass(value: string) {
            showVehiclesByClass(value)
        }

        function getVehicleByNation(value: string) {
            showVehiclesByNation(value)
        }

        function getVehicleByLevel(value: number) {
            showVehiclesByLevel(Number(value))
        }

        function updateSearchNameVehicle(e: {target: {value: unknown}}, method: Function) {
            console.log('updateSearchNameVehicle', e);
            console.log('typeof', typeof method);
            method(e.target?.value)
        }

        return (
            <div className={style.main}>
                <h1>Все корабли игры «Мир Кораблей»</h1>
                <div>
                    <span>Название корабля</span>
                    <input name={nameVehicles} onChange={(e) => updateSearchNameVehicle(e, searchNamedDebounce)}/>
                </div>
                <div>
                    <span>Класс корабля</span>
                    <input value={classVehicles} onChange={(e) => updateSearchNameVehicle(e, searchClassDebounce)}/>
                </div>
                <div>
                    <span>Нация корабля</span>
                    <input value={nationVehicles} onChange={(e) => updateSearchNameVehicle(e, searchNationDebounce)}/>
                </div>
                <div>
                    <span>Уровень корабля</span>
                    <input value={levelVehicles} onChange={(e) => updateSearchNameVehicle(e, searchLevelDebounce)}/>
                </div>

                <div className={style.cards}>
                    {displayedPageVehicles && displayedPageVehicles.map((vehicle: IVehicleModel, index) =>
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
)


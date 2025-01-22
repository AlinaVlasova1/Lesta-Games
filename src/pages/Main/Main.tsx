import React, {useEffect} from "react";
import {IVehicle} from "../../models/vehicle-model.ts";
import {VehicleCard} from "../../component/VehiclesCard/VehicleCard.tsx";
import style from "./main.module.scss";
import {VehicleService} from "../../services/vehicle-service.ts";
import {useDebounce} from "../../hooks/useDebounce.tsx";
import vehicleStore from '../../stores/vehlicle-store.tsx';
import { observer } from "mobx-react-lite";
import Pagination from '@mui/material/Pagination';
type Function = (value: unknown) => void;


export default observer(
    function Main(): React.JSX.Element {
        const searchNameDebounce = useDebounce(getVehicleByName, 800);
        const searchClassDebounce = useDebounce(getVehicleByClass, 800);
        const searchNationDebounce = useDebounce(getVehicleByNation, 800);
        const searchLevelDebounce = useDebounce(getVehicleByLevel, 800);
        
        const {displayedPageVehicles, updateVehicle, showVehiclesByLevel, goToPage,
            showVehiclesByNation, showVehiclesByClass, showVehiclesByName, pagesCount} = vehicleStore;

        const vehicleService: VehicleService = new VehicleService();
        const searchName: string = '';
        const searchClass: string = '';
        const searchNation: string = '';
        const searchLevel: number | undefined = undefined;

        useEffect(() => {
            getAllVehicles();
        }, [])

        function getAllVehicles() {
            vehicleService.getAllVehicles()
                .then((data) => {
                    const vehicles = data.data.vehicles;
                    updateVehicle(vehicles);
                }).catch((err) => {
                    alert(`Ошибка: ${err.status}`);
                return Promise.reject(err);
            });
        }

        function getVehicleByName(value: string) {
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

        function updateSearchNameVehicle(event: {target: {value: unknown}}, method: Function) {
            method(event.target?.value)
        }

        function changePage(_: React.ChangeEvent<unknown>, page: number) {
            goToPage(page);
        }

        return (
            <div className={style.main}>
                <h1>Все корабли игры «Мир Кораблей»</h1>
                <div className={style.fields}>
                    <div>
                        <span>Название корабля</span>
                        <input name={searchName}
                               onChange={(event) => updateSearchNameVehicle(event, searchNameDebounce)}/>
                    </div>
                    <div>
                        <span>Класс корабля</span>
                        <input value={searchClass}
                               onChange={(event) => updateSearchNameVehicle(event, searchClassDebounce)}/>
                    </div>
                    <div>
                        <span>Нация корабля</span>
                        <input value={searchNation}
                               onChange={(event) => updateSearchNameVehicle(event, searchNationDebounce)}/>
                    </div>
                    <div>
                        <span>Уровень корабля</span>
                        <input value={searchLevel}
                               onChange={(event) => updateSearchNameVehicle(event, searchLevelDebounce)}/>
                    </div>
                </div>


                <div className={style.cards}>
                    {displayedPageVehicles && displayedPageVehicles.map((vehicle: IVehicle, index) =>
                        <VehicleCard title={vehicle.title}
                                     description={vehicle.description}
                                     icons={vehicle.icons}
                                     level={vehicle.level}
                                     nation={vehicle.nation}
                                     type={vehicle.type} key={index}></VehicleCard>
                    )}
                </div>
                {Boolean(pagesCount) && <Pagination count={pagesCount}
                                           onChange={(event: React.ChangeEvent<unknown>, page: number) => changePage(event, page)}
                                           className={style.pagination}
                                           defaultPage={1}></Pagination>}
            </div>

        )
    }
)


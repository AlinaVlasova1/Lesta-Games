import {IVehicle} from "../../models/vehicle-model.ts";
import style from "./vehicles.module.css";

export const VehicleCard: React.FunctionComponent<IVehicle> = (item) => {

    return (
        <div className={style.vehiclesCard}>
            <h1>Название корабля: {item.title}</h1>
            <img src={item.icons.large} alt={item.title} />
            <span>Класс корабля: {item.type.title}</span>
            <span>Класс корабля: {item.type.title}</span>
            <span>Нация корабля: {item.nation.title}</span>
            <span>Уровень корабля: {item.level}</span>
            <span>Описание корабля: {item.description}</span>
        </div>
    )
};
import {IVehicle} from "./vehicle-model.ts";

export interface IVehicleResponse {
    data: {
        vehicles: Array<IVehicle>
    }
}
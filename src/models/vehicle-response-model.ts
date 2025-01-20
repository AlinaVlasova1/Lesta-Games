import {IVehicleModel} from "./IVehicleModel.ts";

export interface IVehicleResponseModel {
    data: {
        vehicles: Array<IVehicleModel>
    }
}
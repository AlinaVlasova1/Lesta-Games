import {IVehicleModel} from "../models/IVehicleModel.ts";
import {action, makeObservable, observable} from "mobx";

class VehicleStore {
    vehicles: IVehicleModel[] = [];
    copyVehicles: IVehicleModel[] = [];
    displayedPageVehicles: IVehicleModel[] = [];
    displayedVehiclesCount: number = 9;
    pageCount: number = 0;


    constructor() {
        makeObservable(this, {
            vehicles: observable,
            displayedPageVehicles: observable,
            updateVehicle: action,
            goToPage: action,
            showVehiclesByLevel: action,
            showVehiclesByNation: action,
            showVehiclesByClass: action,
            showVehiclesByName: action,
        });
    }

    updateVehicle = (vehicles: IVehicleModel[])=> {
        this.vehicles = vehicles;
        this.copyVehicles = vehicles;
        this.displayedPageVehicles = vehicles.splice(0, (this.displayedVehiclesCount - 1));
        this.pageCount = vehicles.length/this.displayedVehiclesCount;
    }

    goToPage(page: number) {
        this.displayedPageVehicles = this.vehicles.splice(page, (page + this.displayedVehiclesCount));
    }

    showVehiclesByLevel = (level: number) => {
        const newArr= this.vehicles.filter((vehicle) => vehicle.level === level);
        this.displayedPageVehicles = newArr.splice(0, (this.displayedVehiclesCount - 1));
        this.pageCount = this.vehicles.length/this.displayedVehiclesCount;
    }

    showVehiclesByNation = (nation: string) => {
        const newArr = this.vehicles.filter(vehicle => vehicle.nation.title.toLowerCase().includes(nation.toLowerCase()));
        this.displayedPageVehicles = newArr.splice(0, (this.displayedVehiclesCount - 1));
        this.pageCount = this.vehicles.length/this.displayedVehiclesCount;
    }

    showVehiclesByClass = (type: string) => {
        const newArr = this.vehicles.filter(vehicle => vehicle.type.title.toLowerCase().includes(type.toLowerCase()));
        this.displayedPageVehicles = newArr.splice(0, (this.displayedVehiclesCount - 1));
        this.pageCount = newArr.length/this.displayedVehiclesCount;
    }

    showVehiclesByName = (name: string) => {
        const newArr = this.vehicles.filter(vehicle => vehicle.title.toLowerCase().includes(name.toLowerCase()));
        this.displayedPageVehicles = newArr.splice(0, (this.displayedVehiclesCount - 1));
        this.pageCount = newArr.length/this.displayedVehiclesCount;
    }
}

export default new VehicleStore();
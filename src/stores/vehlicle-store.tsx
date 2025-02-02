import {IVehicle} from "../models/vehicle-model.ts";
import {action, makeObservable, observable} from "mobx";

class VehicleStore {
    vehicles: IVehicle[] = [];
    displayedPageVehicles: IVehicle[] = [];
    displayedVehiclesCount: number = 9;
    pagesCount: number = 0;


    constructor() {
        makeObservable(this, {
            vehicles: observable,
            displayedPageVehicles: observable,
            pagesCount: observable,
            updateVehicle: action,
            goToPage: action,
            showVehiclesByLevel: action,
            showVehiclesByNation: action,
            showVehiclesByClass: action,
            showVehiclesByName: action,
        });
    }

    updateVehicle = (vehicles: IVehicle[])=> {
        this.vehicles = vehicles;
        this.displayedPageVehicles = vehicles.slice(0, (this.displayedVehiclesCount - 1));
        this.pagesCount = Math.ceil(vehicles.length/this.displayedVehiclesCount);
    }

    goToPage = (page: number)=> {
        this.displayedPageVehicles = this.vehicles.slice(page, (page + this.displayedVehiclesCount));
    }

    showVehiclesByLevel = (level: number) => {
        const newArr= this.vehicles.filter((vehicle) => vehicle.level === level);
        this.displayedPageVehicles = newArr.splice(0, (this.displayedVehiclesCount - 1));
        this.pagesCount =  Math.ceil(newArr.length/this.displayedVehiclesCount);
    }

    showVehiclesByNation = (nation: string) => {
        const newArr = this.vehicles.filter(vehicle => vehicle.nation.title.toLowerCase().includes(nation.toLowerCase()));
        this.displayedPageVehicles = newArr.splice(0, (this.displayedVehiclesCount - 1));
        this.pagesCount =  Math.ceil(newArr.length/this.displayedVehiclesCount);
    }

    showVehiclesByClass = (type: string) => {
        const newArr = this.vehicles.filter(vehicle => vehicle.type.title.toLowerCase().includes(type.toLowerCase()));
        this.displayedPageVehicles = newArr.splice(0, (this.displayedVehiclesCount - 1));
        this.pagesCount = Math.ceil(newArr.length/this.displayedVehiclesCount);
    }

    showVehiclesByName = (name: string) => {
        const newArr = this.vehicles.filter(vehicle => vehicle.title.toLowerCase().includes(name.toLowerCase()));
        this.displayedPageVehicles = newArr.splice(0, (this.displayedVehiclesCount - 1));
        this.pagesCount = Math.ceil(newArr.length/this.displayedVehiclesCount);
    }
}

export default new VehicleStore();
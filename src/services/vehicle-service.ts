import {ApiUrlFactory} from "./api-url-factory.ts";
import {IVehicleResponse} from "../models/vehicle-response-model.ts";

export class VehicleService {

    private readonly url= ApiUrlFactory.create('graphql/glossary/');
    private readonly query= `query Vehicles($languageCode: String = "ru") {
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
                                                        `;


    getAllVehicles(): Promise<IVehicleResponse> {
        return fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                query: this.query,
            })
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log(response);
                return Promise.reject(response);
            }

        })
    }
}
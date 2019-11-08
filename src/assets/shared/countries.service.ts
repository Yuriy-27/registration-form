import { Injectable } from '@angular/core';

// export interface UserLocation {
//   userCountry: string;
//   userState: string[];
//   userCity: string[];
// }

export interface Country {
    id: number;
    name: string;
    states: ReadonlyArray<State>;
}


export interface State {
    id: number;
    name: string;
    cities: ReadonlyArray<City>;
}

export interface City {
    id: number;
    name: string;
}

const CountriesList: ReadonlyArray<Country> = [
    {
        id: 1,
        name: 'USA',
        states: [
            {
                id: 1,
                name: 'California',
                cities: [
                    {
                        id: 1,
                        name: 'Sacramento'
                    }
                ]
            },
            {
                id: 2,
                name: 'Arkansas',
                cities: [
                    {
                        id: 1,
                        name: 'Little Rock'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Ukraine',
        states: [
            {
                id: 1,
                name: 'Kyiv region',
                cities: [
                    {
                        id: 1,
                        name: 'Kyiv'
                    },
                    {
                        id: 2,
                        name: 'Brovary'
                    },
                    {
                        id: 3,
                        name: 'Boryspil'
                    }
                ]
            },
            {
                id: 2,
                name: 'Odessa region',
                cities: [
                    {
                        id: 1,
                        name: 'Odessa'
                    },
                    {
                        id: 2,
                        name: 'Balta'
                    },
                    {
                        id: 3,
                        name: 'Podilsk'
                    }
                ]
            }
        ]
    }

];



@Injectable({
  providedIn: 'root'
})

export class CountriesService {
    private countries: ReadonlyArray<Country> = CountriesList;

    getCountries(): ReadonlyArray<Country> {
        return this.countries;
    }

    getStates(countryId: number): ReadonlyArray<State> {
        const country: Country = this.countries.find((countryId) => countryId.id );
        if (country != null) {
            return country.states;
        }
    }
}

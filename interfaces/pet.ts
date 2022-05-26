export interface IPet {
    id: number,
    name: string,
    colorMain: string,
    colorSecondary: string,
    weight: number,
    sex: string,
    sterilization: boolean,
    image: any,
    birth_date: string,
    creation_date: string,
    update_date: string,
    
    breed: {
        id: number,
        name: string,
        species: {
            id: number,
            name: number
        }
    }
}
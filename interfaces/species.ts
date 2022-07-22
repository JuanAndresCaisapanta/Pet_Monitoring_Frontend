export interface ISpecies{
    id: number;
    name: string
}

export interface ISpecies extends Array<ISpecies> {}
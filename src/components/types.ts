export interface IGetCars {
  name: string,
  color: string,
  id: number
}

export interface ICars {
  length: number;
  [index: number]: IGetCars;
}

export type Body = {
  name:string,
  color:string
};

export interface IStartEngine {
  velocity:number,
  distance:number
}

export interface ISwitchEngine {
  success: boolean
}
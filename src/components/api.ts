import { ICars } from './types';
import { Body } from './types';

const url = `http://127.0.0.1:3000`;

export const getCars = async ():Promise <ICars | undefined> => {
  try {
    const response = await fetch(`${url}/garage`);
    const cars:[] = await response.json();
    return (cars);
  } catch (err) {
    console.log(err);
  }
};

export const postCars = async (body:Body) => {
  const response = await fetch(`${url}/garage`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Error');
  }
  const cars:[] = await response.json();
  return (cars);
};

export const deleteCars = async (id:number):Promise <ICars | undefined> => {
  try {
    const response = await fetch(`${url}/garage/${id}`, {
      method: 'DELETE',
    });
    const cars:[] = await response.json();
    return (cars);
  } catch (err) {
    console.log(err);
  }
};

export const putCars = async (id:number, body:Body):Promise <ICars | undefined> => {
  try {
    const response = await fetch(`${url}/garage/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const cars:[] = await response.json();
    return (cars);
  } catch (err) {
    console.log(err);
  }
};

export const startEngine = async (id:number) => {
  try {
    const response = await fetch(`${url}/engine?id=${id}&status=started`, {
      method: 'PATCH',
    });
    const cars = await response.json();
    return (cars);
  } catch (err) {
    console.log(err);
  }
};

export const stopEngine = async (id:number) => {
  try {
    const response = await fetch(`${url}/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    return (response);
  } catch (err) {
    console.log(err);
  }
};

export const switchEngine = async (id:number) => {
  try {
    const response = await fetch(`${url}/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    const cars = await response.json();
    return cars;
  } catch (err) {
    console.log(err);
  }
};

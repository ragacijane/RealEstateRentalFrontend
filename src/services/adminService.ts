import type { OwnerItem } from "@/typesAndUtils/types";
import { get, post } from "./apiService";
import { BACKEND_URL } from "@/constants/constant";

export async function fetchProperties(): Promise<OwnerItem[]> {
    const response = await get<OwnerItem[]>(`${BACKEND_URL}/ownersandproperties`);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data ?? [];
  }

  export async function uploadImages(id: number,body: any){
    let url = BACKEND_URL+`/upload/`+id;
    const data = post(url,body);
  };

  export async function createProperty(body: any){
  };

  export async function updateProperty(id: number,body: any) {
  };
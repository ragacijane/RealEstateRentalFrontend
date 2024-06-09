import type { OwnerItem, OwnerItemBodyRequest } from "@/typesAndUtils/types";
import { get, post } from "./apiService";
import { BACKEND_URL } from "@/constants/constant";
import { getEmptyItem } from "@/typesAndUtils/utils";

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

  export async function createProperty(body: OwnerItemBodyRequest){
    const response = await post<OwnerItem>("",body);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data ?? getEmptyItem();
  };

  export async function updateProperty(id: number,body: OwnerItemBodyRequest) {
  };
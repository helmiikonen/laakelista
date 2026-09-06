import type { 
  CreateUserMedicineRequest, 
  UpdateUserMedicineRequest 
} from "./types"

const API_URL = "http://localhost:5027"

export async function searchMedicines(query: string, page: number, pageSize: number) {
  
  const response = await fetch(
    `${API_URL}/api/medicines/search?query=${encodeURIComponent(query)}&page=${encodeURIComponent(page.toString())}&pageSize=${encodeURIComponent(pageSize.toString())}`
  )

  if (!response.ok) {
    throw new Error("Lääkkeiden haku epäonnistui")
  }

  return response.json()
}

export async function getUserMedicines(userId: number) {
  const response = await fetch(
    `${API_URL}/api/UserMedicines?userId=${userId}`
  )

  if (!response.ok) {
    throw new Error("Käyttäjän lääkkeiden haku epäonnistui")
  }

  return response.json()
}

export async function addUserMedicine(
  request: CreateUserMedicineRequest
) {
  const response = await fetch(
    `${API_URL}/api/UserMedicines`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  )

  if (!response.ok) {
    throw new Error("Lääkkeen lisääminen epäonnistui")
  }

  return response.json()
}

export async function updateUserMedicine(
  id: number,
  request: UpdateUserMedicineRequest
) {
  const response = await fetch(
    `${API_URL}/api/UserMedicines/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  )

  if (!response.ok) {
    throw new Error("Lääkkeen muokkaaminen epäonnistui")
  }
}

export async function deleteUserMedicine(
  id: number,
  userId: number
) {
  const response = await fetch(
    `${API_URL}/api/UserMedicines/${id}?userId=${userId}`,
    {
      method: "DELETE",
    }
  )

  if (!response.ok) {
    throw new Error("Lääkkeen poistaminen epäonnistui")
  }
}
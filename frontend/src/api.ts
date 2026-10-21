import type { 
  CreateUserMedicineRequest, 
  UpdateUserMedicineRequest 
} from "./types"

const API_URL = "http://localhost:5027"

async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
  })
}

export async function register(
  username: string,
  password: string
) {
  const response = await apiFetch("/api/Auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error("Rekisteröityminen epäonnistui")
  }

  return response.json()
}

export async function login(
  username: string,
  password: string
) {
  const response = await apiFetch("/api/Auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error("Kirjautuminen epäonnistui")
  }

}

export async function getCurrentUser() {
  const response = await apiFetch("/api/Auth/me")

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function logout() {
  const response = await apiFetch("/api/Auth/logout", {
    method: "POST",
  })

  if (!response.ok) {
    throw new Error("Uloskirjautuminen epäonnistui")
  }
}

export async function searchMedicines(query: string, page: number, pageSize: number) {
  
  const response = await fetch(
    `${API_URL}/api/medicines/search?query=${encodeURIComponent(query)}&page=${encodeURIComponent(page.toString())}&pageSize=${encodeURIComponent(pageSize.toString())}`
  )

  if (!response.ok) {
    throw new Error("Lääkkeiden haku epäonnistui")
  }

  return response.json()
}

export async function getUserMedicines() {
  const response = await apiFetch("/api/UserMedicines")

  if (!response.ok) {
    throw new Error("Käyttäjän lääkkeiden haku epäonnistui")
  }

  return response.json()
}

export async function addUserMedicine(
  request: CreateUserMedicineRequest
) {
  const response = await apiFetch("/api/UserMedicines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error("Lääkkeen lisääminen epäonnistui")
  }

  return response.json()
}

export async function updateUserMedicine(
  id: number,
  request: UpdateUserMedicineRequest
) {
  const response = await apiFetch(`/api/UserMedicines/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error("Lääkkeen muokkaaminen epäonnistui")
  }
}

export async function deleteUserMedicine(id: number) {
  const response = await apiFetch(`/api/UserMedicines/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Lääkkeen poistaminen epäonnistui")
  }
}
import type { 
  CreateUserMedicineRequest, 
  UpdateUserMedicineRequest 
} from "./types"

const API_URL = "http://localhost:5027"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
  })
}

export async function register(username: string, password: string) {
  const response = await apiFetch("/api/Auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })

  
  if (!response.ok) {
    let data: unknown = null;

    try {
      data = await response.json();
    } catch {
      // Palvelimen vastaus ei sisältänyt luettavaa JSON-dataa.
    }

    // Näytetään backendin oma virheilmoitus, jos sellainen löytyy.
    if (isRecord(data) && typeof data.message === "string") {
      throw new Error(data.message);
    }

    const codes: string[] =
      Array.isArray(data)
        ? data.map((error: { code?: string }) =>
            isRecord(error) && typeof error.code === "string"
              ? error.code
              : ""
          )
        : [];

    if (codes.includes("DuplicateUserName")) {
      throw new Error(
        "Käyttäjätunnus on jo käytössä. Valitse toinen käyttäjätunnus."
      );
    }

    if (codes.some((code) => code.startsWith("Password"))) {
      throw new Error(
        "Salasana ei täytä vaatimuksia. Käytä vähintään 8 merkkiä sekä isoa ja pientä kirjainta, numeroa ja erikoismerkkiä."
      );
    }

    if (codes.includes("InvalidUserName")) {
      throw new Error(
        "Käyttäjätunnus ei ole kelvollinen. Valitse toinen käyttäjätunnus."
      );
    }

    throw new Error(
      "Rekisteröityminen epäonnistui. Tarkista antamasi tiedot."
    );
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
    let data: unknown = null;

    try {
      data = await response.json();
    } catch {
      // Palvelimen vastausta ei voitu lukea JSON-muodossa.
    }

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      throw new Error(data.message);
    }

    throw new Error("Kirjautuminen epäonnistui.");
  }


  return response.json()

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


export async function changeUsername(newUsername: string) {
  const response = await apiFetch("/api/Auth/username", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newUsername,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    const message =
      typeof data?.message === "string"
        ? data.message
        : "Käyttäjätunnuksen vaihtaminen epäonnistui.";

    throw new Error(message);
  }
    return response.json();
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  const response = await apiFetch("/api/Auth/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    let message = "Salasanan vaihtaminen epäonnistui.";

    if (Array.isArray(data)) {
      message = data
        .map((error: { description?: string }) => error.description)
        .filter(Boolean)
        .join(" ");
    } else if (typeof data?.message === "string") {
      message = data.message;
    }

    throw new Error(message);
  }

  return response.json();
}

export async function deleteAccount(password: string) {
  const response = await apiFetch("/api/Auth/account", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    let data: unknown = null;

    try {
      data = await response.json();
    } catch {
      // Vastausta ei voitu lukea.
    }

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      throw new Error(data.message);
    }

    throw new Error("Käyttäjätilin poistaminen epäonnistui.");
  }

  return response.json();
}

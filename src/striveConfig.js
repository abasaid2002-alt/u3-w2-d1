// Token JWT per autenticarmi nelle chiamate API (va messo nell'header Authorization)
export const STRIVE_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTg0YWI2ZjgwMjA2ODAwMTUwNGRjOGEiLCJpYXQiOjE3NzAzMDIzMTksImV4cCI6MTc3MTUxMTkxOX0._tDJLP2qDnII7_TRQ0Be7gHqzrI4ExAJSTvXNwrEJCQ"

// URL base dell'endpoint commenti (poi ci aggiungo asin o id commento)
export const COMMENTS_URL = "https://striveschool-api.herokuapp.com/api/comments/"

// Oggetto pronto da "spalmare" dentro headers nelle fetch
export const authHeaders = {
  Authorization: STRIVE_TOKEN, // header richiesto dall'API per autorizzare
}

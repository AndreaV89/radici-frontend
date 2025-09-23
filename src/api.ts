import { Page, Post } from "./types";

// L'indirizzo base della tua API di WordPress.
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/wp-json/wp/v2`;

/**
 * Una funzione generica per fare le chiamate fetch, gestire la risposta e gli errori.
 * @param endpoint L'endpoint specifico da chiamare (es. "posts", "pages?slug=home")
 * @returns I dati in formato JSON o null in caso di errore.
 */
async function fetchData<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Errore nella chiamata API a: ${endpoint}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null; // In caso di errore, non blocchiamo l'app, ma non restituiamo dati.
  }
}

// --- Funzioni Esportate per i Componenti ---

// Funzione per recuperare un elenco generico di post (news, eventi, progetti, etc.)
export const getPosts = (postType: string, params: string = "_embed=true") => {
  return fetchData<Post[]>(`${postType}?${params}`);
};

// Funzione specifica per recuperare le ultime 3 news per la homepage
export const getLatestPosts = () => {
  return getPosts("posts", "per_page=3&_embed=true");
};

// Funzione specifica per recuperare i prossimi 3 eventi per la homepage
export const getUpcomingEvents = () => {
  return getPosts("evento", "per_page=3&_embed=true");
};

// Funzione per recuperare una singola pagina o post tramite il suo "slug"
export const getContentBySlug = (postType: string, slug: string) => {
  return fetchData<Post[]>(`${postType}?slug=${slug}&_embed=true`);
};

// Funzione per recuperare una pagina specifica (es. "chi-siamo")
export const getPageBySlug = (slug: string) => {
  return fetchData<Page[]>(`pages?slug=${slug}`);
};

// Funzione per recuperare i membri del team
export const getMembers = () => {
  return getPosts("membro", "_embed=true");
};
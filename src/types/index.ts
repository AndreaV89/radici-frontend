export interface WPContent {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
    _embedded?: {
    'wp:featuredmedia'?: {
      id: number;
      source_url: string;
      alt_text: string;
    }[];
  };
  // In futuro potremmo aggiungere: excerpt, featured_media, etc.
}

export type Page = WPContent;
export type Post = WPContent;
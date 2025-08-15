export interface WPContent {
  id: number;
  slug: string;
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
    acf?: { 
    [key: string]: any;
  };
}

export interface PointOfInterest extends WPContent {
  acf?: {
    latitudine?: number;
    longitudine?: number;
    [key: string]: any; // Permette altri campi ACF
  };
}

export type Page = WPContent;
export type Post = WPContent;
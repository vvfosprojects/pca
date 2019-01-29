// IN
export interface TitoliPreferenziali {
  titolo: string;
  id: number;
}

// OUT

export interface TitoliPreferenzialiOut {
  titolo: string;
  id: number;
  isSelected: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  filter: string;
  order: number;
}

export const CATEGORIES: Category[] = [
  { id: "accessori", name: "Accessori", image: "/accessori.jpg", filter: "Accessori", order: 1 },
  { id: "parabrezza", name: "Parabrezza", image: "/catalogo/parabrezza/foto-17-924x613.jpg", filter: "Parabrezza", order: 2 },
  { id: "porte-scorrevoli", name: "Porte scorrevoli", image: "/catalogo/porte-scorrevoli/img-20250117-wa0030-676x901.jpg", filter: "Porte scorrevoli", order: 3 },
  { id: "sportelli", name: "Sportelli", image: "/catalogo/sportelli/foto-12-980x573.jpg", filter: "Sportelli", order: 4 },
  { id: "polimero", name: "Polimero", image: "https://frallicciardi.it/assets/images/cartella-polimero-500x373.jpg", filter: "Polimero", order: 5 }
];

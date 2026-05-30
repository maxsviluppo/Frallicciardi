export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: { [key: string]: string };
}

export const PRODUCTS: Product[] = [
  // CATEGORIA: ACCESSORI
  {
    id: "accessori-deflettore-grigio",
    name: "Deflettore in Plex Grigio Europa",
    category: "Accessori",
    description: "Deflettore aerodinamico per imbarcazioni realizzato in plexiglas grigio europa di spessore 8mm, altamente resistente agli UV.",
    image: "https://frallicciardi.it/assets/images/5-1024x768.jpg",
    specs: {
      "Materiale": "Plexiglas Grigio Europa",
      "Spessore": "8mm",
      "Applicazione": "Deflessione vento e protezione spray"
    }
  },
  {
    id: "accessori-maniglia-kingboard",
    name: "Maniglia in King Starboard",
    category: "Accessori",
    description: "Maniglia di sicurezza ultra-robusta in King Starboard, adatta per il montaggio su passaggi laterali o camminamenti di bordo.",
    image: "https://frallicciardi.it/assets/images/6-1024x768.jpg",
    specs: {
      "Materiale": "King Starboard nautico",
      "Finitura": "Antiscivolo / Resistente intemperie",
      "Utilizzo": "Passaggio laterale e tientibene"
    }
  },
  {
    id: "accessori-profilo-bottazzo-1",
    name: "Profilo Bottazzo (Mod. A)",
    category: "Accessori",
    description: "Profilo di protezione e bottazzo nautico ad alta efficienza per l'assorbimento degli urti lungo la fiancata.",
    image: "https://frallicciardi.it/assets/images/cartella-accessori-foto-1-500x306.jpg",
    specs: {
      "Tipologia": "Profilo Bottazzo",
      "Materiale": "Polimero elastico speciale",
      "Installazione": "Fiancata / Bordo imbarcazione"
    }
  },
  {
    id: "accessori-profilo-bottazzo-2",
    name: "Profilo Bottazzo (Mod. B)",
    category: "Accessori",
    description: "Profilo bottazzo rinforzato per barche commerciali e yacht di medie dimensioni. Ottimo assorbimento.",
    image: "https://frallicciardi.it/assets/images/cartella-accessori-foto-2-500x306.jpg",
    specs: {
      "Tipologia": "Profilo Bottazzo Rinforzato",
      "Materiale": "Gomma marina termoplastica",
      "Fissaggio": "A incastro / Viti inox"
    }
  },
  {
    id: "accessori-profilo-bottazzo-3",
    name: "Profilo Bottazzo (Mod. C)",
    category: "Accessori",
    description: "Profilo di finitura e bottazzo sottile per imbarcazioni sportive e finiture di pregio.",
    image: "https://frallicciardi.it/assets/images/cartella-accessori-foto-3-500x306.jpg",
    specs: {
      "Tipologia": "Profilo Bottazzo Slim",
      "Finitura": "Superficie liscia protettiva",
      "Colore": "Nero / Grigio"
    }
  },
  {
    id: "accessori-maniglie-bagno",
    name: "Maniglie Porte Interno Bagno",
    category: "Accessori",
    description: "Set di maniglie ergonomiche progettate specificamente per le porte dei bagni interni delle cabine.",
    image: "https://frallicciardi.it/assets/images/cartella-accessori-foto-5-470x470.jpg",
    specs: {
      "Applicazione": "Porte interne bagno / Cabina",
      "Materiale": "Ottone cromato / Lega marina",
      "Fissaggio": "Doppio perno passante"
    }
  },
  {
    id: "accessori-serrature-scorrevoli",
    name: "Serrature per Porte Scorrevoli",
    category: "Accessori",
    description: "Serratura di sicurezza a gancio per porte scorrevoli di cabine o passaggi principali, con cilindro resistente alla salsedine.",
    image: "https://frallicciardi.it/assets/images/cartella-accessori-foto-6-470x470.jpg",
    specs: {
      "Tipologia": "Serratura a gancio",
      "Applicazione": "Porte scorrevoli esterne/interne",
      "Sicurezza": "Chiusura interna con pomello / chiave"
    }
  },
  {
    id: "accessori-serrature-poppa",
    name: "Serrature di Poppa e Tambuccio",
    category: "Accessori",
    description: "Serrature robuste per porte a tambuccio e portelli di poppa, ideali per la massima protezione contro infiltrazioni e intrusioni.",
    image: "https://frallicciardi.it/assets/images/cartella-accessori-foto-7-470x470.jpg",
    specs: {
      "Applicazione": "Tambuccio / Portello di poppa",
      "Materiale": "Acciaio Inox Aisi 316",
      "Resistenza": "Massimo grado anticorrosione marina"
    }
  },
  {
    id: "accessori-chiusure-portelli",
    name: "Chiusure per Portelli",
    category: "Accessori",
    description: "Dispositivo di chiusura a scatto regolabile per portelli di gavoni, calavele e ripostigli di bordo.",
    image: "https://frallicciardi.it/assets/images/cartella-accessori-foto-8-470x470.jpg",
    specs: {
      "Tipologia": "Chiusura a scatto rapida",
      "Regolazione": "Vite micrometrica interna",
      "Compatibilità": "Portelli in vetroresina o legno"
    }
  },

  // CATEGORIA: PARABREZZA
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-14-a9af5f80-676x901",
    name: "Parabrezza nautico 01",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.14-a9af5f80-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-15-1dfa9712-676x901",
    name: "Parabrezza nautico 02",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.15-1dfa9712-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-14-eb0d747c-676x901",
    name: "Parabrezza nautico 03",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.14-eb0d747c-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-14-4f32c6fe-676x901",
    name: "Parabrezza nautico 04",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.14-4f32c6fe-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-14-92aac0e2-676x901",
    name: "Parabrezza nautico 05",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.14-92aac0e2-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-14-80180462-676x901",
    name: "Parabrezza nautico 06",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.14-80180462-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-13-5014bd41-676x901",
    name: "Parabrezza nautico 07",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.13-5014bd41-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-14-1ac0106d-676x901",
    name: "Parabrezza nautico 08",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.14-1ac0106d-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-14-4a82aa6d-676x901",
    name: "Parabrezza nautico 09",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.14-4a82aa6d-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-13-fb9407cf-676x507",
    name: "Parabrezza nautico 10",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.13-fb9407cf-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-14-94dde3bb-676x507",
    name: "Parabrezza nautico 11",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.14-94dde3bb-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-immagine-whatsapp-2025-10-20-ore-11-45-10-96f74312-676x507",
    name: "Parabrezza nautico 12",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/immagine-whatsapp-2025-10-20-ore-11.45.10-96f74312-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-13-9bb08f1b-676x901",
    name: "Parabrezza nautico 13",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.13-9bb08f1b-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-13-7b76080e-676x901",
    name: "Parabrezza nautico 14",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.13-7b76080e-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-13-149d479f-676x901",
    name: "Parabrezza nautico 15",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.13-149d479f-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-ac418332-676x901",
    name: "Parabrezza nautico 16",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-ac418332-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-b6229d70-676x901",
    name: "Parabrezza nautico 17",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-b6229d70-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-d439b84e-676x901",
    name: "Parabrezza nautico 18",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-d439b84e-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-immagine-whatsapp-2025-10-20-ore-ok-11-45-11-ac3b4f38-676x507",
    name: "Parabrezza nautico 19",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/immagine-whatsapp-2025-10-20-ore-ok-11.45.11-ac3b4f38-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-13-e5b5672d-676x507",
    name: "Parabrezza nautico 20",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.13-e5b5672d-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-13-eaaed56e-676x507",
    name: "Parabrezza nautico 21",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.13-eaaed56e-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-13-33ba10f6-676x507",
    name: "Parabrezza nautico 22",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.13-33ba10f6-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-13-0731f218-676x507",
    name: "Parabrezza nautico 23",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.13-0731f218-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-13-a7791bea-676x507",
    name: "Parabrezza nautico 24",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.13-a7791bea-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-908c7ba8-676x507",
    name: "Parabrezza nautico 25",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-908c7ba8-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-cc5df6f1-676x507",
    name: "Parabrezza nautico 26",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-cc5df6f1-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-13-0f8c1940-676x507",
    name: "Parabrezza nautico 27",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.13-0f8c1940-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-11-36546185-676x901",
    name: "Parabrezza nautico 28",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.11-36546185-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-3503db57-676x901",
    name: "Parabrezza nautico 29",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-3503db57-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-39288f22-676x901",
    name: "Parabrezza nautico 30",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-39288f22-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-11-8acf7613-676x901",
    name: "Parabrezza nautico 31",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.11-8acf7613-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-11-69191ffc-676x901",
    name: "Parabrezza nautico 32",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.11-69191ffc-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-11-209162a5-676x901",
    name: "Parabrezza nautico 33",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.11-209162a5-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-10-64a097f6-676x901",
    name: "Parabrezza nautico 34",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.10-64a097f6-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-10-00635afe-676x901",
    name: "Parabrezza nautico 35",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.10-00635afe-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-11-3b89ec71-676x901",
    name: "Parabrezza nautico 36",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.11-3b89ec71-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-8a7f6b89-676x507",
    name: "Parabrezza nautico 37",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-8a7f6b89-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-35bf5563-676x507",
    name: "Parabrezza nautico 38",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-35bf5563-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-43aa0e18-676x507",
    name: "Parabrezza nautico 39",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-43aa0e18-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-11-f0e2b62e-676x507",
    name: "Parabrezza nautico 40",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.11-f0e2b62e-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-4b2b670c-676x507",
    name: "Parabrezza nautico 41",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-4b2b670c-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-12-5e054f77-676x507",
    name: "Parabrezza nautico 42",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.12-5e054f77-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-11-d2151cdb-676x507",
    name: "Parabrezza nautico 43",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.11-d2151cdb-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-11-e3814190-676x507",
    name: "Parabrezza nautico 44",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.11-e3814190-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-ok-immagine-whatsapp-2025-10-20-ore-11-45-11-ee31a9a9-676x507",
    name: "Parabrezza nautico 45",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/ok-immagine-whatsapp-2025-10-20-ore-11.45.11-ee31a9a9-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-immagine-whatsapp-2025-10-20-ore-11-45-11-8bdcf579-676x507",
    name: "Parabrezza nautico 46",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/immagine-whatsapp-2025-10-20-ore-11.45.11-8bdcf579-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0019-676x901",
    name: "Parabrezza nautico 47",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0019-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0020-676x901",
    name: "Parabrezza nautico 48",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0020-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0023-676x901",
    name: "Parabrezza nautico 49",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0023-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0002-676x901",
    name: "Parabrezza nautico 50",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0002-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0005-676x901",
    name: "Parabrezza nautico 51",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0005-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0009-676x901",
    name: "Parabrezza nautico 52",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0009-676x901.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0038-676x507",
    name: "Parabrezza nautico 53",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0038-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0037-676x507",
    name: "Parabrezza nautico 54",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0037-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0036-676x507",
    name: "Parabrezza nautico 55",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0036-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0029-676x507",
    name: "Parabrezza nautico 56",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0029-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0031-676x507",
    name: "Parabrezza nautico 57",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0031-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0033-676x507",
    name: "Parabrezza nautico 58",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0033-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0025-676x507",
    name: "Parabrezza nautico 59",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0025-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0026-676x507",
    name: "Parabrezza nautico 60",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0026-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0028-676x507",
    name: "Parabrezza nautico 61",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0028-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0021-676x507",
    name: "Parabrezza nautico 62",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0021-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0022-676x507",
    name: "Parabrezza nautico 63",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0022-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0024-676x507",
    name: "Parabrezza nautico 64",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0024-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0016-676x507",
    name: "Parabrezza nautico 65",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0016-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0017-676x507",
    name: "Parabrezza nautico 66",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0017-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0018-676x507",
    name: "Parabrezza nautico 67",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0018-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0013-676x507",
    name: "Parabrezza nautico 68",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0013-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0014-676x507",
    name: "Parabrezza nautico 69",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0014-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-17-924x613",
    name: "Parabrezza nautico 70",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/foto-17-924x613.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0010-676x507",
    name: "Parabrezza nautico 71",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0010-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0011-676x507",
    name: "Parabrezza nautico 72",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0011-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0006-676x507",
    name: "Parabrezza nautico 73",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0006-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0007-676x507",
    name: "Parabrezza nautico 74",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0007-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0008-676x507",
    name: "Parabrezza nautico 75",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0008-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0001-676x507",
    name: "Parabrezza nautico 76",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0001-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0003-676x507",
    name: "Parabrezza nautico 77",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0003-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-img-20250117-wa0004-676x507",
    name: "Parabrezza nautico 78",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/img-20250117-wa0004-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-0d4f9a84-6812-4e85-8273-bbc15f6e0c7c-676x507",
    name: "Parabrezza nautico 79",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/0d4f9a84-6812-4e85-8273-bbc15f6e0c7c-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-8cfcda9c-fd40-4081-a855-b51e9cf8f63c-676x507",
    name: "Parabrezza nautico 80",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/8cfcda9c-fd40-4081-a855-b51e9cf8f63c-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-268fff93-c527-404c-b1ff-7ff9b32629b2-676x507",
    name: "Parabrezza nautico 81",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/268fff93-c527-404c-b1ff-7ff9b32629b2-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-7345f628-e84d-4d1e-ba35-d03abfe5761f-676x507",
    name: "Parabrezza nautico 82",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/7345f628-e84d-4d1e-ba35-d03abfe5761f-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-f324a8ed-a75a-4aea-836b-3351fe47054c-676x507",
    name: "Parabrezza nautico 83",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/f324a8ed-a75a-4aea-836b-3351fe47054c-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-f9892513-1db5-47d2-8ca5-871f2206cd8e-676x507",
    name: "Parabrezza nautico 84",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/f9892513-1db5-47d2-8ca5-871f2206cd8e-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-4b8211e4-c767-4ba9-a194-ed6b86a21a1a-491x655",
    name: "Parabrezza nautico 85",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/4b8211e4-c767-4ba9-a194-ed6b86a21a1a-491x655.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-5f09e04c-ca02-4df4-81ec-80ebb952f3f4-491x655",
    name: "Parabrezza nautico 86",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/5f09e04c-ca02-4df4-81ec-80ebb952f3f4-491x655.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-6e46fdaf-af7a-4fa9-b55b-0576c1bd2e1e-491x655",
    name: "Parabrezza nautico 87",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/6e46fdaf-af7a-4fa9-b55b-0576c1bd2e1e-491x655.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-64157c61-a60e-4c33-bdd3-4320651b110c-676x901",
    name: "Parabrezza nautico 88",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/64157c61-a60e-4c33-bdd3-4320651b110c-676x901.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-d7c8c6fe-9f1b-4c49-b2ef-36b142f236db-676x901",
    name: "Parabrezza nautico 89",
    category: "Parabrezza",
    description: "",
    image: "/catalogo/parabrezza/d7c8c6fe-9f1b-4c49-b2ef-36b142f236db-676x901.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-1-676x507",
    name: "Parabrezza in plex contortato in acciaio con aggiunta di fregio metal...",
    category: "Parabrezza",
    description: "Parabrezza in plex contortato in acciaio con aggiunta di fregio metallizzato.",
    image: "/catalogo/parabrezza/1-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in plex contortato in acciaio con aggiunta di fregio metallizzato.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-2-676x901",
    name: "Parabrezza in plex grigio fumè europa spessore 8mm",
    category: "Parabrezza",
    description: "Parabrezza in plex grigio fumè europa spessore 8mm.",
    image: "/catalogo/parabrezza/2-676x901.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in plex grigio fumè europa spessore 8mm.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-3-676x835",
    name: "Parabrezza grigio fumè scuro antracite da 8mm",
    category: "Parabrezza",
    description: "Parabrezza grigio fumè scuro antracite da 8mm.",
    image: "/catalogo/parabrezza/3-676x835.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza grigio fumè scuro antracite da 8mm.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-4-676x507",
    name: "Parabrezza in plex contornato in alluminio colore nero",
    category: "Parabrezza",
    description: "Parabrezza in plex contornato in alluminio colore nero.",
    image: "/catalogo/parabrezza/4-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in plex contornato in alluminio colore nero.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-9-676x507",
    name: "Parabrezza in plex contornato in acciaio da 30mm",
    category: "Parabrezza",
    description: "Parabrezza in plex contornato in acciaio da 30mm.",
    image: "/catalogo/parabrezza/9-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in plex contornato in acciaio da 30mm.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-7-676x507",
    name: "Parabrezza in plex da 8mm grigio europa contornato in acciaio ovale d...",
    category: "Parabrezza",
    description: "Parabrezza in plex da 8mm grigio europa contornato in acciaio ovale da 35mm.",
    image: "/catalogo/parabrezza/7-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in plex da 8mm grigio europa contornato in acciaio ovale da 35mm.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-8-676x507",
    name: "Parabrezza plex in alluminio con apertura e passaggio centrale",
    category: "Parabrezza",
    description: "Parabrezza plex in alluminio con apertura e passaggio centrale.",
    image: "/catalogo/parabrezza/8-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza plex in alluminio con apertura e passaggio centrale.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-10-676x901",
    name: "Parabrezza in plex contornato con giroparabrezza in acciaio e fregio...",
    category: "Parabrezza",
    description: "Parabrezza in plex contornato con giroparabrezza in acciaio e fregio metallizzato.",
    image: "/catalogo/parabrezza/10-676x901.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in plex contornato con giroparabrezza in acciaio e fregio metallizzato.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-11-676x901",
    name: "Parabrezza in plex da 10mm trasparente",
    category: "Parabrezza",
    description: "Parabrezza in plex da 10mm trasparente.",
    image: "/catalogo/parabrezza/11-676x901.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in plex da 10mm trasparente.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-12-676x901",
    name: "Parabrezza in plex antracite scuro con profilo in acciaio",
    category: "Parabrezza",
    description: "Parabrezza in plex antracite scuro con profilo in acciaio.",
    image: "/catalogo/parabrezza/12-676x901.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in plex antracite scuro con profilo in acciaio.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-13-676x901",
    name: "Parabrezza in plex da 8mm in grigio antracite con fascia nera serigra...",
    category: "Parabrezza",
    description: "Parabrezza in plex da 8mm in grigio antracite con fascia nera serigrafata.",
    image: "/catalogo/parabrezza/13-676x901.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in plex da 8mm in grigio antracite con fascia nera serigrafata.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-14-676x901",
    name: "Parabrezza in plex da 8mm in grigio antracite con fascia nera serigra...",
    category: "Parabrezza",
    description: "Parabrezza in plex da 8mm in grigio antracite con fascia nera serigrafata.",
    image: "/catalogo/parabrezza/14-676x901.jpeg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in plex da 8mm in grigio antracite con fascia nera serigrafata.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-2-670x446",
    name: "Parabrezza termoformato in metacrilato colato da mm 10 fumè grigio",
    category: "Parabrezza",
    description: "Parabrezza termoformato in metacrilato colato da mm 10 fumè grigio.",
    image: "/catalogo/parabrezza/foto-2-670x446.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza termoformato in metacrilato colato da mm 10 fumè grigio.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-19-1024x680",
    name: "Parabrezza termoformato in metacrilato colato da mm 5 fumè",
    category: "Parabrezza",
    description: "Parabrezza termoformato in metacrilato colato da mm 5 fumè.",
    image: "/catalogo/parabrezza/foto-19-1024x680.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza termoformato in metacrilato colato da mm 5 fumè.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-5-960x720",
    name: "Parabrezza termoformato in metacrilato colato da mm 8 per baia 60",
    category: "Parabrezza",
    description: "Parabrezza termoformato in metacrilato colato da mm 8 per baia 60.",
    image: "/catalogo/parabrezza/foto-5-960x720.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza termoformato in metacrilato colato da mm 8 per baia 60.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-6-960x720",
    name: "Parabrezza termoformato in metacrilato colato da mm 8 fumè grigio cor...",
    category: "Parabrezza",
    description: "Parabrezza termoformato in metacrilato colato da mm 8 fumè grigio corredato di acciaio 316.",
    image: "/catalogo/parabrezza/foto-6-960x720.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza termoformato in metacrilato colato da mm 8 fumè grigio corredato di acciaio 316.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-7-2048x1228",
    name: "Parabrezza termoformato in metacrilato colato da mm 5 per imbarcazion...",
    category: "Parabrezza",
    description: "Parabrezza termoformato in metacrilato colato da mm 5 per imbarcazione mod. tim completo di finestre con apertura laterale.",
    image: "/catalogo/parabrezza/foto-7-2048x1228.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza termoformato in metacrilato colato da mm 5 per imbarcazione mod. tim completo di finestre con apertura laterale.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-11-980x573",
    name: "Parabrezza termoformato in metacrilato colato da mm 5 fumè grigio com...",
    category: "Parabrezza",
    description: "Parabrezza termoformato in metacrilato colato da mm 5 fumè grigio completo di struttura in alluminio anodizato.",
    image: "/catalogo/parabrezza/foto-11-980x573.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza termoformato in metacrilato colato da mm 5 fumè grigio completo di struttura in alluminio anodizato.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-9-1024x768",
    name: "Parabrezza e porta in metacrilato per imbarcazione modello WA",
    category: "Parabrezza",
    description: "Parabrezza e porta in metacrilato per imbarcazione modello WA.",
    image: "/catalogo/parabrezza/foto-9-1024x768.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza e porta in metacrilato per imbarcazione modello WA.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-10-980x573",
    name: "Parabrezza in acciaio con profilo superiore da mm 30. Porta scorrevol...",
    category: "Parabrezza",
    description: "Parabrezza in acciaio con profilo superiore da mm 30. Porta scorrevole completa di accessori.",
    image: "/catalogo/parabrezza/foto-10-980x573.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in acciaio con profilo superiore da mm 30. Porta scorrevole completa di accessori.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-13-800x419",
    name: "Parabrezza termoformato in metacrilato colato trasparente con fascia...",
    category: "Parabrezza",
    description: "Parabrezza termoformato in metacrilato colato trasparente con fascia nera . laterali da mm 8 colore nero con lavorazione di fresatura.",
    image: "/catalogo/parabrezza/foto-13-800x419.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza termoformato in metacrilato colato trasparente con fascia nera . laterali da mm 8 colore nero con lavorazione di fresatura.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-17-copia-1-1024x680",
    name: "Parabrezza termoformato in metacrilato colato da mm 8, porta mm 10 te...",
    category: "Parabrezza",
    description: "Parabrezza termoformato in metacrilato colato da mm 8, porta mm 10 termoformata colore fumè completa di accessori.",
    image: "/catalogo/parabrezza/foto-17-copia-1-1024x680.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza termoformato in metacrilato colato da mm 8, porta mm 10 termoformata colore fumè completa di accessori.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-foto-3-960x720",
    name: "Parabrezza termoformato in metacrilato colato con profilo in acciaio",
    category: "Parabrezza",
    description: "Parabrezza termoformato in metacrilato colato con profilo in acciaio.",
    image: "/catalogo/parabrezza/foto-3-960x720.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza termoformato in metacrilato colato con profilo in acciaio.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-cartella-parabrezza-foto-2-500x299",
    name: "Parabrezza con profilato in alluminio",
    category: "Parabrezza",
    description: "Parabrezza con profilato in alluminio.",
    image: "/catalogo/parabrezza/cartella-parabrezza-foto-2-500x299.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza con profilato in alluminio.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-cartella-parabrezza-foto-5-500x280",
    name: "Parabrezza con profilato in acciaio",
    category: "Parabrezza",
    description: "Parabrezza con profilato in acciaio.",
    image: "/catalogo/parabrezza/cartella-parabrezza-foto-5-500x280.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza con profilato in acciaio.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-cartella-parabrezza-foto-7-345x470",
    name: "Parabrezza completo di girocassero in acciaio",
    category: "Parabrezza",
    description: "Parabrezza completo di girocassero in acciaio.",
    image: "/catalogo/parabrezza/cartella-parabrezza-foto-7-345x470.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza completo di girocassero in acciaio.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-cartella-parabrezza-foto-8-500x333",
    name: "Parabrezza con profilo in acciaio inferiore e superiore",
    category: "Parabrezza",
    description: "Parabrezza con profilo in acciaio inferiore e superiore.",
    image: "/catalogo/parabrezza/cartella-parabrezza-foto-8-500x333.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza con profilo in acciaio inferiore e superiore.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-cartella-parabrezza-foto-1-500x368",
    name: "Parabrezza in metacrilato colato",
    category: "Parabrezza",
    description: "Parabrezza in metacrilato colato.",
    image: "/catalogo/parabrezza/cartella-parabrezza-foto-1-500x368.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in metacrilato colato.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "parabrezza-whatsapp-image-2018-05-09-at-11-51-40-676x507",
    name: "Parabrezza in plexiglass con effetto in carbonio",
    category: "Parabrezza",
    description: "Parabrezza in plexiglass con effetto in carbonio",
    image: "/catalogo/parabrezza/whatsapp-image-2018-05-09-at-11.51.40-676x507.jpg",
    specs: {
      "Categoria": "Parabrezza",
      "Descrizione originale": "Parabrezza in plexiglass con effetto in carbonio",
      "Applicazione": "Settore nautico"
    }
  },

  // CATEGORIA: PORTE SCORREVOLI
  {
    id: "porte-scorrevoli-galleria-2025-1",
    name: "Porta Scorrevole Nautica",
    category: "Porte scorrevoli",
    description: "",
    image: "/catalogo/porte-scorrevoli/img-20250117-wa0027-676x901.jpg",
    specs: {
      "Categoria": "Porte scorrevoli",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "porte-scorrevoli-galleria-2025-2",
    name: "Porta Scorrevole Nautica",
    category: "Porte scorrevoli",
    description: "",
    image: "/catalogo/porte-scorrevoli/img-20250117-wa0030-676x901.jpg",
    specs: {
      "Categoria": "Porte scorrevoli",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "porte-scorrevoli-galleria-2025-3",
    name: "Porta Scorrevole Nautica",
    category: "Porte scorrevoli",
    description: "",
    image: "/catalogo/porte-scorrevoli/img-20250117-wa0032-676x901.jpg",
    specs: {
      "Categoria": "Porte scorrevoli",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "porte-scorrevoli-galleria-2025-4",
    name: "Porta Scorrevole Nautica",
    category: "Porte scorrevoli",
    description: "",
    image: "/catalogo/porte-scorrevoli/img-20250117-wa0035-491x655.jpg",
    specs: {
      "Categoria": "Porte scorrevoli",
      "Lavorazione": "Su misura",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "porte-scorrevoli-metacrilato-colato-bianco",
    name: "Porta Scorrevole in Metacrilato Colato",
    category: "Porte scorrevoli",
    description: "Porta scorrevole in metacrilato colato, colore bianco.",
    image: "/catalogo/porte-scorrevoli/cartella-porte-foto-1-470x470.jpg",
    specs: {
      "Materiale": "Metacrilato colato",
      "Colore": "Bianco",
      "Applicazione": "Porta scorrevole nautica"
    }
  },
  {
    id: "porte-scorrevoli-metacrilato-bianco-accessori-acciaio",
    name: "Porta Scorrevole in Metacrilato con Accessori in Acciaio",
    category: "Porte scorrevoli",
    description: "Porta scorrevole in metacrilato bianco con accessori in acciaio.",
    image: "/catalogo/porte-scorrevoli/cartella-porte-foto-2-375x470.jpg",
    specs: {
      "Materiale": "Metacrilato bianco",
      "Accessori": "Acciaio",
      "Applicazione": "Porta scorrevole nautica"
    }
  },

  // CATEGORIA: SPORTELLI
  {
    id: "sportelli-cartella-sportelli-foto-1-470x470",
    name: "Sportello combinato in alluminio e metacrilato colato",
    category: "Sportelli",
    description: "Sportello combinato in alluminio e metacrilato colato.",
    image: "/catalogo/sportelli/cartella-sportelli-foto-1-470x470.jpg",
    specs: {
      "Categoria": "Sportelli",
      "Descrizione originale": "Sportello combinato in alluminio e metacrilato colato.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "sportelli-cartella-sportelli-foto-2-470x470",
    name: "Sportello combinato in alluminio e metacrilato colato",
    category: "Sportelli",
    description: "Sportello combinato in alluminio e metacrilato colato.",
    image: "/catalogo/sportelli/cartella-sportelli-foto-2-470x470.jpg",
    specs: {
      "Categoria": "Sportelli",
      "Descrizione originale": "Sportello combinato in alluminio e metacrilato colato.",
      "Applicazione": "Settore nautico"
    }
  },
  {
    id: "sportelli-foto-12-980x573",
    name: "Gavone laterale in alluminio con sportello completo di accessori in m...",
    category: "Sportelli",
    description: "Gavone laterale in alluminio con sportello completo di accessori in metacrilato colato colore crema.",
    image: "/catalogo/sportelli/foto-12-980x573.jpg",
    specs: {
      "Categoria": "Sportelli",
      "Descrizione originale": "Gavone laterale in alluminio con sportello completo di accessori in metacrilato colato colore crema.",
      "Applicazione": "Settore nautico"
    }
  },

  // CATEGORIA: POLIMERO
  {
    id: "polimero-particolari-termoformati",
    name: "Manufatto Termoformato in Polimero",
    category: "Polimero",
    description: "Lavorazioni speciali e particolari termoformati realizzati in polimeri tecnici d'eccellenza, resistenti ad agenti chimici e salsedine.",
    image: "https://frallicciardi.it/assets/images/cartella-polimero-500x373.jpg",
    specs: {
      "Materiale": "Polimero tecnico (ABS / Policarbonato)",
      "Tecnologia": "Termoformatura ad alta precisione",
      "Resistenza": "Resistente agli UV e salsedine"
    }
  }
];

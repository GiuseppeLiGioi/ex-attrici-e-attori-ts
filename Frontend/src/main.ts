import './style.css'




type Person = {
    readonly id: number,
    readonly name: string,
    birth_year: number,
    death_year?: number,
    biography: string,
    image: string

}


type Actress = Person & {
    most_famous_movies: [string, string, string],
    awards: string,
    nationality: "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese"
}

function isActress(obj: unknown) : obj is Actress{

    const o = obj as Record<string, unknown>;

    if (o &&
        typeof o === "object" &&
        "id" in o && typeof o.id === "number" &&
        "name" in o && typeof o.name === "string" &&
        "birth_year" in o && typeof o.birth_year === "number" &&
        "death_year" in o && typeof o.death_year === "number" &&
        "biography" in o && typeof o.biography === "string" &&
        "image" in o && typeof o.image === "string" &&
        Array.isArray(o.most_famous_movies) && o.most_famous_movies.length === 3 && o.most_famous_movies.every(m => typeof m === "string") &&
        "awards" in o && typeof o.awards === "string" &&
        "nationality" in o && typeof o.nationality === "string" && ["American", "British", "Australian", "Israeli-American", "South African",
            "French", "Indian", "Israeli", "Spanish", "South Korean", "Chinese"].includes(o.nationality)
    ) {
        return true
    } else {
        return false
    }
}

function isActor(obj: unknown) : obj is Actor{

    const o = obj as Record<string, unknown>;

    if (o &&
        typeof o === "object" &&
        "id" in o && typeof o.id === "number" &&
        "name" in o && typeof o.name === "string" &&
        "birth_year" in o && typeof o.birth_year === "number" &&
        (o.death_year === undefined || typeof o.death_year === "number") &&
        "biography" in o && typeof o.biography === "string" &&
        "image" in o && typeof o.image === "string" &&
        Array.isArray(o.known_for) && o.known_for.length === 3 && o.known_for.every(m => typeof m === "string") &&
         Array.isArray(o.awards) && (o.awards.length === 1 || o.awards.length === 2) && o.awards.every(a => typeof a === "string") &&
        "nationality" in o && typeof o.nationality === "string" && ["American", "British", "Australian", "Israeli-American", "South African",
            "French", "Indian", "Israeli", "Spanish", "South Korean", "Chinese", "Scottish" , "New Zealand" , "Hong Kong" , "German" , "Canadian" , "Irish"].includes(o.nationality)
    ) {
        return true
    } else {
        return false
    }
}


async function getActress(id: number): Promise<Actress | null> {
    try {
        const response = await fetch(`http://localhost:3333/actresses/${id}`)
        if (!response.ok) {
            throw new Error(`Errore nella risposta: ${response.status}`)
        }
        const dati: unknown = await response.json()
         if(isActress(dati)){
            return dati as Actress
         }
         throw new Error("formato dati non valido")
    } catch (error) {
       if(error instanceof Error ){
        console.error(error)
        return null
       }
       return null
    }
}

(async () => {
  const attrice = await getActress(2);
  console.log(attrice);
})();

async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch(`http://localhost:3333/actresses`);
    if (!response.ok) {
      throw new Error(`Errore nella risposta: ${response.status}`);
    }
    const dati: unknown = await response.json();
    if (Array.isArray(dati)) {
      return dati.filter(isActress);
    } else {
      return [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
    return [];
  }
}



(async () => {
  const arrAttrici = await getAllActresses();
  console.log(arrAttrici);
})();

const generaId = () => {
  const randomId =  Math.floor(Math.random() * 1_000_000); 
  return randomId;
}

const nuovaAttrice: Omit<Actress, "id"> = {
  name: "Jane Doe",
  birth_year: 1990,
  biography: "Attrice famosa per i suoi ruoli drammatici.",
  image: "https://example.com/jane.jpg",
  most_famous_movies: ["Film 1", "Film 2", "Film 3"],
  awards: "Oscar 2020",
  nationality: "British"
};

function createActress (dati: Omit <Actress, "id">) : Actress {
return {
  id: generaId(),
  ...dati
}
}


const attriceCompleta: Actress = {
  id: 123,
  name: "Jane Doe",
  birth_year: 1990,
  biography: "Attrice famosa per i suoi ruoli drammatici.",
  image: "https://example.com/jane.jpg",
  most_famous_movies: ["Film 1", "Film 2", "Film 3"],
  awards: "Oscar 2020",
  nationality: "British"
};
function updateActress (attrice: Actress, modifiche: Partial<Actress>) : Actress {
return {
  ...attrice,
  ...modifiche
}
}


const modificata = {
   birth_year: 1960
}


const newActrice = createActress(nuovaAttrice)
console.log(newActrice)


const updateActrice = updateActress(attriceCompleta, modificata)
console.log(updateActrice)



/*
🎯 BONUS 2
Crea un tipo Actor, che estende Person con le seguenti differenze rispetto ad Actress:

known_for: una tuple di 3 stringhe
awards: array di una o due stringhe
nationality: le stesse di Actress più:
Scottish, New Zealand, Hong Kong, German, Canadian, Irish.
Implementa anche le versioni getActor, getAllActors, getActors, createActor, updateActor.
*/

type Actor = Person & {
known_for: [string, string, string],
awards: [string] | [string, string],
nationality: "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese" | "Scottish" | "New Zealand" | "Hong Kong" | "German" | "Canadian" | "Irish"
}

async function getActor(id: number): Promise<Actor | null> {
    try {
        const response = await fetch(`http://localhost:3333/actors/${id}`)
        
        if (!response.ok) {
            throw new Error(`Errore nella risposta: ${response.status}`)
        }
        const dati: unknown = await response.json()
         if(isActor(dati)){
            return dati as Actor
         }
         throw new Error("formato dati non valido")
    } catch (error) {
       if(error instanceof Error ){
        console.error(error)
        return null
       }
       return null
    }
}

(async () => {
  const attore = await getActor(2);
  console.log(attore);
})();

async function getAllActors(): Promise<Actor[]> {
  try {
    const response = await fetch(`http://localhost:3333/actors`);
    if (!response.ok) {
      throw new Error(`Errore nella risposta: ${response.status}`);
    }
    const dati: unknown = await response.json();
    if (Array.isArray(dati)) {
      return dati.filter(isActor);
    } else {
      return [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
    return [];
  }
}


(async () => {
   const attori = await getAllActors();
  console.log(attori);
})();


const nuovoAttore: Omit<Actor, "id"> = {
  name: "Tom Hardy",
  birth_year: 1977,
  biography: "Attore britannico noto per ruoli intensi.",
  image: "https://example.com/tom.jpg",
  known_for: ["Mad Max", "Venom", "Inception"],
  awards: ["BAFTA"],
  nationality: "British"
}


function createActor (dati: Omit <Actor, "id">) : Actor {
return {
  id: generaId(),
  ...dati
}

}
const newActor = createActor(nuovoAttore)
console.log(newActor)



const attoreCompleto: Actor = {
  id: 101,
  name: "Leonardo DiCaprio",
  birth_year: 1974,
  biography: "Famoso attore e produttore americano.",
  image: "https://example.com/leo.jpg",
  known_for: ["Inception", "Titanic", "The Revenant"],
  awards: ["Oscar", "Golden Globe"],
  nationality: "American"
}

function updateActor (attore: Actor, modifiche: Partial<Actor>) : Actor {
return {
  ...attore,
  ...modifiche
}
}

const modificheAttore = {
biography: "Famoso Romanista"
}

const updatedActor = updateActor(attoreCompleto, modificheAttore)
console.log(updatedActor)
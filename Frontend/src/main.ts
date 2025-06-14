import './style.css'
/*
📌 Milestone 3
Crea una funzione getActress che, dato un id, effettua una chiamata a:

GET /actresses/:id
La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta.
*/



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
        "biography" in o && typeof obj.biography === "string" &&
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

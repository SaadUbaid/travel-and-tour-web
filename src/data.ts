export interface Trip {
  id: string;
  name: string;
  region: string;
  days: number;
  type: string;
  image: string;
  label: string;
  line: string;
  description: string;
  highlights: string[];
  plan: string[];
  pricePerPerson?: number;
  departures?: string[];
  includes?: string[];
  reviews?: { name: string; rating: number; text: string }[];
}

export const trips: Trip[] = [
  {
    id: "hunza",
    name: "Hunza Valley",
    region: "Gilgit-Baltistan",
    days: 5,
    type: "Sightseeing Tours",
    image: "hunza",
    label: "The iconic valley",
    line: "A road worth taking. A view worth keeping.",
    description:
      "Follow the Karakoram Highway into a world of turquoise lakes, dramatic peaks, and mountain villages. Leave a little room in your plans for the places you will want to stay longer.",
    highlights: ["Attabad Lake", "Karimabad", "Passu viewpoints"],
    reviews: [
      {
        name: "Salman & Family (Lahore)",
        rating: 5,
        text: "Saadi made our Hunza family tour effortless. The Prado was spotless, our driver was exceptionally courteous on the Karakoram Highway, and the lake views at Attabad were unforgettable.",
      },
      {
        name: "Dr. Ayesha Siddiqui (Islamabad)",
        rating: 5,
        text: "A truly well-planned trip. From Karimabad's local heritage to Passu Cones, every single day was organized with punctuality and genuine warmth.",
      },
    ],
    plan: [
      "Head north, take the scenic road",
      "Explore Karimabad at your own pace",
      "A day beside Attabad Lake",
      "Follow the peaks toward Passu",
      "One last mountain morning, then home",
    ],
  },
  {
    id: "skardu",
    name: "Skardu",
    region: "Gilgit-Baltistan",
    days: 5,
    type: "Sightseeing Tours",
    image: "skardu",
    label: "Lakes & mountain air",
    line: "Where the mountains find their reflection.",
    description:
      "Slow down beside still lakes, wander through wide valleys, and discover the quieter side of the north. Skardu is an invitation to take the long way around.",
    highlights: ["Kachura lakes", "Shigar Valley", "Skardu viewpoints"],
    reviews: [
      {
        name: "Hamza Tariq & Friends (Karachi)",
        rating: 5,
        text: "Coming from Karachi, we needed dependable transport and warm hotels. Saadi took care of our 4x4 jeeps, Shangrila visits, and local food. Best mountain trip ever!",
      },
      {
        name: "Bilal & Maryam (Rawalpindi)",
        rating: 5,
        text: "Our honeymoon in Skardu was quiet, scenic, and perfectly arranged. Clean riverside hotel, polite driver, and zero stress.",
      },
    ],
    plan: [
      "Journey into Baltistan",
      "Discover the Kachura lakes",
      "Spend a day in Shigar Valley",
      "Take the slower road around Skardu",
      "Return with a camera full of memories",
    ],
  },
  {
    id: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Gilgit-Baltistan",
    days: 5,
    type: "Adventure",
    image: "fairy-meadows",
    label: "For the trail seekers",
    line: "A little closer to the extraordinary.",
    description:
      "Trade city streets for pine-scented trails and a front-row view of Nanga Parbat. This active mountain trek is for travellers who enjoy earning their view.",
    highlights: ["Forest trails", "Nanga Parbat views", "Meadow mornings"],
    reviews: [
      {
        name: "Engr. Usman Khan (Peshawar)",
        rating: 5,
        text: "The trek to Fairy Meadows and the view of Nanga Parbat was thrilling! Our local guides were deeply experienced and prioritized safety at every ridge.",
      },
    ],
    plan: [
      "Travel toward the mountains",
      "Transfer and trek to the meadows",
      "Explore the trails with your guide",
      "A slow morning and the return trek",
      "Travel home through the valley",
    ],
  },
  {
    id: "neelum",
    name: "Neelum Valley",
    region: "Azad Kashmir",
    days: 3,
    type: "Sightseeing Tours",
    image: "neelum",
    label: "A greener kind of getaway",
    line: "Let the river set the pace.",
    description:
      "River bends, wooden houses, and hillside paths make this a lovely tour away from everyday noise. Follow the valley and make time for a roadside cup of chai.",
    highlights: ["Riverside views", "Valley walks", "Mountain villages"],
    reviews: [
      {
        name: "Zainab & Family (Gujranwala)",
        rating: 5,
        text: "Arang Kel and Sharda were breathtaking. Very family-friendly pacing and delicious Kashmiri meals organized by Saadi.",
      },
    ],
    plan: [
      "Follow the road into Neelum",
      "Explore the valley and its villages",
      "A riverside morning, then return",
    ],
  },
  {
    id: "swat",
    name: "Swat & Kalam",
    region: "Khyber Pakhtunkhwa",
    days: 3,
    type: "Sightseeing Tours",
    image: "swat",
    label: "The river road",
    line: "Fresh air. Pine trees. No rush.",
    description:
      "Find bright rivers, forested hills, and a welcome change of pace around Swat and Kalam. A scenic journey with plenty of room to breathe.",
    highlights: ["Kalam Valley", "Riverside stops", "Pine forests"],
    reviews: [
      {
        name: "Kashif Mehmood (Faisalabad)",
        rating: 5,
        text: "Kalam and Ushu forest were peaceful and very comfortable for our elderly parents. Reliable car and wonderful guidance.",
      },
    ],
    plan: [
      "Travel through Swat toward Kalam",
      "A day exploring the valley",
      "Make a few final stops on the way home",
    ],
  },
  {
    id: "naran",
    name: "Naran & Kaghan",
    region: "Khyber Pakhtunkhwa",
    days: 3,
    type: "Adventure",
    image: "naran",
    label: "High-altitude daydreams",
    line: "Take the road to something bigger.",
    description:
      "A winding mountain road leads to open valleys and alpine scenery. Build your trip around the places you want to explore, with time for unplanned moments.",
    highlights: ["Kaghan Valley", "Naran", "Alpine scenery"],
    plan: [
      "Drive through the Kaghan Valley",
      "Explore the mountain landscapes",
      "Enjoy the valley on the return journey",
    ],
  },
  {
    id: "shogran",
    name: "Shogran",
    region: "Khyber Pakhtunkhwa",
    days: 1,
    type: "Day trips",
    image: "shogran",
    label: "A breath of fresh air",
    line: "One day. A completely different world.",
    description:
      "A quick reset among green meadows and tall pines. Bring your walking shoes, your favourite people, and an appetite for fresh mountain air.",
    highlights: ["Meadow walks", "Pine forests", "Mountain views"],
    plan: ["Leave early, explore Shogran, and return in the evening"],
  },
  {
    id: "malam-jabba",
    name: "Malam Jabba",
    region: "Khyber Pakhtunkhwa",
    days: 1,
    type: "Day trips",
    image: "malam-jabba",
    label: "Above the everyday",
    line: "A mountain day, your way.",
    description:
      "Head for the heights of Swat for expansive views and a refreshing day outdoors. Activities and access depend on the season and local conditions.",
    highlights: [
      "Mountain viewpoints",
      "Forest scenery",
      "Seasonal activities",
    ],
    plan: ["Take the scenic drive, explore the mountain area, and return"],
  },
  {
    id: "sharan",
    name: "Sharan Forest",
    region: "Khyber Pakhtunkhwa",
    days: 1,
    type: "Day trips",
    image: "sharan",
    label: "Off the beaten path",
    line: "Find your quiet in the forest.",
    description:
      "Walk beneath the trees and find an unhurried corner of the mountains. A forest escape for anyone who wants to switch off and look around.",
    highlights: ["Forest trails", "Green meadows", "Nature walks"],
    plan: ["Travel to the forest, enjoy a guided walk, and head home"],
  },
  {
    id: "mushkpuri",
    name: "Mushkpuri",
    region: "Khyber Pakhtunkhwa",
    days: 1,
    type: "Day trips",
    image: "mushkpuri",
    label: "A trail to remember",
    line: "Good company. An even better view.",
    description:
      "Take a day for the trail. This hilltop walk is a simple way to leave the routine behind and see the world from a little higher up.",
    highlights: ["Hilltop trail", "Forest walk", "Panoramic views"],
    plan: ["Arrive at the trail, hike at a comfortable pace, and return"],
  },
  {
    id: "kashmir",
    name: "Kashmir",
    region: "Azad Kashmir",
    days: 3,
    type: "Sightseeing Tours",
    image: "kashmir",
    label: "Slow days, green valleys",
    line: "A place to pause and take it all in.",
    description:
      "Spend a few days surrounded by rolling green landscapes and open skies. Shape the route around your group, your interests, and your pace.",
    highlights: ["Valley scenery", "Local villages", "Relaxed walks"],
    reviews: [
      {
        name: "Amna & Tariq (Islamabad)",
        rating: 5,
        text: "Rawalakot and Banjosa Lake were so serene. Saadi's hotel selection was excellent, with fresh local food and clean rooms.",
      },
    ],
    plan: [
      "Set off toward the green valleys",
      "Explore the surrounding landscapes",
      "Enjoy a slow morning before heading back",
    ],
  },
  {
    id: "basho",
    name: "Skardu & Basho",
    region: "Gilgit-Baltistan",
    days: 6,
    type: "Adventure",
    image: "basho",
    label: "Go a little further",
    line: "Beyond the familiar, into the valley.",
    description:
      "Pair the lakes and landscapes of Skardu with a quieter valley escape in Basho. A longer journey for travellers who like a little more discovery.",
    highlights: ["Skardu", "Basho Valley", "Forest landscapes"],
    plan: [
      "Journey toward Skardu",
      "Explore the lakes",
      "Discover the surrounding valley",
      "Travel into Basho",
      "Enjoy a day among the trees",
      "Return from the mountains",
    ],
  },
  {
    id: "northern-loop",
    name: "Hunza & Skardu",
    region: "Gilgit-Baltistan",
    days: 8,
    type: "Adventure",
    image: "northern-loop",
    label: "The great northern journey",
    line: "Two remarkable places. One beautiful journey.",
    description:
      "Give the north the time it deserves. Connect the landscapes of Hunza and Skardu on an extended journey of lakes, villages, and winding mountain roads.",
    highlights: ["Hunza Valley", "Skardu", "Karakoram landscapes"],
    plan: [
      "Begin the journey north",
      "Arrive and settle into Hunza",
      "Discover Karimabad",
      "Explore Attabad and the upper valley",
      "Travel toward Skardu",
      "A day around the lakes",
      "Explore the wider valley",
      "Take the memories home",
    ],
  },
];

export const imageUrl = (name: string) =>
  `${import.meta.env.BASE_URL}images/${name}.webp`;
export const photoKey = (id: string) => (id === "northern-loop" ? "passu" : id);
export const photo = (id: string, small = false) =>
  `${import.meta.env.BASE_URL}photos/${photoKey(id)}${small ? "-small" : ""}.webp`;
export const secondPhoto = (id: string) =>
  photo(id === "northern-loop" ? "skardu" : id + "-detail");
export const captions: Record<string, string> = {
  hunza: "Attabad Lake, Hunza",
  skardu: "Lower Kachura Lake, Skardu",
  "fairy-meadows": "Nanga Parbat from Fairy Meadows",
  neelum: "Arang Kel, Neelum Valley",
  swat: "Kalam, Swat Valley",
  naran: "Saif ul Malook Lake, Naran",
  shogran: "Shogran, Kaghan Valley",
  "malam-jabba": "Malam Jabba, Swat",
  sharan: "Sharan Forest, Kaghan Valley",
  mushkpuri: "Mushkpuri, Galyat",
  kashmir: "Banjosa Lake, Rawalakot",
  basho: "Basho Valley, Baltistan",
  "northern-loop": "Passu Cones, Upper Hunza",
};
export const regions = [
  "Gilgit-Baltistan",
  "Khyber Pakhtunkhwa",
  "Azad Kashmir",
];
export const contact = {
  phone: "+92 335 0910377",
  whatsapp: "923350910377",
  email: "travelwithsaadi@gmail.com",
  address: "GT Road, Haripur, Pakistan",
};

// Separate places from the tours that visit them. Prices and departures must be
// supplied by the operator; undefined means a quote/date confirmation is needed.
export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  tourIds: string[];
}
export const destinations: Destination[] = trips
  .filter((trip) => trip.id !== "northern-loop")
  .map((trip) => ({
    id: trip.id,
    name: trip.id === "basho" ? "Basho Valley" : trip.name,
    region: trip.region,
    description:
      trip.id === "basho"
        ? "Explore Basho Valley through our Skardu & Basho tour, with time among the forests and mountain scenery."
        : trip.description,
    tourIds:
      trip.id === "hunza"
        ? ["hunza", "northern-loop"]
        : trip.id === "skardu"
          ? ["skardu", "basho", "northern-loop"]
          : [trip.id],
  }));
export const toursForDestination = (id: string) => {
  const destination = destinations.find((place) => place.id === id);
  return destination
    ? trips.filter((tour) => destination.tourIds.includes(tour.id))
    : [];
};
export const money = (amount: number) =>
  `PKR ${amount.toLocaleString("en-PK")}`;
export const startingPrice = (tour: Trip) =>
  tour.pricePerPerson != null
    ? `From ${money(tour.pricePerPerson)} / person`
    : "Price on request";
export const ratingLabel = (tour: Trip) =>
  tour.reviews?.length
    ? `${(tour.reviews.reduce((sum, review) => sum + review.rating, 0) / tour.reviews.length).toFixed(1)} / 5 · ${tour.reviews.length} reviews`
    : "No reviews yet";

// app/restaurants/page.tsx

import Map, { Restaurant } from "@/components/Map";

const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Sushi Spot",
    location: { lat: 28.6139, lng: 77.2090 },
  },
  {
    id: "2",
    name: "Pizza Palace",
    location: { lat: 28.6200, lng: 77.2100 },
  },
];

export default function Nearby() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nearby Restaurants</h1>
      <Map restaurants={restaurants} />
    </div>
  );
}


// 'use client';
// import { useEffect, useState } from 'react';

// export default function LocationFetcher() {
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
//   const [restaurants, setRestaurants] = useState<any[]>([]);
//   const [address, setAddress] = useState('');

//   console.log("restaurants", restaurants);
//   console.log("address", address);
//    console.log("location", location);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((pos) => {
//         const { latitude, longitude } = pos.coords;
//         setLocation({ lat: latitude, lng: longitude });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (location) {
//       const { lat, lng } = location;

//       fetch(`/api/nearby?lat=${lat}&lng=${lng}`)
//         .then((res) => res.json())
//         .then((data) => setRestaurants(data));

//       fetch(`/api/geocode?lat=${lat}&lng=${lng}`)
//         .then((res) => res.json())
//         .then((data) => setAddress(data?.formatted_address));
//     }
//   }, [location]);

//   return (
//     <div className='min-h-screen'>
//       <h2>📍 Current Location: {location ? `${location.lat}, ${location.lng}` : 'Fetching location...'}</h2>
//       <p>{address || 'Fetching address...'}</p>

//       <h2>🍽️ Nearby Restaurants:</h2>
//       <ul>
//         {restaurants.map((r) => (
//           <li key={r.place_id}>{r.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }


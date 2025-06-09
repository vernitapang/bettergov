import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Star, Clock, Users, ArrowLeft, ExternalLink, Heart, Share2, Bookmark, Activity } from 'lucide-react';
import Button from '../../../components/ui/Button';
import SEO from '../../../components/SEO';

// Define destination types
type DestinationType = 'beach' | 'mountain' | 'city' | 'cultural' | 'island';

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  type: DestinationType;
  rating: number;
  imageUrl: string;
  imageCredit: string;
  bestTimeToVisit: string;
  activities: string[];
  tags: string[];
  longDescription?: string;
  howToGetThere?: string;
  whereToStay?: string[];
  nearbyAttractions?: string[];
  localCuisine?: string[];
  travelTips?: string[];
  gallery?: {url: string, caption: string, credit: string}[];
}

// This would typically come from an API or database
const destinations: Destination[] = [
  {
    id: 'boracay',
    name: 'Boracay',
    location: 'Aklan',
    description: 'Famous for its pristine white sand beaches and crystal-clear waters, Boracay is a tropical paradise that offers a perfect blend of relaxation and adventure.',
    type: 'beach',
    rating: 4.8,
    imageUrl: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
    imageCredit: 'Asad Photo Maldives',
    bestTimeToVisit: 'November to May',
    activities: ['Swimming', 'Snorkeling', 'Island Hopping', 'Parasailing', 'Nightlife'],
    tags: ['White Beach', 'Island', 'Luxury', 'Nightlife'],
    longDescription: 'Boracay is a small island in the central Philippines, known worldwide for its stunning White Beach, a 4-kilometer stretch of powdery white sand lined with palm trees, resorts, restaurants, and bars. After undergoing a six-month rehabilitation in 2018, the island has been restored to its pristine condition with stricter environmental regulations in place.\n\nBeyond White Beach, Boracay offers numerous other attractions. Puka Shell Beach on the northern tip is less crowded and known for its natural beauty. Bulabog Beach on the eastern side is a hub for kiteboarding and windsurfing. The island also features hidden coves, viewpoints like Mount Luho, and vibrant marine life perfect for snorkeling and diving.\n\nBoracay comes alive at night with beachfront dining, fire dancing shows, and a variety of bars and clubs. Despite its small size (just 7 kilometers long), Boracay offers a diverse range of experiences from relaxation to adventure, making it a perfect destination for all types of travelers.',
    howToGetThere: 'To reach Boracay, fly to either Kalibo International Airport (approximately 2 hours from Boracay) or Caticlan Airport (just 15 minutes from Boracay). From either airport, take a land transfer to Caticlan Jetty Port, then a 15-minute boat ride to Boracay Island. Upon arrival at Boracay, tricycles and e-trikes are available for transportation to your accommodation.',
    whereToStay: [
      'Luxury: Shangri-La Boracay Resort & Spa, The Lind Boracay, Crimson Resort and Spa Boracay',
      'Mid-range: Coast Boracay, Henann Garden Resort, Astoria Current',
      'Budget: Frendz Resort & Hostel, MNL Beach Hostel Boracay, Dormitels Boracay'
    ],
    nearbyAttractions: [
      'Ariel\'s Point for cliff diving',
      'Crystal Cove Island',
      'Crocodile Island for snorkeling',
      'Motag Living Museum',
      'Willy\'s Rock'
    ],
    localCuisine: [
      'Freshly grilled seafood at D\'Talipapa',
      'Calamansi muffins from Real Coffee & Tea Café',
      'Chori burger (Filipino chorizo burger)',
      'Coconut-based dishes and fresh tropical fruits',
      'Filipino fusion cuisine at Sunny Side Café'
    ],
    travelTips: [
      'Book accommodations well in advance, especially during peak season',
      'Bring reef-safe sunscreen to protect the marine environment',
      'Respect the island\'s environmental regulations, including no smoking/drinking on the beach',
      'The island has an environmental fee (approximately PHP 150) collected upon arrival',
      'Most establishments accept credit cards, but it\'s good to have cash for small vendors'
    ],
    gallery: [
      {
        url: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
        caption: 'Crystal clear waters perfect for swimming',
        credit: 'Belle Co'
      },
      {
        url: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
        caption: 'Stunning sunset views from White Beach',
        credit: 'Aron Visuals'
      },
      {
        url: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
        caption: 'Water activities and island hopping adventures',
        credit: 'Asad Photo Maldives'
      }
    ]
  },
  {
    id: 'palawan',
    name: 'El Nido',
    location: 'Palawan',
    description: 'El Nido is known for its stunning limestone cliffs, secret lagoons, and pristine beaches. It\'s a gateway to the Bacuit Archipelago with its hidden coves and rich marine life.',
    type: 'island',
    rating: 4.9,
    imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
    imageCredit: 'Aron Visuals',
    bestTimeToVisit: 'December to May',
    activities: ['Island Hopping', 'Kayaking', 'Snorkeling', 'Diving', 'Beach Camping'],
    tags: ['Limestone Cliffs', 'Lagoons', 'Island Hopping', 'Nature'],
    longDescription: 'El Nido, located at the northern tip of Palawan Island, is a paradise of limestone karst landscapes, hidden lagoons, and pristine beaches. Often described as one of the most beautiful beach destinations in the world, El Nido serves as the gateway to the stunning Bacuit Archipelago, a collection of islands with dramatic rock formations rising from crystal-clear waters.\n\nThe area is famous for its island-hopping tours, categorized as Tours A, B, C, and D, each exploring different islands, lagoons, and beaches. Highlights include the Big and Small Lagoons, Secret Lagoon, Hidden Beach, and Snake Island with its S-shaped sandbar. The underwater world is equally impressive, with vibrant coral reefs and diverse marine life making it a haven for snorkelers and divers.\n\nEl Nido town itself has transformed from a sleepy fishing village to a tourism hub, though it still maintains much of its laid-back charm. The area offers a range of accommodations from luxury resorts on private islands to budget-friendly hostels in town. Despite its growing popularity, El Nido remains a place of extraordinary natural beauty where visitors can disconnect and immerse themselves in nature.',
    howToGetThere: 'To reach El Nido, fly to Puerto Princesa International Airport, then take a 5-6 hour van or bus ride to El Nido town. Alternatively, direct flights to El Nido Airport (Lio Airport) are available from Manila and Cebu, though these tend to be more expensive. From El Nido town, boats can take you to the various islands and attractions in the Bacuit Archipelago.',
    whereToStay: [
      'Luxury: El Nido Resorts (Miniloc, Lagen, Pangulasian, or Apulit Island), Cauayan Island Resort, Matinloc Resort',
      'Mid-range: Coco Resort, The Nest El Nido, Maremegmeg Beach Club',
      'Budget: Outpost Beach Hostel, Spin Designer Hostel, Our Melting Pot Hostel'
    ],
    nearbyAttractions: [
      'Nacpan Beach - a 4-kilometer stretch of golden sand',
      'Duli Beach - popular for surfing',
      'Taraw Cliff for panoramic views (guided climb required)',
      'Marimegmeg Beach for sunset views',
      'Lio Beach - a developing eco-tourism estate'
    ],
    localCuisine: [
      'Fresh seafood grilled on the beach',
      'Coconut-based dishes like Ginataang Manok (chicken in coconut milk)',
      'Halo-halo (Filipino shaved ice dessert)',
      'Kinilaw (Filipino ceviche)',
      'Tamilok (woodworm) for the adventurous eater'
    ],
    travelTips: [
      'Book island hopping tours in advance during peak season',
      'Bring cash as ATMs are limited and many places don\'t accept cards',
      'Pack reef-safe sunscreen and insect repellent',
      'Consider staying in town for more dining options or on the islands for seclusion',
      'The environmental fee is approximately PHP 200 and valid for 10 days'
    ],
    gallery: [
      {
        url: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
        caption: 'Stunning limestone formations in the Bacuit Archipelago',
        credit: 'Belle Co'
      },
      {
        url: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
        caption: 'Crystal clear waters perfect for snorkeling',
        credit: 'Asad Photo Maldives'
      },
      {
        url: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
        caption: 'Hidden lagoons accessible by kayak',
        credit: 'Asad Photo Maldives'
      }
    ]
  },
  {
    id: 'banaue',
    name: 'Banaue Rice Terraces',
    location: 'Ifugao',
    description: 'Often called the "Eighth Wonder of the World," these 2,000-year-old terraces were carved into the mountains by ancestors of the indigenous people.',
    type: 'cultural',
    rating: 4.7,
    imageUrl: 'https://images.pexels.com/photos/673020/pexels-photo-673020.jpeg',
    imageCredit: 'eberhard grossgasteiger',
    bestTimeToVisit: 'March to July',
    activities: ['Trekking', 'Cultural Tours', 'Photography', 'Village Visits'],
    tags: ['UNESCO Heritage', 'Indigenous Culture', 'Mountains', 'Hiking'],
    longDescription: 'The Banaue Rice Terraces are ancient engineering marvels carved into the mountains of Ifugao province by the ancestors of the indigenous Ifugao people. Often referred to as the "Eighth Wonder of the World," these terraces were built largely by hand approximately 2,000 years ago and follow the natural contours of the mountains.\n\nThe terraces demonstrate the remarkable ingenuity of the Ifugao people, featuring an elaborate irrigation system that draws water from the mountaintop forests. They rise to an altitude of about 1,500 meters (4,900 feet) and cover over 10,000 square kilometers of mountainside. If placed end to end, the terraces would stretch more than 22,000 kilometers, circling half the globe.\n\nBeyond their agricultural function, the rice terraces represent the harmony between humans and their environment and are deeply integrated with the Ifugao cultural heritage, including rituals, folk traditions, and sustainable farming practices passed down through generations. The UNESCO World Heritage Site actually encompasses several terrace clusters in the region, including Batad and Bangaan, each offering unique perspectives and trekking experiences.',
    howToGetThere: 'From Manila, take an 8-10 hour bus ride to Banaue town. Major bus companies like Ohayami Trans and Coda Lines offer overnight trips. Alternatively, you can take a flight to Cauayan Airport in Isabela province, followed by a 3-hour drive to Banaue. From Banaue town, jeepneys and tricycles can take you to various viewpoints and trailheads for the different terrace clusters.',
    whereToStay: [
      'Banaue Hotel and Youth Hostel - government-run hotel with good views',
      'Banaue Homestay - authentic experience with local families',
      'Batad Pension and Restaurant - located near the Batad Rice Terraces',
      'Hillside Inn - budget-friendly option in Banaue town',
      'Uyami\'s Green View Restaurant and Homestay - offers good views of the terraces'
    ],
    nearbyAttractions: [
      'Batad Rice Terraces - amphitheater-like terraces',
      'Tappiya Waterfall - accessible via trek from Batad',
      'Bangaan Rice Terraces - UNESCO Heritage Site',
      'Hapao Rice Terraces - less visited but equally beautiful',
      'Sagada - nearby town known for hanging coffins and caves'
    ],
    localCuisine: [
      'Pinikpikan - traditional Ifugao chicken dish',
      'Etag - preserved pork delicacy',
      'Binakle - sticky rice cake',
      'Rice wine (Tapuy) - traditional alcoholic beverage',
      'Organic red rice grown on the terraces'
    ],
    travelTips: [
      'Wear proper hiking shoes as paths can be slippery, especially during rainy season',
      'Hire a local guide for trekking - they provide cultural insights and ensure safety',
      'Respect local customs and ask permission before taking photos of residents',
      'Bring warm clothing as mountain temperatures can drop at night',
      'Allow at least 2-3 days to properly explore the different terrace clusters'
    ],
    gallery: [
      {
        url: 'https://images.pexels.com/photos/673020/pexels-photo-673020.jpeg',
        caption: 'Panoramic view of the ancient rice terraces',
        credit: 'eberhard grossgasteiger'
      },
      {
        url: 'https://images.pexels.com/photos/2166458/pexels-photo-2166458.jpeg',
        caption: 'Local Ifugao cultural traditions',
        credit: 'Flo Dahm'
      },
      {
        url: 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg',
        caption: 'Misty mountain views of Ifugao province',
        credit: 'Valdemaras D.'
      }
    ]
  },
  // Additional destinations would be defined here
];

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true);
    const foundDestination = destinations.find(d => d.id === id);
    setDestination(foundDestination || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h1>
            <p className="text-gray-600 mb-6">
              We couldn't find the destination you're looking for. It may have been removed or you might have followed a broken link.
            </p>
            <Link to="/travel/destinations">
              <Button leftIcon={<ArrowLeft className="h-4 w-4" />}>
                Back to All Destinations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Prepare gallery images, using main image as first if no gallery provided
  const galleryImages = destination.gallery || [
    {
      url: destination.imageUrl,
      caption: destination.name,
      credit: destination.imageCredit
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${destination.name} - Philippine Travel Destination`}
        description={destination.description}
        keywords={[destination.name, destination.location, "Philippines travel", ...destination.tags]}
        ogImage={destination.imageUrl}
      />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={destination.imageUrl} 
            alt={destination.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="absolute top-4 left-4 z-10">
          <Link to="/travel/destinations" className="flex items-center text-white bg-black/30 hover:bg-black/50 px-4 py-2 rounded-full transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Destinations</span>
          </Link>
        </div>
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              <div className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span className="capitalize">{destination.type}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {destination.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{destination.location}, Philippines</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>{destination.rating} rating</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span>Best time: {destination.bestTimeToVisit}</span>
                </div>
              </div>
              <p className="text-xs text-white/70">
                Photo by <a href={`https://www.pexels.com/@${destination.imageCredit.toLowerCase().replace(/\s+/g, '-')}/`} className="underline hover:text-white\" target="_blank\" rel="noopener noreferrer">{destination.imageCredit}</a> on Pexels
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {destination.longDescription || destination.description}
                </p>

                {/* Activities Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                    Top Activities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {destination.activities.map((activity, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to Get There */}
                {destination.howToGetThere && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Get There</h3>
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-700 leading-relaxed">
                      {destination.howToGetThere}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Gallery</h3>
                  <div className="relative">
                    <div className="relative h-80 rounded-lg overflow-hidden mb-2">
                      <img 
                        src={galleryImages[activeImageIndex].url} 
                        alt={galleryImages[activeImageIndex].caption} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white text-sm">{galleryImages[activeImageIndex].caption}</p>
                        <p className="text-white/70 text-xs">
                          Photo by {galleryImages[activeImageIndex].credit} on Pexels
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {galleryImages.map((image, index) => (
                        <button 
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${index === activeImageIndex ? 'ring-2 ring-blue-500' : 'opacity-70'}`}
                        >
                          <img 
                            src={image.url} 
                            alt={`Thumbnail ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Travel Tips */}
                {destination.travelTips && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Travel Tips</h3>
                    <ul className="space-y-2">
                      {destination.travelTips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xs mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-900">{destination.location}, Philippines</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Best Time to Visit</p>
                      <p className="text-gray-900">{destination.bestTimeToVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Recommended Stay</p>
                      <p className="text-gray-900">3-5 days</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Ideal For</p>
                      <p className="text-gray-900">
                        {destination.type === 'beach' && 'Beach lovers, couples, families'}
                        {destination.type === 'mountain' && 'Hikers, nature enthusiasts, photographers'}
                        {destination.type === 'city' && 'Urban explorers, history buffs, foodies'}
                        {destination.type === 'cultural' && 'Culture seekers, history enthusiasts, photographers'}
                        {destination.type === 'island' && 'Island hoppers, divers, nature lovers'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Where to Stay */}
            {destination.whereToStay && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Where to Stay</h3>
                  <ul className="space-y-3">
                    {destination.whereToStay.map((accommodation, index) => (
                      <li key={index} className="text-gray-700">
                        {accommodation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Nearby Attractions */}
            {destination.nearbyAttractions && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Nearby Attractions</h3>
                  <ul className="space-y-2">
                    {destination.nearbyAttractions.map((attraction, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-2 w-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                        <span className="text-gray-700">{attraction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Local Cuisine */}
            {destination.localCuisine && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Cuisine</h3>
                  <ul className="space-y-2">
                    {destination.localCuisine.map((dish, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-2 w-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                        <span className="text-gray-700">{dish}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Destinations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations
              .filter(d => d.id !== destination.id && d.type === destination.type)
              .slice(0, 3)
              .map(relatedDest => (
                <Link 
                  key={relatedDest.id} 
                  to={`/travel/destinations/${relatedDest.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={relatedDest.imageUrl} 
                        alt={relatedDest.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-lg font-bold text-white">{relatedDest.name}</h3>
                        <div className="flex items-center text-white/90">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{relatedDest.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedDest.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{relatedDest.rating}</span>
                        </div>
                        <span className="text-sm text-blue-600 group-hover:underline">View Details</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6 md:p-8">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to explore {destination.name}?</h3>
              <p className="text-gray-600">Plan your trip with our comprehensive travel guides and resources.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button>
                Plan Your Trip
              </Button>
              <Button variant="outline">
                View Travel Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
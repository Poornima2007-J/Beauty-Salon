import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search, Compass, Clock, MapPin, Navigation, Sparkles, CreditCard,
  Calendar, UserCheck, Smartphone, BadgeCheck, Layers, ShoppingBag,
  X, Star, Route, MessageCircle, Scissors
} from 'lucide-react';

const salonsData = [
  { id: 1, name: 'G3 Luxury Salon', area: 'Nehru Nagar West', address: 'G3 Luxury Salon, Nehru Nagar West, Coimbatore, Tamil Nadu', rating: 5.0, reviews: '3.2K', lat: 11.0435, lng: 77.0224, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80', phone: '+91 422 456 7890', timing: '9:00 AM - 10:00 PM' },
  { id: 2, name: 'F2 Hairdressers Unisex Salon', area: 'RS Puram', address: 'F2 Hairdressers Unisex Salon, RS Puram, Coimbatore, Tamil Nadu', rating: 4.5, reviews: '471', lat: 11.0118, lng: 76.9452, image: 'https://tse4.mm.bing.net/th/id/OIP.0FL9UhWNr2f8mu9UOfIkOAHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', phone: '+91 422 254 1212', timing: '9:30 AM - 9:00 PM' },
  { id: 3, name: 'Lakme Salon Racecourse', area: 'Racecourse Road', address: 'Lakme Salon Racecourse Road, Coimbatore, Tamil Nadu', rating: 4.5, reviews: '1.6K', lat: 10.9995, lng: 76.9678, image: 'https://www.nearbyspasalon.com/blog/wp-content/uploads/2023/02/lakme-salon-price-list.webp', phone: '+91 422 222 1122', timing: '9:00 AM - 9:00 PM' },
  { id: 4, name: 'Studio11 Salon & Spa', area: 'Sivananda Colony', address: 'Studio11 Salon and Spa, Sivananda Colony, Coimbatore, Tamil Nadu', rating: 4.8, reviews: '1.9K', lat: 11.0265, lng: 76.9538, image: 'https://hyderabadboss.com/wp-content/uploads/2016/11/studio11.jpg', phone: '+91 95007 33445', timing: '9:00 AM - 9:00 PM' },
  { id: 5, name: 'Green Trends Salon', area: 'Mettupalayam Road', address: 'Green Trends Salon, Mettupalayam Road, Coimbatore, Tamil Nadu', rating: 4.8, reviews: '2.2K', lat: 11.0772, lng: 76.9412, image: 'https://tse4.mm.bing.net/th/id/OIP.WjbiemiFWfFoy7ZLMfs_IAHaE7?r=0&w=512&h=341&rs=1&pid=ImgDetMain&o=7&rm=3', phone: '+91 422 264 4455', timing: '9:00 AM - 9:00 PM' },
  { id: 6, name: 'Naturals Salon Uppilipalayam', area: 'Kamarajar Road', address: 'Naturals Salon Uppilipalayam Kamarajar Road, Coimbatore, Tamil Nadu', rating: 4.8, reviews: '2K', lat: 11.0098, lng: 77.0124, image: 'https://naturals.in/FRANCHISE/assets/natW_2.png', phone: '+91 422 421 0022', timing: '9:00 AM - 9:00 PM' },
  { id: 7, name: 'Studieo 7 Ganapathy', area: 'Sathy Main Road', address: 'Studieo 7 Salon, Ganapathy, Sathy Main Road, Coimbatore, Tamil Nadu', rating: 4.6, reviews: '1.7K', lat: 11.0315, lng: 76.9748, image: 'https://studieo7.in/wp-content/uploads/2022/12/meta1-scaled-1.jpg', phone: '+91 73737 36321', timing: '9:30 AM - 8:30 PM' },
  { id: 8, name: 'TONI & GUY Essensuals', area: 'Hope College', address: 'TONI and GUY Essensuals, Hope College, Coimbatore, Tamil Nadu', rating: 4.7, reviews: '1.4K', lat: 11.0245, lng: 77.0012, image: 'https://www.joonsquare.com/usermanage/image/business/toniandguy-essensuals-kanyakumari-36791/toniandguy-essensuals-kanyakumari-toniandguy-essensuals1.jpg', phone: '+91 422 452 1100', timing: '9:00 AM - 10:00 PM' },
  { id: 9, name: 'Vikas Marwah Salon', area: 'Peelamedu', address: 'Vikas Marwah Salon, Peelamedu, Coimbatore, Tamil Nadu', rating: 4.9, reviews: '930', lat: 11.0289, lng: 77.0084, image: 'https://tse3.mm.bing.net/th/id/OIP.TW2UHwJjdHeLlz7zBLqUJQHaFG?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', phone: '+91 98430 12345', timing: '10:00 AM - 8:00 PM' },
  { id: 10, name: 'Bounce Salon & Spa', area: 'Avinashi Road', address: 'Bounce Salon and Spa, Avinashi Road, Coimbatore, Tamil Nadu', rating: 4.7, reviews: '1.1K', lat: 11.0210, lng: 76.9950, image: 'https://www.topbengaluru.com/wp-content/uploads/2024/05/Bounce-Salon-and-Spa.jpg', phone: '+91 422 420 4060', timing: '9:00 AM - 9:00 PM' },
  { id: 11, name: 'Page 3 Luxury Salon', area: 'Saibaba Colony', address: 'Page 3 Luxury Salon, Saibaba Colony, Coimbatore, Tamil Nadu', rating: 4.9, reviews: '1.8K', lat: 11.0252, lng: 76.9380, image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=700&q=80', phone: '+91 422 498 1122', timing: '9:00 AM - 9:30 PM' },
  { id: 12, name: 'Limelite Salon & Spa', area: 'Racecourse Road', address: 'Limelite Salon and Spa, Racecourse Road, Coimbatore, Tamil Nadu', rating: 4.6, reviews: '820', lat: 11.0012, lng: 76.9710, image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=700&q=80', phone: '+91 422 222 3456', timing: '10:00 AM - 9:00 PM' },
  { id: 13, name: 'Ziva Spa & Unisex Salon', area: 'Saravanampatti', address: 'Ziva Spa and Unisex Salon, Saravanampatti, Coimbatore, Tamil Nadu', rating: 4.4, reviews: '650', lat: 11.0655, lng: 76.9922, image: 'https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=700&q=80', phone: '+91 90430 55432', timing: '9:30 AM - 8:30 PM' },
  { id: 14, name: 'Trends Exotic Salon', area: 'Ramanathapuram', address: 'Trends Exotic Salon, Ramanathapuram, Coimbatore, Tamil Nadu', rating: 4.7, reviews: '1.2K', lat: 10.9992, lng: 76.9935, image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=700&q=80', phone: '+91 422 432 9988', timing: '9:00 AM - 9:00 PM' },
  { id: 15, name: 'Bubbles Hair & Beauty', area: 'RS Puram', address: 'Bubbles Hair and Beauty, RS Puram, Coimbatore, Tamil Nadu', rating: 4.8, reviews: '990', lat: 11.0135, lng: 76.9472, image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=700&q=80', phone: '+91 422 435 4355', timing: '9:30 AM - 9:00 PM' },
  { id: 16, name: 'Vurve Signature Salon', area: 'Racecourse Road', address: 'Vurve Signature Salon, Racecourse Road, Coimbatore, Tamil Nadu', rating: 5.0, reviews: '2.1K', lat: 10.9980, lng: 76.9695, image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=700&q=80', phone: '+91 97784 12345', timing: '9:00 AM - 10:00 PM' },
  { id: 17, name: 'BBlunt Coimbatore', area: 'Peelamedu', address: 'BBlunt Salon, Peelamedu, Coimbatore, Tamil Nadu', rating: 4.7, reviews: '540', lat: 11.0270, lng: 77.0045, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80', phone: '+91 422 465 7700', timing: '10:00 AM - 9:00 PM' },
  { id: 18, name: 'Essensuals by Toni & Guy', area: 'Vadavalli', address: 'Essensuals by Toni and Guy, Vadavalli, Coimbatore, Tamil Nadu', rating: 4.6, reviews: '730', lat: 11.0215, lng: 76.9055, image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=700&q=80', phone: '+91 422 242 3344', timing: '9:00 AM - 9:00 PM' },
  { id: 19, name: 'Javed Habib Hair Lounge', area: 'Thudiyalur', address: 'Javed Habib Hair Lounge, Thudiyalur, Coimbatore, Tamil Nadu', rating: 4.3, reviews: '1.1K', lat: 11.0795, lng: 76.9360, image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=700&q=80', phone: '+91 422 264 2211', timing: '9:30 AM - 8:30 PM' },
  { id: 20, name: 'Envi Salon & Spa', area: 'Fun Republic Mall', address: 'Envi Salon and Spa, Fun Republic Mall, Coimbatore, Tamil Nadu', rating: 4.5, reviews: '890', lat: 11.0240, lng: 77.0115, image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=700&q=80', phone: '+91 422 421 9090', timing: '10:00 AM - 9:30 PM' },
  { id: 21, name: 'Chroma Hair Studio', area: 'Singanallur', address: 'Chroma Hair Studio, Singanallur, Coimbatore, Tamil Nadu', rating: 4.8, reviews: '420', lat: 11.0040, lng: 77.0290, image: 'https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=700&q=80', phone: '+91 98765 43210', timing: '9:00 AM - 9:00 PM' },
  { id: 22, name: 'Sizzlers Scissors Unisex Salon', area: 'Kovaipudur', address: 'Sizzlers Scissors Unisex Salon, Kovaipudur, Coimbatore, Tamil Nadu', rating: 4.5, reviews: '310', lat: 10.9525, lng: 76.9210, image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=700&q=80', phone: '+91 95666 77889', timing: '9:30 AM - 8:30 PM' }
];

const coreServices = [
  { id: 'cs1', name: 'Premium Hair Design & Styling', price: 600 },
  { id: 'cs2', name: 'VIP Ultra Beard Sculpting', price: 350 },
  { id: 'cs3', name: 'Detox Charcoal Facial Glow', price: 1100 },
  { id: 'cs4', name: 'Global Keratin Therapy Treatment', price: 2800 },
  { id: 'cs5', name: 'Moroccan Hair Spa Luxury Ritual', price: 1800 }
];

const premiumStylists = [
  { id: 'sty1', name: 'Master Barber Rahul', rank: 'Senior Top Tier' },
  { id: 'sty2', name: 'Stylist Priya Sharma', rank: 'Color Specialist' },
  { id: 'sty3', name: 'Aarav Kumar', rank: 'Texture Expert' }
];

const dynamicTimeSlots = ['09:30 AM', '11:00 AM', '01:30 PM', '03:40 PM', '06:00 PM', '08:15 PM'];

const MASTER_USER_LAT = 11.0110;
const MASTER_USER_LNG = 76.9665;

function computeHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const rLat = (lat2 - lat1) * Math.PI / 180;
  const rLon = (lon2 - lon1) * Math.PI / 180;
  const val =
    Math.sin(rLat / 2) * Math.sin(rLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(rLon / 2) *
    Math.sin(rLon / 2);

  return parseFloat((2 * R * Math.atan2(Math.sqrt(val), Math.sqrt(1 - val))).toFixed(1));
}

function calculateDurationValue(kilometers) {
  const dynamicMinutes = Math.round((kilometers / 26) * 60);
  return dynamicMinutes < 6 ? 6 : dynamicMinutes;
}

function buildFallbackRoadLikeRoute(from, to) {
  const midLat = (from.lat + to.lat) / 2;
  const midLng = (from.lng + to.lng) / 2;

  return [
    [from.lat, from.lng],
    [from.lat + (midLat - from.lat) * 0.45, from.lng + 0.009],
    [midLat + 0.004, midLng - 0.006],
    [midLat - 0.003, midLng + 0.007],
    [to.lat - 0.004, to.lng - 0.003],
    [to.lat, to.lng]
  ];
}

export default function UltimatePremiumSalonHub() {
  const [queryKeyword, setQueryKeyword] = useState('');
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [isLeafletReady, setIsLeafletReady] = useState(false);
  const [activeWindowTab, setActiveWindowTab] = useState('mapView');

  const [liveUserPosition, setLiveUserPosition] = useState({ lat: MASTER_USER_LAT, lng: MASTER_USER_LNG });
  const [drivingRoutePoints, setDrivingRoutePoints] = useState([]);
  const [drivingRouteInfo, setDrivingRouteInfo] = useState(null);

  const [isBookingDeskOpen, setIsBookingDeskOpen] = useState(false);
  const [inputCustomerName, setInputCustomerName] = useState('');
  const [inputCustomerPhone, setInputCustomerPhone] = useState('');
  const [chosenServiceArray, setChosenServiceArray] = useState(['cs1']);
  const [inputStylistSelection, setInputStylistSelection] = useState('sty1');
  const [inputServiceMode, setInputServiceMode] = useState('Salon Visit');
  const [inputPaymentGateway, setInputPaymentGateway] = useState('Pay At Salon Counter');
  const [inputTargetDate, setInputTargetDate] = useState('2026-06-20');
  const [inputTargetSlot, setInputTargetSlot] = useState('11:00 AM');
  const [inputContactMode, setInputContactMode] = useState('WhatsApp Updates');
  const [inputBookingNotes, setInputBookingNotes] = useState('');

  const [notificationBanner, setNotificationBanner] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [finalInvoiceReceipt, setFinalInvoiceReceipt] = useState(null);

  const [persistentHistoryRegistry, setPersistentHistoryRegistry] = useState(() => {
    try {
      const storedData = localStorage.getItem('KOVAI_GOLD_SALON_HISTORY_PRO');
      return storedData ? JSON.parse(storedData) : [];
    } catch {
      return [];
    }
  });

  const domMapElementRef = useRef(null);
  const nativeLeafletMapRef = useRef(null);
  const liveActiveMarkersRef = useRef({});
  const routeLayerGroupRef = useRef(null);
  const userMarkerRef = useRef(null);

  const parsedFilteredSalons = useMemo(() => {
    return salonsData.filter((salonNode) =>
      salonNode.name.toLowerCase().includes(queryKeyword.toLowerCase()) ||
      salonNode.area.toLowerCase().includes(queryKeyword.toLowerCase()) ||
      salonNode.address.toLowerCase().includes(queryKeyword.toLowerCase())
    );
  }, [queryKeyword]);

  const selectedStylist = premiumStylists.find((sty) => sty.id === inputStylistSelection);
  const selectedDistance = selectedSalon
    ? computeHaversineDistance(liveUserPosition.lat, liveUserPosition.lng, selectedSalon.lat, selectedSalon.lng)
    : 0;

  const buildGooglePlaceUrl = (salon) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salon.address)}`;
  };

  const buildGoogleLiveMapEmbedUrl = (salon) => {
    const query = encodeURIComponent(salon.address);
    return `https://maps.google.com/maps?hl=en&q=${query}&z=16&ie=UTF8&iwloc=B&output=embed`;
  };

  const calculateSubtotalSum = () => {
    return chosenServiceArray.reduce((acc, currId) => {
      const matchObj = coreServices.find((service) => service.id === currId);
      return acc + (matchObj ? matchObj.price : 0);
    }, 0);
  };

  const triggerSystemNotification = (messageText) => {
    setNotificationBanner(messageText);
    setTimeout(() => setNotificationBanner(null), 3500);
  };

  const executeSalonNodeSelection = (salonNode) => {
    setSelectedSalon(salonNode);
    setIsBookingDeskOpen(false);
    setFinalInvoiceReceipt(null);
  };

  const purgeActiveStateMatrix = () => {
    setSelectedSalon(null);
    setIsBookingDeskOpen(false);
    setFinalInvoiceReceipt(null);
    setDrivingRoutePoints([]);
    setDrivingRouteInfo(null);

    if (routeLayerGroupRef.current) {
      routeLayerGroupRef.current.clearLayers();
    }

    if (nativeLeafletMapRef.current) {
      nativeLeafletMapRef.current.setView([liveUserPosition.lat, liveUserPosition.lng], 11, {
        animate: true,
        duration: 0.8
      });
    }
  };

  const executeBookingFormAction = () => {
    if (!selectedSalon) return;

    if (!inputCustomerName.trim() || !inputCustomerPhone.trim()) {
      alert('Please enter Name and Mobile Number to proceed.');
      return;
    }

    if (inputCustomerPhone.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid mobile number.');
      return;
    }

    setIsFormSubmitting(true);

    setTimeout(() => {
      setIsFormSubmitting(false);

      const bookingRegistryId = `REG-${Math.floor(10000 + Math.random() * 90000)}`;
      const handlingFees = inputServiceMode === 'Home Service' ? 200 : 40;
      const routeFee = inputServiceMode === 'Home Service' ? Math.round(selectedDistance * 12) : 0;
      const netCalculatedBill = calculateSubtotalSum() + handlingFees + routeFee;

      const recordInvoiceObj = {
        id: bookingRegistryId,
        date: inputTargetDate,
        time: inputTargetSlot,
        salon: selectedSalon.name,
        price: netCalculatedBill,
        mode: inputServiceMode,
        gateway: inputPaymentGateway,
        contactMode: inputContactMode,
        stylist: selectedStylist?.name || 'Any Stylist',
        notes: inputBookingNotes,
        status: 'Confirmed'
      };

      setFinalInvoiceReceipt(recordInvoiceObj);
      setPersistentHistoryRegistry((prev) => [recordInvoiceObj, ...prev]);
      triggerSystemNotification('Appointment confirmed successfully!');
    }, 1200);
  };

  useEffect(() => {
    localStorage.setItem('KOVAI_GOLD_SALON_HISTORY_PRO', JSON.stringify(persistentHistoryRegistry));
  }, [persistentHistoryRegistry]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLiveUserPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => {
        setLiveUserPosition({ lat: MASTER_USER_LAT, lng: MASTER_USER_LNG });
      },
      { enableHighAccuracy: true, timeout: 7000, maximumAge: 60000 }
    );
  }, []);

  useEffect(() => {
    if (!document.getElementById('leaflet-core-cdn-css')) {
      const cssLink = document.createElement('link');
      cssLink.id = 'leaflet-core-cdn-css';
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);
    }

    if (!window.L) {
      const scriptEngine = document.createElement('script');
      scriptEngine.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      scriptEngine.async = true;
      scriptEngine.onload = () => setIsLeafletReady(true);
      document.body.appendChild(scriptEngine);
    } else {
      setIsLeafletReady(true);
    }
  }, []);

  useEffect(() => {
    if (!selectedSalon) {
      setDrivingRoutePoints([]);
      setDrivingRouteInfo(null);
      return;
    }

    const controller = new AbortController();

    const loadRealRoadRoute = async () => {
      try {
        const url =
          `https://router.project-osrm.org/route/v1/driving/` +
          `${liveUserPosition.lng},${liveUserPosition.lat};${selectedSalon.lng},${selectedSalon.lat}` +
          `?overview=full&geometries=geojson&alternatives=false&steps=false`;

        const response = await fetch(url, { signal: controller.signal });
        const json = await response.json();
        const route = json?.routes?.[0];

        if (!route?.geometry?.coordinates?.length) throw new Error('Route not found');

        setDrivingRoutePoints(route.geometry.coordinates.map(([lng, lat]) => [lat, lng]));
        setDrivingRouteInfo({
          km: (route.distance / 1000).toFixed(1),
          mins: Math.max(6, Math.round(route.duration / 60))
        });
      } catch {
        const fallbackPoints = buildFallbackRoadLikeRoute(liveUserPosition, selectedSalon);
        const km = computeHaversineDistance(
          liveUserPosition.lat,
          liveUserPosition.lng,
          selectedSalon.lat,
          selectedSalon.lng
        );

        setDrivingRoutePoints(fallbackPoints);
        setDrivingRouteInfo({
          km,
          mins: calculateDurationValue(km)
        });
      }
    };

    loadRealRoadRoute();

    return () => controller.abort();
  }, [selectedSalon, liveUserPosition]);

  useEffect(() => {
    if (!isLeafletReady || !domMapElementRef.current || nativeLeafletMapRef.current || activeWindowTab !== 'mapView') return;

    const L = window.L;
    const mapObj = L.map(domMapElementRef.current, {
      zoomControl: true,
      attributionControl: false
    }).setView([liveUserPosition.lat, liveUserPosition.lng], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20
    }).addTo(mapObj);

    routeLayerGroupRef.current = L.layerGroup().addTo(mapObj);
    nativeLeafletMapRef.current = mapObj;
  }, [isLeafletReady, activeWindowTab, liveUserPosition]);

  useEffect(() => {
    if (!isLeafletReady || !nativeLeafletMapRef.current || activeWindowTab !== 'mapView') return;

    const L = window.L;
    const currentMapInstance = nativeLeafletMapRef.current;

    Object.values(liveActiveMarkersRef.current).forEach((markerItem) => currentMapInstance.removeLayer(markerItem));
    liveActiveMarkersRef.current = {};

    if (userMarkerRef.current) {
      currentMapInstance.removeLayer(userMarkerRef.current);
    }

    const userRadarIcon = L.divIcon({
      className: 'user-coordinate-anchor-node',
      html: `
        <div class="live-user-pin">
          <div class="live-user-pulse"></div>
          <div class="live-user-dot"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    userMarkerRef.current = L.marker([liveUserPosition.lat, liveUserPosition.lng], { icon: userRadarIcon })
      .addTo(currentMapInstance)
      .bindPopup('Your current location');

    parsedFilteredSalons.forEach((salonUnit) => {
      const isCurrentlySelected = selectedSalon?.id === salonUnit.id;

      const beautifulAnimatedPin = L.divIcon({
        className: 'crisp-salon-marker-node',
        html: `
          <div class="salon-map-pin ${isCurrentlySelected ? 'active' : ''}">
            <div class="pin-ring"></div>
            <div class="pin-body">
              <span>✂</span>
            </div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 40]
      });

      const mapMarkerInstance = L.marker([salonUnit.lat, salonUnit.lng], { icon: beautifulAnimatedPin })
        .addTo(currentMapInstance)
        .bindPopup(`<b>${salonUnit.name}</b><br>${salonUnit.area}`);

      mapMarkerInstance.on('click', () => executeSalonNodeSelection(salonUnit));
      liveActiveMarkersRef.current[salonUnit.id] = mapMarkerInstance;
    });

    if (routeLayerGroupRef.current) {
      routeLayerGroupRef.current.clearLayers();
    }

    if (selectedSalon) {
      const routeCoords = drivingRoutePoints.length
        ? drivingRoutePoints
        : buildFallbackRoadLikeRoute(liveUserPosition, selectedSalon);

      L.polyline(routeCoords, {
        color: '#0f172a',
        weight: 12,
        opacity: 0.5,
        lineJoin: 'round',
        lineCap: 'round'
      }).addTo(routeLayerGroupRef.current);

      L.polyline(routeCoords, {
        color: '#D4AF37',
        weight: 7,
        opacity: 0.95,
        lineJoin: 'round',
        lineCap: 'round'
      }).addTo(routeLayerGroupRef.current);

      L.polyline(routeCoords, {
        color: '#ffffff',
        weight: 2,
        opacity: 0.55,
        dashArray: '12, 16',
        lineJoin: 'round',
        lineCap: 'round'
      }).addTo(routeLayerGroupRef.current);

      currentMapInstance.fitBounds(L.latLngBounds(routeCoords), {
        padding: [50, 50],
        maxZoom: 15,
        animate: true,
        duration: 0.8
      });
    }
  }, [parsedFilteredSalons, isLeafletReady, selectedSalon, activeWindowTab, drivingRoutePoints, liveUserPosition]);

  return (
    <div style={{ background: '#05070f', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '12px', boxSizing: 'border-box' }}>
      <style>{`
        @keyframes markerPulseEffect {
          0% { transform: scale(0.35); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        @keyframes fadeInUpWindow {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatEffect {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes shimmerRoad {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .custom-scroller-node::-webkit-scrollbar { display: none; }
        .custom-scroller-node { -ms-overflow-style: none; scrollbar-width: none; }

        .layout-master-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 992px) {
          .layout-master-grid {
            grid-template-columns: 1.08fr 0.92fr;
          }
        }

        .horizontal-scroller-track {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        @media (min-width: 992px) {
          .horizontal-scroller-track {
            grid-template-columns: 1fr 1fr;
            display: grid;
            overflow-x: visible;
          }
        }

        .luxury-card-node {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .luxury-card-node:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 24px rgba(212,175,55,0.12);
          border-color: rgba(212,175,55,0.4) !important;
        }

        .luxury-button-glow {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .luxury-button-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212,175,55,0.45);
          filter: brightness(1.1);
        }

        .animated-desk-container {
          animation: fadeInUpWindow 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .floating-icon-node {
          animation: floatEffect 3s ease-in-out infinite;
        }

        .live-user-pin {
          width: 40px;
          height: 40px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .live-user-pulse {
          position: absolute;
          width: 38px;
          height: 38px;
          background: rgba(34, 197, 94, 0.26);
          border-radius: 999px;
          animation: markerPulseEffect 1.45s infinite ease-out;
        }

        .live-user-dot {
          width: 15px;
          height: 15px;
          background: #22c55e;
          border: 3px solid #ffffff;
          border-radius: 999px;
          box-shadow: 0 0 18px rgba(34,197,94,0.85);
          z-index: 2;
        }

        .salon-map-pin {
          width: 48px;
          height: 48px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .salon-map-pin.active {
          transform: scale(1.22);
        }

        .pin-ring {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: rgba(212,175,55,0.2);
          animation: markerPulseEffect 1.6s infinite ease-out;
        }

        .pin-body {
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e293b, #020617);
          border: 2px solid #D4AF37;
          box-shadow: 0 8px 20px rgba(0,0,0,0.4);
          color: #D4AF37;
        }

        .salon-map-pin.active .pin-body {
          background: linear-gradient(135deg, #FFE5A3, #D4AF37);
          color: #05070f;
          box-shadow: 0 10px 28px rgba(212,175,55,0.6);
        }

        .pin-body span {
          transform: rotate(45deg);
          font-size: 16px;
          font-weight: 900;
        }

        .route-status-strip {
          background: linear-gradient(90deg, rgba(212,175,55,0.08), rgba(34,197,94,0.13), rgba(212,175,55,0.08));
          background-size: 200% 100%;
          animation: shimmerRoad 2.2s linear infinite;
        }

        input::placeholder,
        textarea::placeholder {
          color: #64748b;
        }
      `}</style>

      {notificationBanner && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#0b111e',
          border: '1px solid #D4AF37',
          borderRadius: '10px',
          padding: '12px 24px',
          zIndex: 10005,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.8)',
          width: 'calc(100% - 24px)',
          maxWidth: '420px',
          animation: 'fadeInUpWindow 0.3s ease'
        }}>
          <BadgeCheck size={20} style={{ color: '#22c55e', flexShrink: 0 }} />
          <span style={{ fontSize: '13px', color: '#f3f4f6', fontWeight: 700 }}>{notificationBanner}</span>
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '16px',
        background: '#0b0f19',
        padding: '12px 16px',
        borderRadius: '16px',
        border: '1px solid rgba(212,175,55,0.15)'
      }}>
        <div>
          <h2 style={{ margin: '0 0 3px 0', fontSize: '18px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px', color: '#FFE5A3' }}>
            <Compass size={22} className="floating-icon-node" style={{ color: '#D4AF37' }} /> COIMBATORE SALON HUB
          </h2>
          <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>
            Current location to salon route with Google Maps direction.
          </p>
        </div>

        <div style={{ display: 'flex', width: '100%', sm: 'auto', background: '#02040a', padding: '4px', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.1)' }}>
          <button
            onClick={() => { setActiveWindowTab('mapView'); purgeActiveStateMatrix(); }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              background: activeWindowTab === 'mapView' ? 'linear-gradient(135deg, #AA771C, #D4AF37)' : 'transparent',
              color: activeWindowTab === 'mapView' ? '#05070f' : '#94a3b8'
            }}
          >
            Map View
          </button>

          <button
            onClick={() => setActiveWindowTab('historyRegistry')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              background: activeWindowTab === 'historyRegistry' ? 'linear-gradient(135deg, #AA771C, #D4AF37)' : 'transparent',
              color: activeWindowTab === 'historyRegistry' ? '#05070f' : '#94a3b8'
            }}
          >
            History ({persistentHistoryRegistry.length})
          </button>
        </div>
      </div>

      {activeWindowTab === 'historyRegistry' ? (
        <div className="animated-desk-container" style={{ background: '#0b0f19', padding: '16px', borderRadius: '16px', border: '1px solid rgba(212,175,55,0.15)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#D4AF37', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} /> Booking History
          </h3>

          {persistentHistoryRegistry.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>No bookings found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {persistentHistoryRegistry.map((logUnit, idx) => (
                <div key={`${logUnit.id}-${idx}`} style={{ background: '#05070f', padding: '14px', borderRadius: '14px', border: '1px solid rgba(212,175,55,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 800, color: '#FFE5A3' }}>{logUnit.salon}</h4>
                    <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span>{logUnit.date} · {logUnit.time}</span>
                      <span>{logUnit.mode} · {logUnit.gateway}</span>
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '15px', fontWeight: 900, color: '#D4AF37' }}>₹{logUnit.price}</span>
                    <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 800 }}>{logUnit.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="layout-master-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ position: 'relative', height: '320px', background: '#0b0f19', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.15)' }}>
              <div ref={domMapElementRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

              {selectedSalon && (
                <div className="route-status-strip" style={{
                  position: 'absolute',
                  left: '10px',
                  right: '10px',
                  bottom: '10px',
                  zIndex: 500,
                  border: '1px solid rgba(212,175,55,0.28)',
                  borderRadius: '12px',
                  padding: '8px 10px',
                  backdropFilter: 'blur(12px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '6px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FFE5A3', fontSize: '11px', fontWeight: 900 }}>
                    <Route size={14} /> Route to {selectedSalon.name}
                  </span>
                  <span style={{ color: '#22c55e', fontSize: '11px', fontWeight: 900 }}>
                    {drivingRouteInfo?.km || selectedDistance} km · {drivingRouteInfo?.mins || calculateDurationValue(selectedDistance)} mins
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0b0f19', padding: '10px 14px', borderRadius: '14px', border: '1px solid rgba(212,175,55,0.1)' }}>
              <Search size={16} style={{ color: '#D4AF37' }} />
              <input
                type="text"
                placeholder="Search salon name or area..."
                value={queryKeyword}
                onChange={(e) => setQueryKeyword(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '13px' }}
              />
            </div>

            <div className="horizontal-scroller-track custom-scroller-node">
              {parsedFilteredSalons.map((salonItem) => {
                const isItemChosen = selectedSalon?.id === salonItem.id;
                const dist = computeHaversineDistance(liveUserPosition.lat, liveUserPosition.lng, salonItem.lat, salonItem.lng);

                return (
                  <div
                    key={salonItem.id}
                    onClick={() => executeSalonNodeSelection(salonItem)}
                    className="luxury-card-node"
                    style={{
                      flexShrink: 0,
                      width: '200px',
                      background: isItemChosen ? 'rgba(212,175,55,0.06)' : '#0b0f19',
                      borderRadius: '14px',
                      padding: '10px',
                      border: isItemChosen ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ width: '100%', height: '90px', borderRadius: '10px', overflow: 'hidden', marginBottom: '6px' }}>
                      <img src={salonItem.image} alt={salonItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <h4 style={{ margin: '0 0 2px 0', fontSize: '12px', fontWeight: 800, color: '#FFE5A3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {salonItem.name}
                    </h4>

                    <p style={{ margin: '0 0 6px 0', fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={11} /> {salonItem.area}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px', fontSize: '10px' }}>
                      <span style={{ color: '#FFE5A3', fontWeight: 800 }}>{dist} km</span>
                      <span style={{ color: '#22c55e', fontWeight: 800 }}>{calculateDurationValue(dist)} m</span>
                      <span style={{ color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 900 }}>
                        <Star size={11} fill="#D4AF37" /> {salonItem.rating}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {selectedSalon ? (
              <div className="animated-desk-container" style={{ background: '#0b0f19', padding: '16px', borderRadius: '16px', border: '1px solid rgba(212,175,55,0.15)', boxSizing: 'border-box' }}>
                {!isBookingDeskOpen ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 900, color: '#FFE5A3' }}>{selectedSalon.name}</h3>
                        <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <MapPin size={12} /> {selectedSalon.area}
                        </p>
                      </div>

                      <button
                        onClick={purgeActiveStateMatrix}
                        className="luxury-button-glow"
                        style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: '#D4AF37', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div style={{ width: '100%', height: '130px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                      <img src={selectedSalon.image} alt={selectedSalon.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', right: '10px', top: '10px', background: 'rgba(5,7,15,0.84)', border: '1px solid rgba(212,175,55,0.35)', color: '#FFE5A3', borderRadius: '9px', padding: '4px 6px', fontSize: '10px', fontWeight: 900 }}>
                        {selectedSalon.timing}
                      </div>
                    </div>

                    <div style={{ height: '160px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.28)', position: 'relative', background: '#05070f' }}>
                      <iframe
                        title={`${selectedSalon.name} google map`}
                        src={buildGoogleLiveMapEmbedUrl(selectedSalon)}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />

                      <a
                        href={buildGooglePlaceUrl(selectedSalon)}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'flex-start',
                          padding: '8px',
                          textDecoration: 'none',
                          pointerEvents: 'none'
                        }}
                      >
                        <span style={{
                          pointerEvents: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'rgba(5,7,15,0.92)',
                          border: '1px solid rgba(212,175,55,0.35)',
                          borderRadius: '10px',
                          padding: '6px 8px',
                          backdropFilter: 'blur(8px)'
                        }}>
                          <img src={selectedSalon.image} alt={selectedSalon.name} style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} />
                          <span>
                            <span style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#FFE5A3' }}>{selectedSalon.name}</span>
                            <span style={{ display: 'block', fontSize: '9px', color: '#94a3b8' }}>Open exact salon in Google Maps</span>
                          </span>
                        </span>
                      </a>
                    </div>

                    <div style={{ background: '#05070f', padding: '12px', borderRadius: '10px', border: '1px solid #AA771C' }}>
                      <span style={{ fontSize: '10px', color: '#D4AF37', display: 'block', textTransform: 'uppercase', fontWeight: 900 }}>Live Route Details</span>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', fontSize: '13px', fontWeight: 800, marginTop: '4px' }}>
                        <span style={{ color: '#FFE5A3' }}>Distance: {drivingRouteInfo?.km || selectedDistance} km</span>
                        <span style={{ color: '#22c55e' }}>ETA: {drivingRouteInfo?.mins || calculateDurationValue(selectedDistance)} mins</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex' }}>
                      <button
                        onClick={() => setIsBookingDeskOpen(true)}
                        className="luxury-button-glow"
                        style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #AA771C, #D4AF37)', color: '#05070f', fontWeight: 900, fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase' }}
                      >
                        Booking
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {finalInvoiceReceipt ? (
                      <div style={{ textAlign: 'center', padding: '20px 0', animation: 'fadeInUpWindow 0.4s' }}>
                        <BadgeCheck size={48} className="floating-icon-node" style={{ color: '#22c55e', marginBottom: '10px' }} />
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 900, color: '#FFE5A3' }}>RESERVATION CONFIRMED</h4>
                        <p style={{ margin: '0 0 6px 0', fontSize: '11px', color: '#94a3b8' }}>Booking ID: {finalInvoiceReceipt.id}</p>
                        <p style={{ margin: '0 0 14px 0', fontSize: '11px', color: '#94a3b8' }}>
                          {finalInvoiceReceipt.gateway} · {finalInvoiceReceipt.contactMode}
                        </p>

                        <button
                          onClick={purgeActiveStateMatrix}
                          className="luxury-button-glow"
                          style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #AA771C, #D4AF37)', color: '#05070f', fontWeight: 800, cursor: 'pointer' }}
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', fontWeight: 900, color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Sparkles size={14} /> Booking Workspace
                          </span>

                          <button onClick={() => setIsBookingDeskOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '11px' }}>
                            Cancel
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <UserCheck size={14} style={{ position: 'absolute', left: '10px', color: '#AA771C' }} />
                            <input type="text" placeholder="Full Name" value={inputCustomerName} onChange={(e) => setInputCustomerName(e.target.value)} style={{ width: '100%', padding: '10px 10px 10px 32px', borderRadius: '8px', background: '#05070f', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
                          </div>

                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <Smartphone size={14} style={{ position: 'absolute', left: '10px', color: '#AA771C' }} />
                            <input type="tel" placeholder="Mobile" value={inputCustomerPhone} onChange={(e) => setInputCustomerPhone(e.target.value)} style={{ width: '100%', padding: '10px 10px 10px 32px', borderRadius: '8px', background: '#05070f', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                          <div>
                            <span style={{ fontSize: '11px', color: '#FFE5A3', display: 'block', marginBottom: '4px' }}>Booking Type:</span>
                            <select value={inputServiceMode} onChange={(e) => setInputServiceMode(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#05070f', border: '1px solid rgba(212,175,55,0.15)', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>
                              <option value="Salon Visit">Salon Visit (+₹40)</option>
                              <option value="Home Service">Home Service (+₹200 + route)</option>
                            </select>
                          </div>

                          <div>
                            <span style={{ fontSize: '11px', color: '#FFE5A3', display: 'block', marginBottom: '4px' }}>Select Stylist:</span>
                            <select value={inputStylistSelection} onChange={(e) => setInputStylistSelection(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#05070f', border: '1px solid rgba(212,175,55,0.15)', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>
                              {premiumStylists.map((sty) => <option key={sty.id} value={sty.id}>{sty.name} - {sty.rank}</option>)}
                            </select>
                          </div>
                        </div>

                        <div>
                          <span style={{ fontSize: '11px', color: '#FFE5A3', display: 'block', marginBottom: '4px' }}>
                            <CreditCard size={12} /> Payment Method:
                          </span>
                          <select value={inputPaymentGateway} onChange={(e) => setInputPaymentGateway(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#05070f', border: '1px solid rgba(212,175,55,0.25)', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>
                            <option value="Pay At Salon Counter">Pay At Salon Counter</option>
                            <option value="UPI - Google Pay">UPI - Google Pay</option>
                            <option value="UPI - PhonePe">UPI - PhonePe</option>
                            <option value="UPI - Paytm">UPI - Paytm</option>
                            <option value="Credit / Debit Card">Credit / Debit Card</option>
                            <option value="NetBanking">NetBanking</option>
                            <option value="Wallet">Wallet</option>
                          </select>
                        </div>

                        <div>
                          <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                            <ShoppingBag size={12} /> Select Treatments:
                          </span>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '110px', overflowY: 'auto' }} className="custom-scroller-node">
                            {coreServices.map((serviceNode) => {
                              const isChecked = chosenServiceArray.includes(serviceNode.id);

                              return (
                                <div
                                  key={serviceNode.id}
                                  onClick={() => {
                                    if (isChecked) {
                                      if (chosenServiceArray.length > 1) {
                                        setChosenServiceArray(chosenServiceArray.filter((t) => t !== serviceNode.id));
                                      }
                                    } else {
                                      setChosenServiceArray([...chosenServiceArray, serviceNode.id]);
                                    }
                                  }}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '8px',
                                    padding: '8px 10px',
                                    borderRadius: '6px',
                                    background: isChecked ? 'rgba(212,175,55,0.12)' : '#05070f',
                                    border: isChecked ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.04)',
                                    cursor: 'pointer',
                                    fontSize: '11px',
                                    transition: '0.2s'
                                  }}
                                >
                                  <span style={{ color: isChecked ? '#FFE5A3' : '#fff' }}>{serviceNode.name}</span>
                                  <span style={{ color: '#D4AF37', fontWeight: 800 }}>₹{serviceNode.price}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <Calendar size={12} style={{ position: 'absolute', left: '10px', color: '#AA771C', zIndex: 5 }} />
                            <input type="date" value={inputTargetDate} onChange={(e) => setInputTargetDate(e.target.value)} style={{ width: '100%', padding: '8px 8px 8px 28px', borderRadius: '8px', background: '#05070f', border: '1px solid rgba(212,175,55,0.15)', color: '#fff', fontSize: '11px', boxSizing: 'border-box' }} />
                          </div>

                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <Clock size={12} style={{ position: 'absolute', left: '10px', color: '#AA771C', zIndex: 5 }} />
                            <select value={inputTargetSlot} onChange={(e) => setInputTargetSlot(e.target.value)} style={{ width: '100%', padding: '8px 8px 8px 28px', borderRadius: '8px', background: '#05070f', border: '1px solid rgba(212,175,55,0.15)', color: '#fff', fontSize: '11px', cursor: 'pointer' }}>
                              {dynamicTimeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                            </select>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <span style={{ fontSize: '11px', color: '#FFE5A3', display: 'block', marginBottom: '4px' }}>
                              <MessageCircle size={12} /> Updates:
                            </span>
                            <select value={inputContactMode} onChange={(e) => setInputContactMode(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#05070f', border: '1px solid rgba(212,175,55,0.15)', color: '#fff', fontSize: '12px' }}>
                              <option value="WhatsApp Updates">WhatsApp Updates</option>
                              <option value="SMS Updates">SMS Updates</option>
                              <option value="Call Confirmation">Call Confirmation</option>
                            </select>
                          </div>

                          <div>
                            <span style={{ fontSize: '11px', color: '#FFE5A3', display: 'block', marginBottom: '4px' }}>
                              <Scissors size={12} /> Add-on:
                            </span>
                            <select style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#05070f', border: '1px solid rgba(212,175,55,0.15)', color: '#fff', fontSize: '12px' }}>
                              <option>Free Hair Wash</option>
                              <option>Premium Coffee</option>
                              <option>Skin Patch Test</option>
                              <option>Quick Consultation</option>
                            </select>
                          </div>
                        </div>

                        <textarea
                          placeholder="Any notes for stylist?"
                          value={inputBookingNotes}
                          onChange={(e) => setInputBookingNotes(e.target.value)}
                          style={{ width: '100%', minHeight: '62px', resize: 'vertical', padding: '10px', borderRadius: '8px', background: '#05070f', border: '1px solid rgba(212,175,55,0.15)', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '8px', fontSize: '11px', color: '#94a3b8' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Services Total:</span><span>₹{calculateSubtotalSum()}</span></div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Service Fee:</span><span>+{inputServiceMode === 'Home Service' ? '₹200' : '₹40'}</span></div>
                          {inputServiceMode === 'Home Service' && (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Route Fee:</span><span>+₹{Math.round(selectedDistance * 12)}</span></div>
                          )}
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 900, color: '#D4AF37', marginTop: '2px', paddingTop: '4px', borderTop: '1px dashed rgba(212,175,55,0.2)' }}>
                            <span>Total Amount:</span>
                            <span>₹{calculateSubtotalSum() + (inputServiceMode === 'Home Service' ? 200 + Math.round(selectedDistance * 12) : 40)}</span>
                          </div>
                        </div>

                        <button
                          onClick={executeBookingFormAction}
                          disabled={isFormSubmitting}
                          className="luxury-button-glow"
                          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #AA771C, #D4AF37)', color: '#05070f', fontWeight: 900, fontSize: '14px', cursor: isFormSubmitting ? 'not-allowed' : 'pointer', textTransform: 'uppercase', opacity: isFormSubmitting ? 0.75 : 1 }}
                        >
                          {isFormSubmitting ? 'Processing...' : 'Confirm Booking'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ background: '#0b0f19', padding: '24px', borderRadius: '16px', border: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '200px', color: '#94a3b8', fontSize: '12px', textAlign: 'center' }}>
                Select a salon from the map or cards. Direction button opens Google Maps with origin as My Location and destination as salon name.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
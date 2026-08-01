"use client";

import {
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  CircleUserRound,
  Clock3,
  CreditCard,
  Dumbbell,
  Heart,
  Home,
  Landmark,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  TicketCheck,
  UserRound,
  WalletCards,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type Screen =
  | "login"
  | "home"
  | "explore"
  | "studio"
  | "schedule"
  | "session"
  | "checkout"
  | "payment"
  | "success"
  | "bookings"
  | "account";

type Studio = {
  id: string;
  placeId?: string;
  name: string;
  rating: string;
  reviewCount?: number;
  area: string;
  distance: string;
  tags: string;
  price: string;
  address: string;
  hours: string;
  phone: string;
  facilities: string[];
  image: string;
  mapQuery: string;
  website?: string;
  googleMapsUri?: string;
  lat?: number;
  lng?: number;
  source?: "sample" | "google";
};

type Session = {
  id: string;
  studioId: string;
  title: string;
  studio: string;
  area: string;
  time: string;
  date: string;
  price: number;
  seats: number;
  level: string;
  trainer: string;
  image: string;
  duration: string;
  category: string;
  description: string;
};

type BookingStatus = "confirmed" | "cancelled";

type BookingRecord = {
  id: string;
  sessionId: string;
  status: BookingStatus;
  createdAt: string;
};

type AuraActions = {
  availableStudios: Studio[];
  availableSessions: Session[];
  selectedStudio: Studio;
  selectedSession: Session;
  favoriteStudioIds: string[];
  booking: BookingRecord | null;
  paymentMethod: string;
  placesStatus: "idle" | "needs-key" | "loading" | "ready" | "error";
  placesError: string | null;
  placesQuery: string;
  googleMapsKey: string;
  placesLastUpdated: string | null;
  selectStudio: (studioId: string) => void;
  selectSession: (sessionId: string) => void;
  startBooking: (sessionId?: string) => void;
  toggleFavorite: (studioId: string) => void;
  openMaps: (studio: Studio, mode?: "search" | "directions") => void;
  refreshPlaces: () => void;
  setPlacesQuery: (value: string) => void;
  saveGoogleMapsKey: (value: string) => void;
  addToCalendar: () => void;
  cancelBooking: () => void;
  notify: (message: string) => void;
  setPaymentMethod: (value: string) => void;
};

type GoogleMapsWindow = Window & {
  google?: GoogleNamespace;
  __auraGoogleMapsLoader?: Promise<void>;
};

type GoogleNamespace = {
  maps: {
    importLibrary: (libraryName: string) => Promise<Record<string, unknown>>;
  };
};

type GooglePlacePhoto = {
  getURI?: (options: { maxWidth: number }) => string;
  getUrl?: (options: { maxWidth: number }) => string;
};

type GooglePlace = {
  id?: string;
  displayName?: string | { text?: string };
  formattedAddress?: string;
  location?: {
    lat?: number | (() => number);
    lng?: number | (() => number);
  };
  rating?: number;
  userRatingCount?: number;
  googleMapsURI?: string;
  websiteURI?: string;
  internationalPhoneNumber?: string;
  regularOpeningHours?: {
    weekdayDescriptions?: string[];
  };
  photos?: GooglePlacePhoto[];
};

type GooglePlaceConstructor = {
  searchByText: (request: Record<string, unknown>) => Promise<{ places?: GooglePlace[] }>;
};

const RIYADH_CENTER = { lat: 24.7136, lng: 46.6753 };
const RIYADH_SEARCH_TERMS = [
  "Pilates studio Riyadh",
  "Yoga studio Riyadh",
  "Reformer Pilates Riyadh",
  "Hot Yoga Riyadh",
  "مركز بيلاتس الرياض",
  "مركز يوغا الرياض",
];

const sampleStudioImage =
  "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1000&q=80";

const configuredGoogleMapsKey =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
    : "";

function getInitialGoogleMapsKey() {
  if (typeof window === "undefined") {
    return configuredGoogleMapsKey;
  }
  return window.localStorage.getItem("auraGoogleMapsKey") ?? configuredGoogleMapsKey;
}

const studios: Studio[] = [
  {
    id: "nova",
    name: "NOVA Movement",
    rating: "4.8",
    area: "العليا",
    distance: "2.4 كم",
    tags: "بيلاتس، يوغا، جلسات خاصة",
    price: "يبدأ من 80 ر.س",
    address: "حي العليا، الرياض",
    hours: "7:00 ص - 10:00 م",
    phone: "+966 5X XXX 018",
    facilities: ["مواقف", "غرف تبديل", "مناشف"],
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    mapQuery: "NOVA Movement Pilates Yoga Al Olaya Riyadh",
  },
  {
    id: "flow",
    name: "Flow House",
    rating: "4.7",
    area: "الملقا",
    distance: "4.1 كم",
    tags: "يوغا، Vinyasa، جلسات جماعية",
    price: "يبدأ من 90 ر.س",
    address: "حي الملقا، الرياض",
    hours: "8:00 ص - 11:00 م",
    phone: "+966 5X XXX 442",
    facilities: ["جلسات جماعية", "خزائن", "قهوة"],
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    mapQuery: "Flow House Yoga Al Malqa Riyadh",
  },
  {
    id: "balance",
    name: "Balance Studio",
    rating: "4.6",
    area: "النخيل",
    distance: "5.8 كم",
    tags: "Mat Pilates، بيلاتس للمبتدئين",
    price: "يبدأ من 75 ر.س",
    address: "حي النخيل، الرياض",
    hours: "6:00 ص - 9:30 م",
    phone: "+966 5X XXX 730",
    facilities: ["مناسب للمبتدئين", "معدات بيلاتس", "مواقف"],
    image:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1200&q=80",
    mapQuery: "Balance Studio Pilates Al Nakheel Riyadh",
  },
];

const sessions: Session[] = [
  {
    id: "nova-reformer",
    studioId: "nova",
    title: "Pilates Reformer",
    studio: "NOVA Movement",
    area: "العليا",
    time: "7:00 مساء",
    date: "اليوم",
    price: 120,
    seats: 4,
    level: "متوسط",
    trainer: "ليان",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
    duration: "50 دقيقة",
    category: "بيلاتس",
    description:
      "جلسة Reformer تركّز على القوة، الاتزان، والتنفس بإيقاع مريح وعدد مقاعد محدود.",
  },
  {
    id: "flow-vinyasa",
    studioId: "flow",
    title: "Vinyasa Yoga",
    studio: "Flow House",
    area: "الملقا",
    time: "8:30 مساء",
    date: "اليوم",
    price: 95,
    seats: 7,
    level: "مناسب للجميع",
    trainer: "رامي",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
    duration: "60 دقيقة",
    category: "يوغا",
    description:
      "تدفق يوغا متوسط السرعة يوازن بين المرونة والتنفس والحركة المستمرة.",
  },
  {
    id: "balance-mat",
    studioId: "balance",
    title: "Mat Pilates",
    studio: "Balance Studio",
    area: "النخيل",
    time: "6:15 صباحا",
    date: "غدا",
    price: 80,
    seats: 5,
    level: "مبتدئ",
    trainer: "سارة",
    image:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1000&q=80",
    duration: "45 دقيقة",
    category: "بيلاتس",
    description:
      "جلسة Mat Pilates هادئة للمبتدئين تركّز على الثبات، العضلات العميقة، والتحكم.",
  },
  {
    id: "nova-core",
    studioId: "nova",
    title: "Core Strength",
    studio: "NOVA Movement",
    area: "العليا",
    time: "5:45 مساء",
    date: "غدا",
    price: 105,
    seats: 2,
    level: "متوسط",
    trainer: "نواف",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1000&q=80",
    duration: "45 دقيقة",
    category: "بيلاتس",
    description:
      "تمارين مركزة للجزء الأوسط من الجسم مع انتقالات بسيطة ومناسبة لمن يبحث عن قوة أعلى.",
  },
  {
    id: "flow-slow",
    studioId: "flow",
    title: "Slow Flow Yoga",
    studio: "Flow House",
    area: "الملقا",
    time: "9:00 مساء",
    date: "غدا",
    price: 90,
    seats: 8,
    level: "مناسب للجميع",
    trainer: "دانا",
    image:
      "https://images.unsplash.com/photo-1540206276207-3af25c08abc4?auto=format&fit=crop&w=1000&q=80",
    duration: "55 دقيقة",
    category: "يوغا",
    description:
      "جلسة يوغا مسائية بوتيرة أبطأ تساعد على الاسترخاء وفك الشد العضلي.",
  },
];

function getStudioByIdFrom(studioId: string, studioList: Studio[]) {
  return studioList.find((studio) => studio.id === studioId) ?? studioList[0] ?? studios[0];
}

function getSessionByIdFrom(sessionId: string, sessionList: Session[]) {
  return sessionList.find((session) => session.id === sessionId) ?? sessionList[0] ?? sessions[0];
}

function buildDefaultSession(studio: Studio): Session {
  const studioType = studio.tags.includes("يوغا") || studio.name.toLowerCase().includes("yoga")
    ? "يوغا"
    : "بيلاتس";

  return {
    id: `${studio.id}-drop-in`,
    studioId: studio.id,
    title: studioType === "يوغا" ? "Yoga Drop-in" : "Pilates Drop-in",
    studio: studio.name,
    area: studio.area,
    time: "7:00 مساء",
    date: "اليوم",
    price: 120,
    seats: 6,
    level: "مناسب للجميع",
    trainer: "فريق المركز",
    image: studio.image,
    duration: "50 دقيقة",
    category: studioType,
    description:
      "موعد تجريبي قابل للحجز داخل البروتوتايب. بيانات الجلسات والأسعار النهائية يضيفها المركز بعد اعتماده في Aura.",
  };
}

function buildAvailableSessions(studioList: Studio[]) {
  const staticSessions = sessions.filter((session) =>
    studioList.some((studio) => studio.id === session.studioId),
  );
  const sessionStudioIds = new Set(staticSessions.map((session) => session.studioId));
  const generatedSessions = studioList
    .filter((studio) => !sessionStudioIds.has(studio.id))
    .map(buildDefaultSession);

  return [...staticSessions, ...generatedSessions];
}

function loadGoogleMaps(apiKey: string): Promise<GoogleNamespace> {
  const browserWindow = window as GoogleMapsWindow;

  if (browserWindow.google?.maps?.importLibrary) {
    return Promise.resolve(browserWindow.google);
  }

  if (browserWindow.__auraGoogleMapsLoader) {
    return browserWindow.__auraGoogleMapsLoader.then(() => {
      if (!browserWindow.google) {
        throw new Error("تعذر تحميل Google Maps");
      }
      return browserWindow.google;
    });
  }

  browserWindow.__auraGoogleMapsLoader = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    const params = new URLSearchParams({
      key: apiKey,
      v: "weekly",
      libraries: "places,marker",
      language: "ar",
      region: "SA",
    });

    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("تعذر تحميل Google Maps"));
    document.head.appendChild(script);
  });

  return browserWindow.__auraGoogleMapsLoader.then(() => {
    if (!browserWindow.google) {
      throw new Error("تعذر تحميل Google Maps");
    }
    return browserWindow.google;
  });
}

function normalizePlaceName(value: unknown) {
  if (typeof value === "string") {
    return value;
  }
  if (value && typeof value === "object" && "text" in value) {
    return String((value as { text?: string }).text ?? "");
  }
  return "مركز حركة";
}

function getPlacePhoto(place: GooglePlace) {
  const photo = place.photos?.[0];
  if (!photo) {
    return sampleStudioImage;
  }
  if (typeof photo.getURI === "function") {
    return photo.getURI({ maxWidth: 1200 });
  }
  if (typeof photo.getUrl === "function") {
    return photo.getUrl({ maxWidth: 1200 });
  }
  return sampleStudioImage;
}

function getPlaceLatLng(location: GooglePlace["location"]) {
  if (!location) {
    return {};
  }

  const lat = typeof location.lat === "function" ? location.lat() : location.lat;
  const lng = typeof location.lng === "function" ? location.lng() : location.lng;
  return {
    lat: typeof lat === "number" ? lat : undefined,
    lng: typeof lng === "number" ? lng : undefined,
  };
}

function estimateRiyadhArea(address: string) {
  const knownAreas = [
    "العليا",
    "الملقا",
    "النخيل",
    "حطين",
    "الياسمين",
    "النرجس",
    "الربيع",
    "الصحافة",
    "الروضة",
    "العارض",
  ];

  return knownAreas.find((area) => address.includes(area)) ?? "الرياض";
}

function classifyStudio(placeName: string, address: string) {
  const value = `${placeName} ${address}`.toLowerCase();
  const tags = [];

  if (value.includes("pilates") || value.includes("بيلاتس")) {
    tags.push("بيلاتس");
  }
  if (value.includes("yoga") || value.includes("يوغا")) {
    tags.push("يوغا");
  }
  if (value.includes("reformer")) {
    tags.push("Reformer");
  }

  return tags.length ? tags.join("، ") : "بيلاتس، يوغا";
}

function mapGooglePlaceToStudio(place: GooglePlace): Studio {
  const name = normalizePlaceName(place.displayName);
  const address = place.formattedAddress ?? "الرياض";
  const { lat, lng } = getPlaceLatLng(place.location);
  const tags = classifyStudio(name, address);
  const hours = place.regularOpeningHours?.weekdayDescriptions?.[0] ?? "أوقات العمل عبر Google";

  return {
    id: `google-${place.id}`,
    placeId: place.id,
    name,
    rating: place.rating ? String(place.rating) : "جديد",
    reviewCount: place.userRatingCount,
    area: estimateRiyadhArea(address),
    distance: "ضمن الرياض",
    tags,
    price: "حسب المركز",
    address,
    hours,
    phone: place.internationalPhoneNumber ?? "غير متوفر",
    facilities: ["بيانات Google", "اتجاهات", "اعتماد لاحق"],
    image: getPlacePhoto(place),
    mapQuery: address ? `${name} ${address}` : name,
    website: place.websiteURI,
    googleMapsUri: place.googleMapsURI,
    lat,
    lng,
    source: "google",
  };
}

async function fetchRiyadhStudiosFromGoogle(apiKey: string, query: string) {
  const google = await loadGoogleMaps(apiKey);
  const { Place } = (await google.maps.importLibrary("places")) as {
    Place: GooglePlaceConstructor;
  };
  const terms = query.trim() ? [query.trim()] : RIYADH_SEARCH_TERMS;
  const results = new Map<string, Studio>();

  for (const textQuery of terms) {
    const { places } = await Place.searchByText({
      textQuery,
      fields: [
        "id",
        "displayName",
        "formattedAddress",
        "location",
        "rating",
        "userRatingCount",
        "googleMapsURI",
        "websiteURI",
        "internationalPhoneNumber",
        "regularOpeningHours",
        "photos",
        "businessStatus",
      ],
      locationBias: {
        center: RIYADH_CENTER,
        radius: 45000,
      },
      language: "ar",
      maxResultCount: 20,
      minRating: 1,
      region: "sa",
    });

    for (const place of places ?? []) {
      if (!place.id || results.has(place.id)) {
        continue;
      }
      results.set(place.id, mapGooglePlaceToStudio(place));
    }
  }

  return Array.from(results.values()).sort((first, second) => {
    const secondRating = Number(second.rating) || 0;
    const firstRating = Number(first.rating) || 0;
    return secondRating - firstRating;
  });
}

function buildMapsUrl(studio: Studio, mode: "search" | "directions" = "search") {
  const encodedQuery = encodeURIComponent(studio.mapQuery);
  if (mode === "directions") {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
}

function buildCalendarUrl(session: Session, studio: Studio) {
  const text = encodeURIComponent(`${session.title} - Aura`);
  const location = encodeURIComponent(studio.address);
  const details = encodeURIComponent(
    `${studio.name} | ${session.trainer} | ${session.duration}`,
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&location=${location}&details=${details}`;
}

export default function AuraPrototype() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activity, setActivity] = useState("الكل");
  const [accepted, setAccepted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [bookingTab, setBookingTab] = useState("القادمة");
  const [googleStudios, setGoogleStudios] = useState<Studio[]>([]);
  const [googleMapsKey, setGoogleMapsKey] = useState(getInitialGoogleMapsKey);
  const [placesStatus, setPlacesStatus] = useState<AuraActions["placesStatus"]>(
    () => (getInitialGoogleMapsKey() ? "idle" : "needs-key"),
  );
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [placesQuery, setPlacesQuery] = useState("");
  const [placesLastUpdated, setPlacesLastUpdated] = useState<string | null>(null);
  const [selectedStudioId, setSelectedStudioId] = useState("nova");
  const [selectedSessionId, setSelectedSessionId] = useState("nova-reformer");
  const [favoriteStudioIds, setFavoriteStudioIds] = useState<string[]>(["nova"]);
  const [paymentMethod, setPaymentMethod] = useState("Apple Pay");
  const [booking, setBooking] = useState<BookingRecord | null>({
    id: "AUR-2481",
    sessionId: "nova-reformer",
    status: "confirmed",
    createdAt: "2026-08-01T19:00:00+03:00",
  });
  const [toast, setToast] = useState<string | null>(null);
  const availableStudios = googleStudios.length ? googleStudios : studios;
  const availableSessions = buildAvailableSessions(availableStudios);
  const selectedStudio = getStudioByIdFrom(selectedStudioId, availableStudios);
  const selectedSession = getSessionByIdFrom(selectedSessionId, availableSessions);

  useEffect(() => {
    if (!googleMapsKey) {
      return;
    }
    let isCancelled = false;

    void (async () => {
      setPlacesStatus("loading");
      setPlacesError(null);
      try {
        const nextStudios = await fetchRiyadhStudiosFromGoogle(googleMapsKey, "");
        if (isCancelled || !nextStudios.length) {
          return;
        }

        const nextSessions = buildAvailableSessions(nextStudios);
        setGoogleStudios(nextStudios);
        setSelectedStudioId(nextStudios[0].id);
        setSelectedSessionId(nextSessions[0].id);
        setPlacesLastUpdated(new Intl.DateTimeFormat("ar-SA", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()));
        setPlacesStatus("ready");
      } catch (error) {
        if (!isCancelled) {
          setPlacesStatus("error");
          setPlacesError(
            error instanceof Error
              ? error.message
              : "تعذر الاتصال بـ Google Places",
          );
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [googleMapsKey]);

  function go(nextScreen: Screen) {
    setProcessing(false);
    setScreen(nextScreen);
  }

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 1800);
  }

  function selectStudio(studioId: string) {
    const nextSession =
      availableSessions.find((session) => session.studioId === studioId) ??
      buildDefaultSession(getStudioByIdFrom(studioId, availableStudios));
    setSelectedStudioId(studioId);
    setSelectedSessionId(nextSession.id);
    setScreen("studio");
  }

  function selectSession(sessionId: string) {
    const nextSession = getSessionByIdFrom(sessionId, availableSessions);
    setSelectedStudioId(nextSession.studioId);
    setSelectedSessionId(nextSession.id);
    setScreen("session");
  }

  function startBooking(sessionId = selectedSessionId) {
    const nextSession = getSessionByIdFrom(sessionId, availableSessions);
    setSelectedStudioId(nextSession.studioId);
    setSelectedSessionId(nextSession.id);
    setAccepted(false);
    setScreen("schedule");
  }

  function toggleFavorite(studioId: string) {
    setFavoriteStudioIds((current) => {
      const isSaved = current.includes(studioId);
      notify(isSaved ? "تمت إزالة المركز من المفضلة" : "تمت إضافة المركز للمفضلة");
      return isSaved ? current.filter((id) => id !== studioId) : [...current, studioId];
    });
  }

  function openMaps(studio: Studio, mode: "search" | "directions" = "directions") {
    window.open(studio.googleMapsUri ?? buildMapsUrl(studio, mode), "_blank", "noopener,noreferrer");
  }

  async function refreshPlaces() {
    if (!googleMapsKey) {
      setPlacesStatus("needs-key");
      notify("أضف مفتاح Google Maps أولاً");
      return;
    }

    setPlacesStatus("loading");
    setPlacesError(null);

    try {
      const nextStudios = await fetchRiyadhStudiosFromGoogle(googleMapsKey, placesQuery);
      if (!nextStudios.length) {
        setPlacesStatus("error");
        setPlacesError("لم نجد نتائج مناسبة في الرياض لهذا البحث");
        return;
      }

      const nextSessions = buildAvailableSessions(nextStudios);
      setGoogleStudios(nextStudios);
      setSelectedStudioId(nextStudios[0].id);
      setSelectedSessionId(nextSessions[0].id);
      setPlacesLastUpdated(new Intl.DateTimeFormat("ar-SA", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()));
      setPlacesStatus("ready");
      notify(`تم جلب ${nextStudios.length} مركز من Google`);
    } catch (error) {
      setPlacesStatus("error");
      setPlacesError(
        error instanceof Error
          ? error.message
          : "تعذر الاتصال بـ Google Places",
      );
    }
  }

  function saveGoogleMapsKey(value: string) {
    const trimmedValue = value.trim();
    setGoogleMapsKey(trimmedValue);
    if (trimmedValue) {
      window.localStorage.setItem("auraGoogleMapsKey", trimmedValue);
      setPlacesStatus("idle");
      notify("تم حفظ مفتاح Google Maps");
      return;
    }

    window.localStorage.removeItem("auraGoogleMapsKey");
    setGoogleStudios([]);
    setPlacesStatus("needs-key");
  }

  function addToCalendar() {
    window.open(
      buildCalendarUrl(selectedSession, getStudioByIdFrom(selectedSession.studioId, availableStudios)),
      "_blank",
      "noopener,noreferrer",
    );
  }

  function cancelBooking() {
    setBooking((current) => ({
      id: current?.id ?? "AUR-2481",
      sessionId: current?.sessionId ?? selectedSession.id,
      status: "cancelled",
      createdAt: current?.createdAt ?? new Date().toISOString(),
    }));
    setBookingTab("السابقة");
    notify("تم إلغاء الحجز في البروتوتايب");
  }

  function payNow() {
    setProcessing(true);
    window.setTimeout(() => {
      setBooking({
        id: "AUR-2481",
        sessionId: selectedSessionId,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      });
      setProcessing(false);
      setScreen("success");
      notify("تم تأكيد الحجز");
    }, 800);
  }

  const actions: AuraActions = {
    availableStudios,
    availableSessions,
    selectedStudio,
    selectedSession,
    favoriteStudioIds,
    booking,
    paymentMethod,
    placesStatus,
    placesError,
    placesQuery,
    googleMapsKey,
    placesLastUpdated,
    selectStudio,
    selectSession,
    startBooking,
    toggleFavorite,
    openMaps,
    refreshPlaces,
    setPlacesQuery,
    saveGoogleMapsKey,
    addToCalendar,
    cancelBooking,
    notify,
    setPaymentMethod,
  };

  return (
    <main className="aura-stage" dir="rtl">
      <section className="desktop-shell" aria-label="تطبيق Aura للكمبيوتر">
        <DesktopExperience
          accepted={accepted}
          activity={activity}
          bookingTab={bookingTab}
          onGo={go}
          payNow={payNow}
          processing={processing}
          screen={screen}
          selectedSession={selectedSession}
          actions={actions}
          setAccepted={setAccepted}
          setActivity={setActivity}
          setBookingTab={setBookingTab}
        />
      </section>

      <section className="app-shell mobile-shell" aria-label="تطبيق Aura للجوال">
        <div className="app-screen">
          {screen === "login" && <LoginScreen onStart={() => go("home")} />}
          {screen === "home" && <HomeScreen actions={actions} onGo={go} />}
          {screen === "explore" && (
            <ExploreScreen
              actions={actions}
              activity={activity}
              setActivity={setActivity}
            />
          )}
          {screen === "studio" && <StudioScreen actions={actions} onGo={go} />}
          {screen === "schedule" && <ScheduleScreen actions={actions} onGo={go} />}
          {screen === "session" && (
            <SessionScreen actions={actions} session={selectedSession} onGo={go} />
          )}
          {screen === "checkout" && (
            <CheckoutScreen
              actions={actions}
              accepted={accepted}
              setAccepted={setAccepted}
              session={selectedSession}
              onGo={go}
            />
          )}
          {screen === "payment" && (
            <PaymentScreen actions={actions} processing={processing} payNow={payNow} />
          )}
          {screen === "success" && (
            <SuccessScreen actions={actions} session={selectedSession} onGo={go} />
          )}
          {screen === "bookings" && (
            <BookingsScreen
              actions={actions}
              bookingTab={bookingTab}
              setBookingTab={setBookingTab}
              onGo={go}
            />
          )}
          {screen === "account" && <AccountScreen actions={actions} />}
        </div>

        <BottomNav current={screen} onGo={go} />
      </section>
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}

function DesktopExperience({
  accepted,
  actions,
  activity,
  bookingTab,
  onGo,
  payNow,
  processing,
  screen,
  selectedSession,
  setAccepted,
  setActivity,
  setBookingTab,
}: {
  accepted: boolean;
  actions: AuraActions;
  activity: string;
  bookingTab: string;
  onGo: (screen: Screen) => void;
  payNow: () => void;
  processing: boolean;
  screen: Screen;
  selectedSession: Session;
  setAccepted: (value: boolean) => void;
  setActivity: (value: string) => void;
  setBookingTab: (value: string) => void;
}) {
  return (
    <>
      <DesktopSidebar actions={actions} current={screen} onGo={onGo} />
      <section className="desktop-main">
        <DesktopTopbar actions={actions} onGo={onGo} />
        <div className="desktop-view">
          {screen === "login" && <DesktopLoginScreen onGo={onGo} />}
          {screen === "home" && <DesktopHomeScreen actions={actions} onGo={onGo} />}
          {screen === "explore" && (
            <DesktopExploreScreen
              actions={actions}
              activity={activity}
              setActivity={setActivity}
            />
          )}
          {screen === "studio" && <DesktopStudioScreen actions={actions} />}
          {screen === "schedule" && <DesktopScheduleScreen actions={actions} onGo={onGo} />}
          {screen === "session" && (
            <DesktopSurface>
              <SessionScreen actions={actions} session={selectedSession} onGo={onGo} />
            </DesktopSurface>
          )}
          {screen === "checkout" && (
            <DesktopSurface>
              <CheckoutScreen
                actions={actions}
                accepted={accepted}
                setAccepted={setAccepted}
                session={selectedSession}
                onGo={onGo}
              />
            </DesktopSurface>
          )}
          {screen === "payment" && (
            <DesktopSurface narrow>
              <PaymentScreen actions={actions} processing={processing} payNow={payNow} />
            </DesktopSurface>
          )}
          {screen === "success" && (
            <DesktopSurface narrow>
              <SuccessScreen actions={actions} session={selectedSession} onGo={onGo} />
            </DesktopSurface>
          )}
          {screen === "bookings" && (
            <DesktopBookingsScreen
              actions={actions}
              bookingTab={bookingTab}
              setBookingTab={setBookingTab}
              onGo={onGo}
            />
          )}
          {screen === "account" && <DesktopAccountScreen actions={actions} />}
        </div>
      </section>
    </>
  );
}

function DesktopSidebar({
  actions,
  current,
  onGo,
}: {
  actions: AuraActions;
  current: Screen;
  onGo: (screen: Screen) => void;
}) {
  const sidebarSession = actions.booking
    ? getSessionByIdFrom(actions.booking.sessionId, actions.availableSessions)
    : actions.selectedSession;
  const navItems: Array<{ id: Screen; label: string; icon: ReactNode }> = [
    { id: "home", label: "الرئيسية", icon: <Home size={18} /> },
    { id: "explore", label: "استكشاف", icon: <Search size={18} /> },
    { id: "bookings", label: "حجوزاتي", icon: <TicketCheck size={18} /> },
    { id: "account", label: "حسابي", icon: <UserRound size={18} /> },
  ];

  return (
    <aside className="desktop-sidebar">
      <button className="desktop-brand" onClick={() => onGo("home")} type="button">
        <span className="brand-mark">A</span>
        <span>
          <strong>Aura</strong>
          <small>حجوزات الحركة</small>
        </span>
      </button>

      <nav className="desktop-nav" aria-label="تنقل الكمبيوتر">
        {navItems.map((item) => (
          <button
            className={current === item.id ? "active" : ""}
            key={item.id}
            onClick={() => onGo(item.id)}
            type="button"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="desktop-sidebar-card">
        <span>حجزك القادم</span>
        <strong>{sidebarSession.title}</strong>
        <small>{sidebarSession.date} - {sidebarSession.time}</small>
        <button onClick={() => onGo("success")} type="button">
          عرض الرمز
        </button>
      </div>
    </aside>
  );
}

function DesktopTopbar({
  actions,
  onGo,
}: {
  actions: AuraActions;
  onGo: (screen: Screen) => void;
}) {
  return (
    <header className="desktop-topbar">
      <div>
        <p>الرياض، حي العليا</p>
        <h1>مساءك هادئ</h1>
      </div>
      <div className="desktop-topbar-actions">
        <button className="desktop-search" onClick={() => onGo("explore")} type="button">
          <Search size={17} aria-hidden="true" />
          <span>ابحث عن مركز أو جلسة</span>
        </button>
        <button
          className="icon-button"
          onClick={() => actions.notify("لا توجد إشعارات جديدة")}
          type="button"
          aria-label="الإشعارات"
          title="الإشعارات"
        >
          <Bell size={18} aria-hidden="true" />
        </button>
        <button className="desktop-user" onClick={() => onGo("account")} type="button">
          <span className="avatar">ح</span>
          <span>حصة الدويغري</span>
        </button>
      </div>
    </header>
  );
}

function DesktopHomeScreen({
  actions,
  onGo,
}: {
  actions: AuraActions;
  onGo: (screen: Screen) => void;
}) {
  const nextSession = actions.booking
    ? getSessionByIdFrom(actions.booking.sessionId, actions.availableSessions)
    : actions.selectedSession;
  const nextStudio = getStudioByIdFrom(nextSession.studioId, actions.availableStudios);
  const quickIntents = [
    { label: "اليوم", hint: "جلسات متاحة", icon: <Clock3 size={18} /> },
    { label: "قريب مني", hint: "حسب الموقع", icon: <MapPin size={18} /> },
    { label: "مناسب للجميع", hint: "مستوى مريح", icon: <Dumbbell size={18} /> },
    { label: "الأكثر حجزا", hint: "اختيارات شائعة", icon: <Star size={18} /> },
  ];

  return (
    <div className="desktop-home">
      <section className="desktop-hero-panel">
        <div>
          <span className="kicker">حجزك القادم</span>
          <h2>{nextSession.title}</h2>
          <p>{nextStudio.name} - {nextSession.date} {nextSession.time}</p>
          <div className="desktop-hero-actions">
            <button className="primary-button" onClick={() => actions.startBooking()} type="button">
              <CalendarDays size={18} aria-hidden="true" />
              احجز موعد جديد
            </button>
            <button className="secondary-button" onClick={() => onGo("bookings")} type="button">
              <TicketCheck size={18} aria-hidden="true" />
              حجوزاتي
            </button>
          </div>
        </div>
        <div className="desktop-hero-image" aria-hidden="true" />
      </section>

      <div className="desktop-quick-grid">
        {quickIntents.map((intent) => (
          <button
            className="desktop-quick-card"
            key={intent.label}
            onClick={() => onGo("explore")}
            type="button"
          >
            {intent.icon}
            <strong>{intent.label}</strong>
            <span>{intent.hint}</span>
          </button>
        ))}
      </div>

      <section className="desktop-section">
        <SectionTitle title="مقترح لك اليوم" action="كل النتائج" onAction={() => onGo("explore")} />
        <div className="desktop-session-grid">
          {actions.availableSessions.slice(0, 5).map((session) => (
            <DesktopSessionTile
              key={session.id}
              session={session}
              onSelect={actions.selectSession}
            />
          ))}
        </div>
      </section>

      <section className="desktop-section">
        <SectionTitle title="مراكز قريبة منك" action="استكشف" onAction={() => onGo("explore")} />
        <div className="desktop-studio-grid">
          {actions.availableStudios.map((studio) => (
            <DesktopStudioTile
              key={studio.id}
              studio={studio}
              onSelect={actions.selectStudio}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function DesktopExploreScreen({
  actions,
  activity,
  setActivity,
}: {
  actions: AuraActions;
  activity: string;
  setActivity: (value: string) => void;
}) {
  const filteredStudios =
    activity === "الكل"
      ? actions.availableStudios
      : actions.availableStudios.filter((studio) => studio.tags.includes(activity));

  return (
    <div className="desktop-two-column">
      <aside className="desktop-panel desktop-filter-panel">
        <h2>استكشاف</h2>
        <p>اختر النشاط ثم افتح ملف المركز للحجز.</p>
        <div className="input-card">
          <Search size={18} aria-hidden="true" />
          <input
            aria-label="بحث"
            onChange={(event) => actions.setPlacesQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                actions.refreshPlaces();
              }
            }}
            placeholder="Pilates، Yoga، اسم مركز..."
            value={actions.placesQuery}
          />
        </div>
        <PlacesDataPanel actions={actions} compact />
        <FilterGroup
          label="النشاط"
          value={activity}
          options={["الكل", "بيلاتس", "يوغا"]}
          onChange={(value) => {
            setActivity(value);
            actions.notify(`تم اختيار ${value}`);
          }}
        />
        <div className="desktop-filter-summary">
          <span>الترتيب</span>
          <strong>الأقرب أولاً</strong>
        </div>
        <div className="desktop-filter-summary">
          <span>الفترة</span>
          <strong>اليوم مساءً</strong>
        </div>
      </aside>

      <section className="desktop-panel">
        <div className="desktop-panel-heading">
          <div>
            <span>{filteredStudios.length} مراكز</span>
            <h2>نتائج قريبة منك</h2>
          </div>
          <button
            className="secondary-button"
            onClick={() => actions.notify("الفلاتر المتقدمة ستكون في النسخة التالية")}
            type="button"
          >
            <SlidersHorizontal size={17} aria-hidden="true" />
            الفلاتر
          </button>
        </div>
        <div className="desktop-studio-grid">
          {filteredStudios.map((studio) => (
            <DesktopStudioTile
              key={studio.id}
              studio={studio}
              onSelect={actions.selectStudio}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function DesktopStudioScreen({
  actions,
}: {
  actions: AuraActions;
}) {
  const studio = actions.selectedStudio;
  const studioSessions = actions.availableSessions.filter((session) => session.studioId === studio.id);
  const isFavorite = actions.favoriteStudioIds.includes(studio.id);

  return (
    <div className="desktop-studio-layout">
      <section className="desktop-panel desktop-studio-detail">
        <div
          className="desktop-studio-cover"
          style={{ backgroundImage: `url(${studio.image})` }}
          aria-hidden="true"
        />
        <div className="desktop-studio-heading">
          <div>
            <span className="kicker">مركز بوتيك</span>
            <h2>{studio.name}</h2>
            <p>
              <MapPin size={15} aria-hidden="true" />
              {studio.area} - {studio.distance}
            </p>
          </div>
          <span className="rating-badge">
            <Star size={14} fill="currentColor" aria-hidden="true" /> {studio.rating}
          </span>
        </div>
        <p className="studio-copy">
          {studio.source === "google"
            ? "هذا الملف مبني من بيانات Google Places. الجلسات والأسعار داخل Aura تبقى قابلة لاعتماد المركز لاحقًا."
            : "مركز للحركة الواعية يقدم بيلاتس ويوغا بمستويات مختلفة ومساحات تدريب محدودة العدد."}
        </p>
        <div className="facility-row" aria-label="المرافق">
          {studio.facilities.map((facility) => (
            <span key={facility}>{facility}</span>
          ))}
        </div>
        <div className="inline-actions">
          <button
            className="secondary-button"
            onClick={() => actions.toggleFavorite(studio.id)}
            type="button"
          >
            <Heart size={17} fill={isFavorite ? "currentColor" : "none"} aria-hidden="true" />
            {isFavorite ? "في المفضلة" : "إضافة للمفضلة"}
          </button>
          <button
            className="secondary-button"
            onClick={() => actions.openMaps(studio, "directions")}
            type="button"
          >
            <MapPin size={17} aria-hidden="true" />
            الاتجاهات
          </button>
          {studio.website && (
            <button
              className="secondary-button"
              onClick={() => window.open(studio.website, "_blank", "noopener,noreferrer")}
              type="button"
            >
              <Search size={17} aria-hidden="true" />
              الموقع
            </button>
          )}
        </div>
      </section>

      <aside className="desktop-panel desktop-reserve-panel">
        <span className="kicker">حجز فوري</span>
        <h3>{studioSessions[0]?.title ?? actions.selectedSession.title}</h3>
        <p>{studioSessions[0]?.category ?? actions.selectedSession.category} - {studioSessions[0]?.duration ?? actions.selectedSession.duration}</p>
        <div className="desktop-price-line">
          <span>يبدأ من</span>
          <strong>{studioSessions[0]?.price ?? actions.selectedSession.price} ر.س</strong>
        </div>
        <GoogleMapPreview studio={studio} />
        <button
          className="primary-button full"
          onClick={() => actions.startBooking(studioSessions[0]?.id)}
          type="button"
        >
          <CalendarDays size={18} aria-hidden="true" />
          احجز موعد
        </button>
      </aside>
    </div>
  );
}

function DesktopScheduleScreen({
  actions,
  onGo,
}: {
  actions: AuraActions;
  onGo: (screen: Screen) => void;
}) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState("04:00 م");
  const days = buildScheduleDays();
  const session = actions.selectedSession;
  const studio = getStudioByIdFrom(session.studioId, actions.availableStudios);
  const times = [
    { value: "04:00 م", status: "available" },
    { value: "04:30 م", status: "available" },
    { value: "05:00 م", status: "available" },
    { value: "05:30 م", status: "available" },
    { value: "06:00 م", status: "booked" },
    { value: "06:30 م", status: "available" },
    { value: "07:00 م", status: "available" },
    { value: "07:30 م", status: "available" },
    { value: "08:00 م", status: "booked" },
    { value: "08:30 م", status: "available" },
    { value: "09:00 م", status: "available" },
    { value: "09:30 م", status: "booked" },
    { value: "10:00 م", status: "available" },
    { value: "10:30 م", status: "available" },
    { value: "11:00 م", status: "available" },
  ];

  return (
    <div className="desktop-booking-layout">
      <section className="desktop-panel">
        <div className="desktop-panel-heading">
          <div>
            <span>{studio.name}</span>
            <h2>تفاصيل الحجز</h2>
          </div>
          <b>{session.price} ر.س</b>
        </div>
        <div className="day-strip desktop-day-strip" aria-label="اختيار اليوم">
          {days.map((day, index) => (
            <button
              className={selectedDay === index ? "day-pill selected" : "day-pill"}
              key={`${day.weekday}-${day.date}-${day.month}`}
              onClick={() => setSelectedDay(index)}
              type="button"
            >
              <span>{day.weekday}</span>
              <strong>{day.date}</strong>
              <small>{day.month}</small>
            </button>
          ))}
        </div>
        <div className="time-section-heading">
          <h3>الأوقات المتوفرة</h3>
          <span>
            <Clock3 size={15} aria-hidden="true" />
            خلال {days[selectedDay].weekday}
          </span>
        </div>
        <div className="time-slot-grid desktop-time-grid">
          {times.map((time) => {
            const isBooked = time.status === "booked";
            const isSelected = selectedTime === time.value && !isBooked;

            return (
              <button
                className={`time-slot ${isBooked ? "booked" : ""} ${
                  isSelected ? "selected" : ""
                }`}
                disabled={isBooked}
                key={time.value}
                onClick={() => setSelectedTime(time.value)}
                type="button"
              >
                <strong>{time.value}</strong>
                {isBooked && <span>محجوز</span>}
              </button>
            );
          })}
        </div>
      </section>

      <aside className="desktop-panel desktop-reserve-panel">
        <span className="kicker">ملخص الموعد</span>
        <h3>{session.title}</h3>
        <p>{days[selectedDay].weekday} - {selectedTime}</p>
        <div className="desktop-price-line">
          <span>الإجمالي</span>
          <strong>{session.price + Math.round(session.price * 0.15)} ر.س</strong>
        </div>
        <button className="primary-button full" onClick={() => onGo("checkout")} type="button">
          <TicketCheck size={18} aria-hidden="true" />
          متابعة الحجز
        </button>
      </aside>
    </div>
  );
}

function DesktopBookingsScreen({
  actions,
  bookingTab,
  setBookingTab,
  onGo,
}: {
  actions: AuraActions;
  bookingTab: string;
  setBookingTab: (value: string) => void;
  onGo: (screen: Screen) => void;
}) {
  const bookingSession = actions.booking
    ? getSessionByIdFrom(actions.booking.sessionId, actions.availableSessions)
    : actions.selectedSession;
  const bookingStudio = getStudioByIdFrom(bookingSession.studioId, actions.availableStudios);
  const hasConfirmedBooking = actions.booking?.status === "confirmed";

  return (
    <div className="desktop-panel">
      <div className="desktop-panel-heading">
        <div>
          <span>حصة الدويغري</span>
          <h2>حجوزاتي</h2>
        </div>
        <div className="segmented desktop-booking-tabs">
          {["القادمة", "السابقة"].map((item) => (
            <button
              className={bookingTab === item ? "selected" : ""}
              key={item}
              onClick={() => setBookingTab(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {bookingTab === "القادمة" && hasConfirmedBooking ? (
        <div className="desktop-booking-card">
          <span className="status-pill">مؤكد</span>
          <h3>{bookingSession.title}</h3>
          <p>{bookingStudio.name} - {bookingSession.date} {bookingSession.time}</p>
          <div className="inline-actions">
            <button className="secondary-button" onClick={() => onGo("success")} type="button">
              <TicketCheck size={16} aria-hidden="true" />
              رمز الحضور
            </button>
            <button
              className="ghost-button"
              onClick={actions.cancelBooking}
              type="button"
            >
              إلغاء
            </button>
          </div>
        </div>
      ) : bookingTab === "القادمة" ? (
        <div className="empty-state">
          <CalendarDays size={28} aria-hidden="true" />
          <strong>لا توجد حجوزات قادمة</strong>
          <span>احجز جلسة جديدة لتظهر هنا.</span>
        </div>
      ) : (
        <div className="empty-state">
          <CalendarDays size={28} aria-hidden="true" />
          <strong>{actions.booking?.status === "cancelled" ? "آخر حجز تم إلغاؤه" : "لا توجد حجوزات سابقة"}</strong>
          <span>
            {actions.booking?.status === "cancelled"
              ? `${bookingSession.title} - ${bookingStudio.name}`
              : "ستظهر الجلسات المكتملة هنا."}
          </span>
        </div>
      )}
    </div>
  );
}

function DesktopAccountScreen({ actions }: { actions: AuraActions }) {
  return (
    <div className="desktop-two-column">
      <section className="desktop-panel">
        <div className="profile-card desktop-profile-card">
          <div className="avatar">ح</div>
          <div>
            <strong>حصة الدويغري</strong>
            <span>+966 5X XXX 214</span>
          </div>
        </div>
        <div className="desktop-account-grid">
          {["الملف الشخصي", "المفضلة", "طرق الدفع", "الإشعارات"].map((item) => (
            <button
              className="menu-row"
              key={item}
              onClick={() => actions.notify(`${item} ستكون صفحة مستقلة لاحقا`)}
              type="button"
            >
              <span>{item}</span>
              <ChevronLeft size={17} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
      <aside className="desktop-panel desktop-reserve-panel">
        <span className="kicker">الدعم</span>
        <h3>المساعدة والخصوصية</h3>
        <p>إدارة وسائل الدفع، الإشعارات، والشروط من مكان واحد.</p>
      </aside>
    </div>
  );
}

function DesktopLoginScreen({ onGo }: { onGo: (screen: Screen) => void }) {
  return (
    <div className="desktop-login-panel">
      <LoginScreen onStart={() => onGo("home")} />
    </div>
  );
}

function DesktopSurface({
  children,
  narrow,
}: {
  children: ReactNode;
  narrow?: boolean;
}) {
  return <div className={narrow ? "desktop-surface narrow" : "desktop-surface"}>{children}</div>;
}

function DesktopSessionTile({
  session,
  onSelect,
}: {
  session: Session;
  onSelect: (sessionId: string) => void;
}) {
  return (
    <button
      className="desktop-session-tile"
      onClick={() => onSelect(session.id)}
      type="button"
    >
      <div
        className="desktop-tile-image"
        style={{ backgroundImage: `url(${session.image})` }}
        aria-hidden="true"
      />
      <div>
        <span>{session.date} - {session.time}</span>
        <strong>{session.title}</strong>
        <p>{session.studio}</p>
      </div>
      <b>{session.price} ر.س</b>
    </button>
  );
}

function DesktopStudioTile({
  studio,
  onSelect,
}: {
  studio: Studio;
  onSelect: (studioId: string) => void;
}) {
  return (
    <button
      className="desktop-studio-tile"
      onClick={() => onSelect(studio.id)}
      type="button"
    >
      <div
        className="desktop-studio-thumb"
        style={{ backgroundImage: `url(${studio.image})` }}
        aria-hidden="true"
      />
      <div>
        <span>
          <Star size={13} fill="currentColor" aria-hidden="true" /> {studio.rating}
        </span>
        <strong>{studio.name}</strong>
        <p>{studio.area} - {studio.distance}</p>
      </div>
    </button>
  );
}

function LoginScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="screen-content login-screen">
      <div className="hero-photo login-photo" aria-hidden="true" />
      <div className="login-card">
        <span className="brand-mark large">A</span>
        <h2>ابدأ مع Aura</h2>
        <p>احجز جلسات البيلاتس واليوغا من مراكز قريبة، وتابع حجزك من مكان واحد.</p>

        <label className="field-label" htmlFor="phone">
          رقم الجوال
        </label>
        <div className="phone-field">
          <span>+966</span>
          <input id="phone" inputMode="tel" placeholder="5X XXX XXXX" />
        </div>

        <label className="terms-row">
          <input type="checkbox" defaultChecked />
          <span>أوافق على الشروط وسياسة الخصوصية</span>
        </label>

        <button className="primary-button full" onClick={onStart} type="button">
          <ChevronLeft size={18} aria-hidden="true" />
          متابعة
        </button>
      </div>
    </div>
  );
}

function HomeScreen({
  actions,
  onGo,
}: {
  actions: AuraActions;
  onGo: (screen: Screen) => void;
}) {
  const nextSession = actions.booking
    ? getSessionByIdFrom(actions.booking.sessionId, actions.availableSessions)
    : actions.selectedSession;
  const nextStudio = getStudioByIdFrom(nextSession.studioId, actions.availableStudios);
  const quickIntents = [
    { label: "اليوم", hint: "جلسات قريبة", icon: <Clock3 size={17} /> },
    { label: "قريب مني", hint: "حسب الموقع", icon: <MapPin size={17} /> },
    { label: "مناسب للجميع", hint: "مستوى مريح", icon: <Dumbbell size={17} /> },
    { label: "الأكثر حجزا", hint: "اختيارات شائعة", icon: <Star size={17} /> },
  ];

  return (
    <div className="screen-content">
      <AppHeader
        title="مساءك هادئ"
        subtitle="الرياض، حي العليا"
        action={<Bell size={18} aria-hidden="true" />}
        onAction={() => actions.notify("لا توجد إشعارات جديدة")}
      />

      <button
        className="home-next-card"
        onClick={() => onGo("bookings")}
        type="button"
      >
        <div>
          <span>حجزك القادم</span>
          <strong>{nextSession.title}</strong>
          <p>{nextStudio.name} - {nextSession.date} {nextSession.time}</p>
        </div>
        <CalendarDays size={22} aria-hidden="true" />
      </button>

      <SectionTitle
        title="ابدأ بسرعة"
        action="بحث متقدم"
        onAction={() => onGo("explore")}
      />
      <div className="quick-intent-grid">
        {quickIntents.map((intent) => (
          <button
            className="quick-intent-card"
            key={intent.label}
            onClick={() => onGo("explore")}
            type="button"
          >
            {intent.icon}
            <strong>{intent.label}</strong>
            <span>{intent.hint}</span>
          </button>
        ))}
      </div>

      <SectionTitle
        title="مقترح لك اليوم"
        action="كل النتائج"
        onAction={() => onGo("explore")}
      />
      <div className="session-stack">
        {actions.availableSessions.slice(0, 2).map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onSelect={actions.selectSession}
          />
        ))}
      </div>

      <SectionTitle
        title="مراكز قريبة منك"
        action="استكشف"
        onAction={() => onGo("explore")}
      />
      <button
        className="studio-card"
        onClick={() => actions.selectStudio(actions.availableStudios[0].id)}
        type="button"
      >
        <div
          className="studio-thumb"
          style={{ backgroundImage: `url(${actions.availableStudios[0].image})` }}
          aria-hidden="true"
        />
        <div>
          <div className="studio-line">
            <strong>{actions.availableStudios[0].name}</strong>
            <span>
              <Star size={13} fill="currentColor" aria-hidden="true" /> {actions.availableStudios[0].rating}
            </span>
          </div>
          <p>{actions.availableStudios[0].tags}</p>
          <small>{actions.availableStudios[0].area} - {actions.availableStudios[0].price}</small>
        </div>
      </button>
    </div>
  );
}

function ExploreScreen({
  actions,
  activity,
  setActivity,
}: {
  actions: AuraActions;
  activity: string;
  setActivity: (value: string) => void;
}) {
  const filteredStudios =
    activity === "الكل"
      ? actions.availableStudios
      : actions.availableStudios.filter((studio) => studio.tags.includes(activity));

  return (
    <div className="screen-content">
      <AppHeader
        title="استكشاف"
        subtitle="ابحث حسب النشاط، الوقت، أو السعر"
        action={<SlidersHorizontal size={18} aria-hidden="true" />}
        onAction={() => actions.notify("الفلاتر المتقدمة ستكون في النسخة التالية")}
      />

      <div className="input-card">
        <Search size={18} aria-hidden="true" />
        <input
          aria-label="بحث"
          onChange={(event) => actions.setPlacesQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              actions.refreshPlaces();
            }
          }}
          placeholder="Pilates، Yoga، اسم مركز..."
          value={actions.placesQuery}
        />
      </div>

      <PlacesDataPanel actions={actions} />

      <FilterGroup
        label="النشاط"
        value={activity}
        options={["الكل", "بيلاتس", "يوغا"]}
        onChange={(value) => {
          setActivity(value);
          actions.notify(`تم اختيار ${value}`);
        }}
      />

      <div className="result-header">
        <strong>{filteredStudios.length} مراكز</strong>
        <span>الأقرب أولاً</span>
      </div>

      <div className="studio-result-list">
        {filteredStudios.map((studio) => (
          <StudioResultCard
            key={studio.id}
            studio={studio}
            onSelect={actions.selectStudio}
          />
        ))}
      </div>
    </div>
  );
}

function StudioScreen({
  actions,
  onGo,
}: {
  actions: AuraActions;
  onGo: (screen: Screen) => void;
}) {
  const studio = actions.selectedStudio;
  const studioSessions = actions.availableSessions.filter((session) => session.studioId === studio.id);
  const isFavorite = actions.favoriteStudioIds.includes(studio.id);

  return (
    <div className="screen-content studio-screen">
      <div
        className="studio-cover"
        style={{ backgroundImage: `url(${studio.image})` }}
      >
        <button
          className="icon-button back"
          onClick={() => onGo("explore")}
          type="button"
          aria-label="رجوع"
          title="رجوع"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          className="icon-button"
          onClick={() => actions.toggleFavorite(studio.id)}
          type="button"
          aria-label="إضافة للمفضلة"
          title="إضافة للمفضلة"
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>

      <div className="studio-info">
        <div>
          <h2>{studio.name}</h2>
          <p>
            <MapPin size={15} aria-hidden="true" />
            {studio.area} - {studio.distance}
          </p>
        </div>
        <span className="rating-badge">
          <Star size={14} fill="currentColor" aria-hidden="true" /> {studio.rating}
        </span>
      </div>

      <p className="studio-copy">
        {studio.source === "google"
          ? "هذا الملف يعرض بيانات Google Places للمركز. اعتماد الجلسات والأسعار يتم لاحقًا من حساب المركز داخل Aura."
          : "مركز بوتيك للحركة الواعية، يقدم جلسات بيلاتس ويوغا بمستويات مختلفة ومساحات تدريب محدودة العدد."}
      </p>

      <div className="facility-row" aria-label="المرافق">
        {studio.facilities.map((facility) => (
          <span key={facility}>{facility}</span>
        ))}
      </div>

      <SectionTitle title="معلومات الحجز" action="حجز فوري" />
      <div className="studio-profile-grid">
        <MiniStat icon={<Clock3 size={16} />} label={studio.hours} />
        <MiniStat icon={<Dumbbell size={16} />} label={studio.tags} />
        <MiniStat icon={<UserRound size={16} />} label="6 مدربين" />
        <MiniStat icon={<TicketCheck size={16} />} label="حجز فوري" />
      </div>

      <div className="inline-actions">
        <button
          className="secondary-button"
          onClick={() => actions.openMaps(studio, "directions")}
          type="button"
        >
          <MapPin size={17} aria-hidden="true" />
          الاتجاهات
        </button>
        <button
          className="secondary-button"
          onClick={() => actions.notify(`رقم المركز: ${studio.phone}`)}
          type="button"
        >
          <MessageCircle size={17} aria-hidden="true" />
          تواصل
        </button>
        {studio.website && (
          <button
            className="secondary-button"
            onClick={() => window.open(studio.website, "_blank", "noopener,noreferrer")}
            type="button"
          >
            <Search size={17} aria-hidden="true" />
            الموقع
          </button>
        )}
      </div>

      <GoogleMapPreview studio={studio} />

      <section className="plain-section">
        <h3>عن المركز</h3>
        <p>
          ملف المركز يجمع المعلومات الأساسية قبل الحجز: نوع الجلسات، مستوى
          التجربة، المرافق، والموقع. اختَر الحجز عندما تكون مستعدًا لاختيار
          اليوم والوقت.
        </p>
      </section>

      <button
        className="primary-button sticky"
        onClick={() => actions.startBooking(studioSessions[0]?.id)}
        type="button"
      >
        <CalendarDays size={18} aria-hidden="true" />
        احجز موعد
      </button>
    </div>
  );
}

function ScheduleScreen({
  actions,
  onGo,
}: {
  actions: AuraActions;
  onGo: (screen: Screen) => void;
}) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState("04:00 م");
  const days = buildScheduleDays();
  const session = actions.selectedSession;
  const studio = getStudioByIdFrom(session.studioId, actions.availableStudios);
  const times = [
    { value: "04:00 م", status: "available" },
    { value: "04:30 م", status: "available" },
    { value: "05:00 م", status: "available" },
    { value: "05:30 م", status: "available" },
    { value: "06:00 م", status: "booked" },
    { value: "06:30 م", status: "available" },
    { value: "07:00 م", status: "available" },
    { value: "07:30 م", status: "available" },
    { value: "08:00 م", status: "booked" },
    { value: "08:30 م", status: "available" },
    { value: "09:00 م", status: "available" },
    { value: "09:30 م", status: "booked" },
    { value: "10:00 م", status: "available" },
    { value: "10:30 م", status: "available" },
    { value: "11:00 م", status: "available" },
  ];

  return (
    <div className="screen-content schedule-screen">
      <AppHeader
        title="تفاصيل الحجز"
        subtitle={studio.name}
        action={<CalendarDays size={18} aria-hidden="true" />}
        onAction={() => actions.addToCalendar()}
      />

      <div className="schedule-studio-summary">
        <div>
          <span>{session.title}</span>
          <strong>{session.category} - {session.duration}</strong>
        </div>
        <b>{session.price} ر.س</b>
      </div>

      <h3 className="schedule-prompt">متى وقت حجزك؟</h3>
      <div className="day-strip" aria-label="اختيار اليوم">
        {days.map((day, index) => (
          <button
            className={selectedDay === index ? "day-pill selected" : "day-pill"}
            key={`${day.weekday}-${day.date}-${day.month}`}
            onClick={() => setSelectedDay(index)}
            type="button"
          >
            <span>{day.weekday}</span>
            <strong>{day.date}</strong>
            <small>{day.month}</small>
          </button>
        ))}
      </div>

      <div className="time-section-heading">
        <h3>الأوقات المتوفرة</h3>
        <span>
          <Clock3 size={15} aria-hidden="true" />
          خلال {days[selectedDay].weekday}
        </span>
      </div>
      <div className="time-slot-grid">
        {times.map((time) => {
          const isBooked = time.status === "booked";
          const isSelected = selectedTime === time.value && !isBooked;

          return (
            <button
              className={`time-slot ${isBooked ? "booked" : ""} ${
                isSelected ? "selected" : ""
              }`}
              disabled={isBooked}
              key={time.value}
              onClick={() => setSelectedTime(time.value)}
              type="button"
            >
              <strong>{time.value}</strong>
              {isBooked && <span>محجوز</span>}
            </button>
          );
        })}
      </div>

      <button className="primary-button sticky" onClick={() => onGo("checkout")}>
        <TicketCheck size={18} aria-hidden="true" />
        متابعة الحجز
      </button>
    </div>
  );
}

function SessionScreen({
  actions,
  session,
  onGo,
}: {
  actions: AuraActions;
  session: Session;
  onGo: (screen: Screen) => void;
}) {
  const studio = getStudioByIdFrom(session.studioId, actions.availableStudios);

  return (
    <div className="screen-content session-detail">
      <div
        className="detail-image"
        style={{ backgroundImage: `url(${session.image})` }}
      >
        <button
          className="icon-button back"
          onClick={() => onGo("studio")}
          type="button"
          aria-label="رجوع"
          title="رجوع"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <span className="image-badge">{session.seats} مقاعد متبقية</span>
      </div>

      <div className="detail-heading">
        <div>
          <span className="kicker">{session.category}</span>
          <h2>{session.title}</h2>
          <p>{studio.name}</p>
        </div>
        <strong>{session.price} ر.س</strong>
      </div>

      <div className="detail-grid">
        <MiniStat icon={<CalendarDays size={16} />} label={session.date} />
        <MiniStat icon={<Clock3 size={16} />} label={session.time} />
        <MiniStat icon={<Dumbbell size={16} />} label={session.level} />
        <MiniStat icon={<UserRound size={16} />} label={`${session.trainer} - ${session.duration}`} />
      </div>

      <section className="plain-section">
        <h3>عن الجلسة</h3>
        <p>{session.description}</p>
      </section>

      <section className="policy-box">
        <ShieldCheck size={18} aria-hidden="true" />
        <div>
          <strong>سياسة الإلغاء</strong>
          <p>إلغاء مجاني حتى 6 ساعات قبل الموعد. بعد ذلك قد يتم احتساب الرسوم.</p>
        </div>
      </section>

      <button
        className="primary-button sticky"
        onClick={() => actions.startBooking(session.id)}
        type="button"
      >
        <TicketCheck size={18} aria-hidden="true" />
        احجز الآن
      </button>
    </div>
  );
}

function CheckoutScreen({
  actions,
  session,
  accepted,
  setAccepted,
  onGo,
}: {
  actions: AuraActions;
  session: Session;
  accepted: boolean;
  setAccepted: (value: boolean) => void;
  onGo: (screen: Screen) => void;
}) {
  const vat = Math.round(session.price * 0.15);
  const total = session.price + vat;
  const studio = getStudioByIdFrom(session.studioId, actions.availableStudios);

  return (
    <div className="screen-content">
      <AppHeader
        title="ملخص الحجز"
        subtitle="راجع التفاصيل قبل الدفع"
        action={<TicketCheck size={18} aria-hidden="true" />}
        onAction={() => actions.openMaps(studio, "directions")}
      />

      <div className="booking-summary">
        <span className="kicker">{studio.name}</span>
        <h2>{session.title}</h2>
        <div className="summary-row">
          <CalendarDays size={16} aria-hidden="true" />
          <span>
            {session.date} - {session.time}
          </span>
        </div>
        <div className="summary-row">
          <UserRound size={16} aria-hidden="true" />
          <span>المدرب: {session.trainer}</span>
        </div>
        <div className="summary-row">
          <MapPin size={16} aria-hidden="true" />
          <span>{studio.address}</span>
        </div>
      </div>

      <div className="price-box">
        <PriceLine label="سعر الجلسة" value={`${session.price} ر.س`} />
        <PriceLine label="ضريبة القيمة المضافة" value={`${vat} ر.س`} />
        <PriceLine label="الإجمالي" value={`${total} ر.س`} strong />
      </div>

      <label className="terms-row boxed">
        <input
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
          type="checkbox"
        />
        <span>أوافق على سياسة الإلغاء وشروط الحضور</span>
      </label>

      <button
        className="primary-button full"
        disabled={!accepted}
        onClick={() => onGo("payment")}
        type="button"
      >
        <CreditCard size={18} aria-hidden="true" />
        متابعة للدفع
      </button>
    </div>
  );
}

function PaymentScreen({
  actions,
  processing,
  payNow,
}: {
  actions: AuraActions;
  processing: boolean;
  payNow: () => void;
}) {
  const total = actions.selectedSession.price + Math.round(actions.selectedSession.price * 0.15);

  return (
    <div className="screen-content payment-screen">
      <AppHeader
        title="الدفع"
        subtitle="اختر طريقة الدفع المناسبة"
        action={<WalletCards size={18} aria-hidden="true" />}
      />

      <button
        className={actions.paymentMethod === "Apple Pay" ? "pay-option selected" : "pay-option"}
        onClick={() => actions.setPaymentMethod("Apple Pay")}
        type="button"
      >
        <span>
          <WalletCards size={18} aria-hidden="true" />
          Apple Pay
        </span>
        {actions.paymentMethod === "Apple Pay" ? (
          <Check size={18} aria-hidden="true" />
        ) : (
          <ChevronLeft size={18} aria-hidden="true" />
        )}
      </button>

      <button
        className={actions.paymentMethod === "card" ? "pay-option selected" : "pay-option"}
        onClick={() => actions.setPaymentMethod("card")}
        type="button"
      >
        <span>
          <CreditCard size={18} aria-hidden="true" />
          مدى أو بطاقة بنكية
        </span>
        {actions.paymentMethod === "card" ? (
          <Check size={18} aria-hidden="true" />
        ) : (
          <ChevronLeft size={18} aria-hidden="true" />
        )}
      </button>

      <div className="card-preview">
        <span>Aura Pay</span>
        <strong>•••• 4821</strong>
        <small>إجمالي العملية {total} ر.س</small>
      </div>

      <button
        className="primary-button full"
        disabled={processing}
        onClick={payNow}
        type="button"
      >
        <ShieldCheck size={18} aria-hidden="true" />
        {processing ? "جار معالجة الدفع..." : "ادفع الآن"}
      </button>
    </div>
  );
}

function SuccessScreen({
  actions,
  session,
  onGo,
}: {
  actions: AuraActions;
  session: Session;
  onGo: (screen: Screen) => void;
}) {
  const studio = getStudioByIdFrom(session.studioId, actions.availableStudios);
  const bookingId = actions.booking?.id ?? "AUR-2481";

  return (
    <div className="screen-content success-screen">
      <div className="success-mark">
        <Check size={34} aria-hidden="true" />
      </div>
      <h2>تم تأكيد الحجز</h2>
      <p>رقم الحجز {bookingId}</p>

      <div className="confirmed-card">
        <strong>{session.title}</strong>
        <span>
          {session.date} - {session.time}
        </span>
        <span>{studio.name}، {studio.area}</span>
      </div>

      <div className="qr-box" aria-label="رمز الحضور">
        {Array.from({ length: 49 }).map((_, index) => (
          <i key={index} className={(index * 7) % 5 < 2 ? "dark" : ""} />
        ))}
      </div>

      <div className="two-actions">
        <button className="secondary-button" onClick={actions.addToCalendar} type="button">
          <CalendarDays size={17} aria-hidden="true" />
          التقويم
        </button>
        <button
          className="secondary-button"
          onClick={() => actions.openMaps(studio, "directions")}
          type="button"
        >
          <MapPin size={17} aria-hidden="true" />
          الاتجاهات
        </button>
      </div>

      <button className="primary-button full" onClick={() => onGo("bookings")}>
        <TicketCheck size={18} aria-hidden="true" />
        عرض حجوزاتي
      </button>
    </div>
  );
}

function BookingsScreen({
  actions,
  bookingTab,
  setBookingTab,
  onGo,
}: {
  actions: AuraActions;
  bookingTab: string;
  setBookingTab: (value: string) => void;
  onGo: (screen: Screen) => void;
}) {
  const bookingSession = actions.booking
    ? getSessionByIdFrom(actions.booking.sessionId, actions.availableSessions)
    : actions.selectedSession;
  const bookingStudio = getStudioByIdFrom(bookingSession.studioId, actions.availableStudios);
  const hasConfirmedBooking = actions.booking?.status === "confirmed";

  return (
    <div className="screen-content">
      <AppHeader
        title="حجوزاتي"
        subtitle="تابع المواعيد والحضور"
        action={<CalendarDays size={18} aria-hidden="true" />}
        onAction={() => actions.addToCalendar()}
      />

      <div className="segmented">
        {["القادمة", "السابقة"].map((item) => (
          <button
            className={bookingTab === item ? "selected" : ""}
            key={item}
            onClick={() => setBookingTab(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      {bookingTab === "القادمة" && hasConfirmedBooking ? (
        <div className="booking-card">
          <span className="status-pill">مؤكد</span>
          <h2>{bookingSession.title}</h2>
          <p>{bookingStudio.name} - {bookingSession.date} {bookingSession.time}</p>
          <div className="booking-actions">
            <button className="secondary-button" onClick={() => onGo("success")} type="button">
              <TicketCheck size={16} aria-hidden="true" />
              رمز الحضور
            </button>
            <button className="ghost-button" onClick={actions.cancelBooking} type="button">
              إلغاء
            </button>
          </div>
        </div>
      ) : bookingTab === "القادمة" ? (
        <div className="empty-state">
          <CalendarDays size={28} aria-hidden="true" />
          <strong>لا توجد حجوزات قادمة</strong>
          <span>احجز جلسة جديدة لتظهر هنا.</span>
        </div>
      ) : (
        <div className="empty-state">
          <CalendarDays size={28} aria-hidden="true" />
          <strong>{actions.booking?.status === "cancelled" ? "آخر حجز تم إلغاؤه" : "لا توجد حجوزات سابقة"}</strong>
          <span>
            {actions.booking?.status === "cancelled"
              ? `${bookingSession.title} - ${bookingStudio.name}`
              : "ستظهر الجلسات المكتملة هنا."}
          </span>
        </div>
      )}
    </div>
  );
}

function AccountScreen({ actions }: { actions: AuraActions }) {
  const rows = [
    { icon: <UserRound size={18} />, label: "الملف الشخصي" },
    { icon: <Heart size={18} />, label: "المفضلة" },
    { icon: <WalletCards size={18} />, label: "طرق الدفع" },
    { icon: <Bell size={18} />, label: "الإشعارات" },
    { icon: <MessageCircle size={18} />, label: "الدعم والمساعدة" },
    { icon: <Landmark size={18} />, label: "الشروط والخصوصية" },
  ];

  return (
    <div className="screen-content">
      <AppHeader
        title="حسابي"
        subtitle="حصة الدويغري"
        action={<CircleUserRound size={18} aria-hidden="true" />}
        onAction={() => actions.notify("بيانات الحساب محفوظة في البروتوتايب")}
      />

      <div className="profile-card">
        <div className="avatar">ح</div>
        <div>
          <strong>حصة الدويغري</strong>
          <span>+966 5X XXX 214</span>
        </div>
      </div>

      <div className="menu-list">
        {rows.map((row) => (
          <button
            className="menu-row"
            key={row.label}
            onClick={() => actions.notify(`${row.label} ستكون صفحة مستقلة لاحقا`)}
            type="button"
          >
            <span>
              {row.icon}
              {row.label}
            </span>
            <ChevronLeft size={17} aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}

function PlacesDataPanel({
  actions,
  compact,
}: {
  actions: AuraActions;
  compact?: boolean;
}) {
  const [draftKey, setDraftKey] = useState(actions.googleMapsKey);
  const isConnected = actions.placesStatus === "ready";
  const isLoading = actions.placesStatus === "loading";
  const needsKey = actions.placesStatus === "needs-key";

  return (
    <section className={compact ? "places-panel compact" : "places-panel"}>
      <div>
        <span className={isConnected ? "status-dot online" : "status-dot"} />
        <strong>{isConnected ? "Google Places متصل" : "بيانات الرياض"}</strong>
        <p>
          {isConnected
            ? `تم جلب ${actions.availableStudios.length} مركز من Google${actions.placesLastUpdated ? ` - ${actions.placesLastUpdated}` : ""}`
            : "يعرض Aura بيانات احتياطية إلى أن تضيف مفتاح Google Maps."}
        </p>
      </div>

      {needsKey && (
        <div className="places-key-row">
          <input
            aria-label="Google Maps API Key"
            onChange={(event) => setDraftKey(event.target.value)}
            placeholder="Google Maps API Key"
            type="password"
            value={draftKey}
          />
          <button
            className="secondary-button"
            onClick={() => actions.saveGoogleMapsKey(draftKey)}
            type="button"
          >
            ربط Google
          </button>
        </div>
      )}

      {actions.placesError && <small className="places-error">{actions.placesError}</small>}

      <div className="places-actions">
        <button
          className="secondary-button"
          disabled={isLoading}
          onClick={actions.refreshPlaces}
          type="button"
        >
          <Search size={16} aria-hidden="true" />
          {isLoading ? "جاري الجلب..." : "بحث في Google"}
        </button>
        {actions.googleMapsKey && (
          <button
            className="ghost-button"
            onClick={() => actions.saveGoogleMapsKey("")}
            type="button"
          >
            فصل المفتاح
          </button>
        )}
      </div>
      <small className="google-attribution">Powered by Google</small>
    </section>
  );
}

function GoogleMapPreview({ studio }: { studio: Studio }) {
  const query =
    studio.lat && studio.lng
      ? `${studio.lat},${studio.lng}`
      : studio.mapQuery || studio.address || studio.name;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div className="map-preview">
      <iframe
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
        title={`موقع ${studio.name} على Google Maps`}
      />
    </div>
  );
}

function AppHeader({
  title,
  subtitle,
  action,
  onAction,
}: {
  title: string;
  subtitle: string;
  action: ReactNode;
  onAction?: () => void;
}) {
  return (
    <header className="app-header">
      <div>
        <p>{subtitle}</p>
        <h2>{title}</h2>
      </div>
      <button
        className="icon-button"
        onClick={onAction}
        type="button"
        aria-label={title}
        title={title}
      >
        {action}
      </button>
    </header>
  );
}

function BottomNav({
  current,
  onGo,
}: {
  current: Screen;
  onGo: (screen: Screen) => void;
}) {
  const navItems: Array<{
    id: Screen;
    label: string;
    icon: ReactNode;
  }> = [
    { id: "home", label: "الرئيسية", icon: <Home size={18} /> },
    { id: "explore", label: "استكشاف", icon: <Search size={18} /> },
    { id: "bookings", label: "حجوزاتي", icon: <TicketCheck size={18} /> },
    { id: "account", label: "حسابي", icon: <UserRound size={18} /> },
  ];

  return (
    <nav className="bottom-nav" aria-label="التنقل الرئيسي">
      {navItems.map((item) => (
        <button
          className={current === item.id ? "active" : ""}
          key={item.id}
          onClick={() => onGo(item.id)}
          type="button"
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action: string;
  onAction?: () => void;
}) {
  return (
    <div className="section-title">
      <h3>{title}</h3>
      <button onClick={onAction} type="button">
        {action}
      </button>
    </div>
  );
}

function SessionCard({
  session,
  onSelect,
}: {
  session: Session;
  onSelect: (sessionId: string) => void;
}) {
  return (
    <button className="session-card" onClick={() => onSelect(session.id)} type="button">
      <div
        className="session-image"
        style={{ backgroundImage: `url(${session.image})` }}
        aria-hidden="true"
      />
      <div className="session-copy">
        <div className="session-topline">
          <span>{session.date}</span>
          <span>{session.seats} مقاعد</span>
        </div>
        <strong>{session.title}</strong>
        <p>{session.studio}</p>
        <div className="session-meta">
          <span>
            <Clock3 size={14} aria-hidden="true" />
            {session.time}
          </span>
          <span>{session.price} ر.س</span>
        </div>
      </div>
    </button>
  );
}

function StudioResultCard({
  studio,
  onSelect,
}: {
  studio: Studio;
  onSelect: (studioId: string) => void;
}) {
  return (
    <button
      className="studio-result-card"
      onClick={() => onSelect(studio.id)}
      type="button"
    >
      <div
        className="studio-result-image"
        style={{ backgroundImage: `url(${studio.image})` }}
        aria-hidden="true"
      />
      <div className="studio-result-copy">
        <div className="studio-line">
          <strong>{studio.name}</strong>
          <span>
            <Star size={13} fill="currentColor" aria-hidden="true" />{" "}
            {studio.rating}
          </span>
        </div>
        <p>{studio.tags}</p>
        <div className="studio-result-meta">
          <span>
            <MapPin size={14} aria-hidden="true" />
            {studio.area} - {studio.distance}
          </span>
          <b>{studio.price}</b>
        </div>
      </div>
    </button>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="filter-block">
      <span>{label}</span>
      <div className="segmented">
        {options.map((option) => (
          <button
            className={value === option ? "selected" : ""}
            key={option}
            onClick={() => onChange(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="mini-stat">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function PriceLine({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className={strong ? "price-line total" : "price-line"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function buildScheduleDays() {
  const weekdayFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
    weekday: "short",
  });
  const dayFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
    day: "2-digit",
  });
  const monthFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
    month: "long",
  });

  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    return {
      weekday: weekdayFormatter.format(date),
      date: dayFormatter.format(date),
      month: monthFormatter.format(date),
    };
  });
}

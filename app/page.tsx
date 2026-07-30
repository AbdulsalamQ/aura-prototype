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
import { useMemo, useState } from "react";

type Screen =
  | "login"
  | "home"
  | "explore"
  | "studio"
  | "session"
  | "checkout"
  | "payment"
  | "success"
  | "bookings"
  | "account";

type Session = {
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
};

const screens: Array<{ id: Screen; label: string; hint: string }> = [
  { id: "login", label: "الدخول", hint: "رقم الجوال والتحقق" },
  { id: "home", label: "الرئيسية", hint: "جلسات اليوم والمراكز القريبة" },
  { id: "explore", label: "استكشاف", hint: "بحث وفلاتر بسيطة" },
  { id: "studio", label: "المركز", hint: "تفاصيل المركز والجدول" },
  { id: "session", label: "الجلسة", hint: "وقت، مدرب، مستوى، سياسة" },
  { id: "checkout", label: "الملخص", hint: "مراجعة قبل الدفع" },
  { id: "payment", label: "الدفع", hint: "Apple Pay أو بطاقة" },
  { id: "success", label: "التأكيد", hint: "رقم الحجز ورمز الحضور" },
  { id: "bookings", label: "حجوزاتي", hint: "القادمة والسابقة" },
  { id: "account", label: "حسابي", hint: "الملف والدعم والخصوصية" },
];

const sessions: Session[] = [
  {
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
  },
  {
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
  },
  {
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
  },
];

const studioSessions = [
  sessions[0],
  {
    ...sessions[2],
    title: "Core Strength",
    time: "5:45 مساء",
    price: 105,
    seats: 2,
    trainer: "نواف",
  },
  {
    ...sessions[1],
    title: "Slow Flow Yoga",
    time: "9:00 مساء",
    price: 90,
    seats: 8,
    trainer: "دانا",
  },
];

const categories = ["بيلاتس", "يوغا", "جلسات خاصة", "جلسات جماعية"];

export default function AuraPrototype() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activity, setActivity] = useState("الكل");
  const [period, setPeriod] = useState("اليوم");
  const [accepted, setAccepted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [bookingTab, setBookingTab] = useState("القادمة");
  const selectedSession = sessions[0];

  const currentScreen = useMemo(
    () => screens.find((item) => item.id === screen) ?? screens[1],
    [screen],
  );

  function go(nextScreen: Screen) {
    setProcessing(false);
    setScreen(nextScreen);
  }

  function payNow() {
    setProcessing(true);
    window.setTimeout(() => {
      setProcessing(false);
      setScreen("success");
    }, 800);
  }

  return (
    <main className="aura-stage" dir="rtl">
      <section className="prototype-panel" aria-label="لوحة تنقل نموذج Aura">
        <div className="brand-row">
          <span className="brand-mark">A</span>
          <div>
            <p className="eyebrow">Aura prototype</p>
            <h1>Aura</h1>
          </div>
        </div>

        <p className="prototype-lead">
          نموذج تفاعلي لتطبيق حجوزات مراكز البيلاتس واليوغا. التصميم محايد
          للجميع، حديث، ويركز على الحجز السريع من الاكتشاف إلى تأكيد الموعد.
        </p>

        <div className="screen-list" aria-label="شاشات النموذج">
          {screens.map((item) => (
            <button
              className={`screen-jump ${screen === item.id ? "active" : ""}`}
              key={item.id}
              onClick={() => go(item.id)}
              type="button"
            >
              <span>{item.label}</span>
              <small>{item.hint}</small>
            </button>
          ))}
        </div>

        <div className="flow-card">
          <TicketCheck size={18} aria-hidden="true" />
          <div>
            <strong>مسار التجربة</strong>
            <p>الرئيسية، تفاصيل الجلسة، ملخص الحجز، الدفع، ثم رمز الحضور.</p>
          </div>
        </div>
      </section>

      <section className="phone-wrap" aria-label="معاينة تطبيق Aura">
        <div className="phone-shell">
          <div className="phone-status">
            <span>9:41</span>
            <span>Aura</span>
          </div>

          <div className="app-screen">
            {screen === "login" && <LoginScreen onStart={() => go("home")} />}
            {screen === "home" && <HomeScreen onGo={go} />}
            {screen === "explore" && (
              <ExploreScreen
                activity={activity}
                period={period}
                setActivity={setActivity}
                setPeriod={setPeriod}
                onGo={go}
              />
            )}
            {screen === "studio" && <StudioScreen onGo={go} />}
            {screen === "session" && (
              <SessionScreen session={selectedSession} onGo={go} />
            )}
            {screen === "checkout" && (
              <CheckoutScreen
                accepted={accepted}
                setAccepted={setAccepted}
                session={selectedSession}
                onGo={go}
              />
            )}
            {screen === "payment" && (
              <PaymentScreen processing={processing} payNow={payNow} />
            )}
            {screen === "success" && (
              <SuccessScreen session={selectedSession} onGo={go} />
            )}
            {screen === "bookings" && (
              <BookingsScreen
                bookingTab={bookingTab}
                setBookingTab={setBookingTab}
                onGo={go}
              />
            )}
            {screen === "account" && <AccountScreen />}
          </div>

          <BottomNav current={screen} onGo={go} />
        </div>

        <div className="screen-caption">
          <strong>{currentScreen.label}</strong>
          <span>{currentScreen.hint}</span>
        </div>
      </section>
    </main>
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

function HomeScreen({ onGo }: { onGo: (screen: Screen) => void }) {
  return (
    <div className="screen-content">
      <AppHeader
        title="مساء هادئ"
        subtitle="الرياض، حي العليا"
        action={<Bell size={18} aria-hidden="true" />}
      />

      <button className="search-bar" onClick={() => onGo("explore")} type="button">
        <Search size={18} aria-hidden="true" />
        <span>ابحث عن مركز أو جلسة</span>
        <SlidersHorizontal size={18} aria-hidden="true" />
      </button>

      <div className="metric-grid">
        <InfoTile value="42" label="جلسة متاحة اليوم" />
        <InfoTile value="18" label="مركز قريب" />
      </div>

      <SectionTitle title="اختر النشاط" action="عرض الكل" />
      <div className="chip-row">
        {categories.map((category, index) => (
          <button className={index === 0 ? "chip active" : "chip"} key={category}>
            {category}
          </button>
        ))}
      </div>

      <SectionTitle title="جلسات قريبة" action="استكشاف" />
      <div className="session-stack">
        {sessions.slice(0, 2).map((session) => (
          <SessionCard key={session.title} session={session} onGo={onGo} />
        ))}
      </div>

      <SectionTitle title="مراكز مقترحة" action="المزيد" />
      <button className="studio-card" onClick={() => onGo("studio")} type="button">
        <div className="studio-thumb" aria-hidden="true" />
        <div>
          <div className="studio-line">
            <strong>NOVA Movement</strong>
            <span>
              <Star size={13} fill="currentColor" aria-hidden="true" /> 4.8
            </span>
          </div>
          <p>بيلاتس، يوغا، جلسات خاصة</p>
          <small>العليا - يبدأ من 80 ر.س</small>
        </div>
      </button>
    </div>
  );
}

function ExploreScreen({
  activity,
  period,
  setActivity,
  setPeriod,
  onGo,
}: {
  activity: string;
  period: string;
  setActivity: (value: string) => void;
  setPeriod: (value: string) => void;
  onGo: (screen: Screen) => void;
}) {
  return (
    <div className="screen-content">
      <AppHeader
        title="استكشاف"
        subtitle="ابحث حسب النشاط، الوقت، أو السعر"
        action={<SlidersHorizontal size={18} aria-hidden="true" />}
      />

      <div className="input-card">
        <Search size={18} aria-hidden="true" />
        <input aria-label="بحث" placeholder="Pilates، Yoga، اسم مركز..." />
      </div>

      <FilterGroup
        label="النشاط"
        value={activity}
        options={["الكل", "بيلاتس", "يوغا"]}
        onChange={setActivity}
      />
      <FilterGroup
        label="اليوم"
        value={period}
        options={["اليوم", "غدا", "هذا الأسبوع"]}
        onChange={setPeriod}
      />

      <div className="result-header">
        <strong>24 نتيجة</strong>
        <span>مرتبة حسب الأقرب</span>
      </div>

      <div className="session-stack">
        {sessions.map((session) => (
          <SessionCard key={session.title} session={session} onGo={onGo} />
        ))}
      </div>
    </div>
  );
}

function StudioScreen({ onGo }: { onGo: (screen: Screen) => void }) {
  return (
    <div className="screen-content studio-screen">
      <div className="studio-cover">
        <button
          className="icon-button back"
          onClick={() => onGo("home")}
          type="button"
          aria-label="رجوع"
          title="رجوع"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          className="icon-button"
          type="button"
          aria-label="إضافة للمفضلة"
          title="إضافة للمفضلة"
        >
          <Heart size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="studio-info">
        <div>
          <h2>NOVA Movement</h2>
          <p>
            <MapPin size={15} aria-hidden="true" />
            العليا - 2.4 كم
          </p>
        </div>
        <span className="rating-badge">
          <Star size={14} fill="currentColor" aria-hidden="true" /> 4.8
        </span>
      </div>

      <p className="studio-copy">
        مركز بوتيك للحركة الواعية، يقدم جلسات بيلاتس ويوغا بمستويات مختلفة
        ومساحات تدريب محدودة العدد.
      </p>

      <div className="facility-row" aria-label="المرافق">
        <span>مواقف</span>
        <span>غرف تبديل</span>
        <span>مناشف</span>
      </div>

      <SectionTitle title="الجلسات القادمة" action="الأسبوع" />
      <div className="time-list">
        {studioSessions.map((session) => (
          <button
            className="time-card"
            key={`${session.title}-${session.time}`}
            onClick={() => onGo("session")}
            type="button"
          >
            <div>
              <strong>{session.title}</strong>
              <span>
                {session.trainer} - {session.level}
              </span>
            </div>
            <div className="time-meta">
              <b>{session.time}</b>
              <small>{session.seats} مقاعد</small>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SessionScreen({
  session,
  onGo,
}: {
  session: Session;
  onGo: (screen: Screen) => void;
}) {
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
          <span className="kicker">جلسة جماعية</span>
          <h2>{session.title}</h2>
          <p>{session.studio}</p>
        </div>
        <strong>{session.price} ر.س</strong>
      </div>

      <div className="detail-grid">
        <MiniStat icon={<CalendarDays size={16} />} label={session.date} />
        <MiniStat icon={<Clock3 size={16} />} label={session.time} />
        <MiniStat icon={<Dumbbell size={16} />} label={session.level} />
        <MiniStat icon={<UserRound size={16} />} label={session.trainer} />
      </div>

      <section className="plain-section">
        <h3>عن الجلسة</h3>
        <p>
          تدريب مركز على القوة، التوازن، والتنفس. مناسب لمن لديه خبرة بسيطة
          ويريد جلسة دقيقة بدون ازدحام.
        </p>
      </section>

      <section className="policy-box">
        <ShieldCheck size={18} aria-hidden="true" />
        <div>
          <strong>سياسة الإلغاء</strong>
          <p>إلغاء مجاني حتى 6 ساعات قبل الموعد. بعد ذلك قد يتم احتساب الرسوم.</p>
        </div>
      </section>

      <button className="primary-button sticky" onClick={() => onGo("checkout")}>
        <TicketCheck size={18} aria-hidden="true" />
        احجز الآن
      </button>
    </div>
  );
}

function CheckoutScreen({
  session,
  accepted,
  setAccepted,
  onGo,
}: {
  session: Session;
  accepted: boolean;
  setAccepted: (value: boolean) => void;
  onGo: (screen: Screen) => void;
}) {
  const vat = Math.round(session.price * 0.15);
  const total = session.price + vat;

  return (
    <div className="screen-content">
      <AppHeader
        title="ملخص الحجز"
        subtitle="راجع التفاصيل قبل الدفع"
        action={<TicketCheck size={18} aria-hidden="true" />}
      />

      <div className="booking-summary">
        <span className="kicker">NOVA Movement</span>
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
          <span>{session.area}، الرياض</span>
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
  processing,
  payNow,
}: {
  processing: boolean;
  payNow: () => void;
}) {
  return (
    <div className="screen-content payment-screen">
      <AppHeader
        title="الدفع"
        subtitle="اختر طريقة الدفع المناسبة"
        action={<WalletCards size={18} aria-hidden="true" />}
      />

      <button className="pay-option selected" type="button">
        <span>
          <WalletCards size={18} aria-hidden="true" />
          Apple Pay
        </span>
        <Check size={18} aria-hidden="true" />
      </button>

      <button className="pay-option" type="button">
        <span>
          <CreditCard size={18} aria-hidden="true" />
          مدى أو بطاقة بنكية
        </span>
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      <div className="card-preview">
        <span>Aura Pay</span>
        <strong>•••• 4821</strong>
        <small>إجمالي العملية 138 ر.س</small>
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
  session,
  onGo,
}: {
  session: Session;
  onGo: (screen: Screen) => void;
}) {
  return (
    <div className="screen-content success-screen">
      <div className="success-mark">
        <Check size={34} aria-hidden="true" />
      </div>
      <h2>تم تأكيد الحجز</h2>
      <p>رقم الحجز AUR-2481</p>

      <div className="confirmed-card">
        <strong>{session.title}</strong>
        <span>
          {session.date} - {session.time}
        </span>
        <span>{session.studio}، العليا</span>
      </div>

      <div className="qr-box" aria-label="رمز الحضور">
        {Array.from({ length: 49 }).map((_, index) => (
          <i key={index} className={(index * 7) % 5 < 2 ? "dark" : ""} />
        ))}
      </div>

      <div className="two-actions">
        <button className="secondary-button" type="button">
          <CalendarDays size={17} aria-hidden="true" />
          التقويم
        </button>
        <button className="secondary-button" type="button">
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
  bookingTab,
  setBookingTab,
  onGo,
}: {
  bookingTab: string;
  setBookingTab: (value: string) => void;
  onGo: (screen: Screen) => void;
}) {
  return (
    <div className="screen-content">
      <AppHeader
        title="حجوزاتي"
        subtitle="تابع المواعيد والحضور"
        action={<CalendarDays size={18} aria-hidden="true" />}
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

      {bookingTab === "القادمة" ? (
        <div className="booking-card">
          <span className="status-pill">مؤكد</span>
          <h2>Pilates Reformer</h2>
          <p>NOVA Movement - اليوم 7:00 مساء</p>
          <div className="booking-actions">
            <button className="secondary-button" onClick={() => onGo("success")}>
              <TicketCheck size={16} aria-hidden="true" />
              رمز الحضور
            </button>
            <button className="ghost-button" type="button">
              إلغاء
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <CalendarDays size={28} aria-hidden="true" />
          <strong>لا توجد حجوزات سابقة</strong>
          <span>ستظهر الجلسات المكتملة هنا.</span>
        </div>
      )}
    </div>
  );
}

function AccountScreen() {
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
        subtitle="محمد العبدالله"
        action={<CircleUserRound size={18} aria-hidden="true" />}
      />

      <div className="profile-card">
        <div className="avatar">م</div>
        <div>
          <strong>محمد العبدالله</strong>
          <span>+966 5X XXX 214</span>
        </div>
      </div>

      <div className="menu-list">
        {rows.map((row) => (
          <button className="menu-row" key={row.label} type="button">
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

function AppHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action: ReactNode;
}) {
  return (
    <header className="app-header">
      <div>
        <p>{subtitle}</p>
        <h2>{title}</h2>
      </div>
      <button className="icon-button" type="button" aria-label={title} title={title}>
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

function SectionTitle({ title, action }: { title: string; action: string }) {
  return (
    <div className="section-title">
      <h3>{title}</h3>
      <button type="button">{action}</button>
    </div>
  );
}

function InfoTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="info-tile">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function SessionCard({
  session,
  onGo,
}: {
  session: Session;
  onGo: (screen: Screen) => void;
}) {
  return (
    <button className="session-card" onClick={() => onGo("session")} type="button">
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

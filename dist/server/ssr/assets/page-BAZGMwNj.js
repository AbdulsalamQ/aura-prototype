import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/lucide-react/dist/esm/context.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LucideContext = (0, import_react.createContext)({});
var useLucideContext = () => (0, import_react.useContext)(LucideContext);
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
	return (0, import_react.createElement)("svg", {
		ref,
		...defaultAttributes,
		width: size ?? contextSize ?? defaultAttributes.width,
		height: size ?? contextSize ?? defaultAttributes.height,
		stroke: color ?? contextColor,
		strokeWidth: calculatedStrokeWidth,
		className: mergeClasses("lucide", contextClass, className),
		...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
		...rest
	}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Bell = createLucideIcon("bell", [["path", {
	d: "M10.268 21a2 2 0 0 0 3.464 0",
	key: "vwvbt9"
}], ["path", {
	d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	key: "11g9vi"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CalendarDays = createLucideIcon("calendar-days", [
	["path", {
		d: "M8 2v3",
		key: "1ioesn"
	}],
	["path", {
		d: "M16 2v3",
		key: "otl347"
	}],
	["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}],
	["path", {
		d: "M3 9h18",
		key: "1pudct"
	}],
	["path", {
		d: "M8 13h.01",
		key: "1sbv64"
	}],
	["path", {
		d: "M12 13h.01",
		key: "y0uutt"
	}],
	["path", {
		d: "M16 13h.01",
		key: "wip0gl"
	}],
	["path", {
		d: "M8 17h.01",
		key: "p3bg7i"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}],
	["path", {
		d: "M16 17h.01",
		key: "ql8jdd"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Check = createLucideIcon("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronLeft = createLucideIcon("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleUserRound = createLucideIcon("circle-user-round", [
	["path", {
		d: "M17.925 20.056a6 6 0 0 0-11.851.001",
		key: "z69sun"
	}],
	["circle", {
		cx: "12",
		cy: "11",
		r: "4",
		key: "1gt34v"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Clock3 = createLucideIcon("clock-3", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M12 6v6h4",
	key: "135r8i"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CreditCard = createLucideIcon("credit-card", [["rect", {
	width: "20",
	height: "14",
	x: "2",
	y: "5",
	rx: "2",
	key: "ynyp8z"
}], ["line", {
	x1: "2",
	x2: "22",
	y1: "10",
	y2: "10",
	key: "1b3vmo"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Dumbbell = createLucideIcon("dumbbell", [
	["path", {
		d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
		key: "9m4mmf"
	}],
	["path", {
		d: "m2.5 21.5 1.4-1.4",
		key: "17g3f0"
	}],
	["path", {
		d: "m20.1 3.9 1.4-1.4",
		key: "1qn309"
	}],
	["path", {
		d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
		key: "1t2c92"
	}],
	["path", {
		d: "m9.6 14.4 4.8-4.8",
		key: "6umqxw"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Heart = createLucideIcon("heart", [["path", {
	d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
	key: "mvr1a0"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var House = createLucideIcon("house", [["path", {
	d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
	key: "5wwlr5"
}], ["path", {
	d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	key: "r6nss1"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Landmark = createLucideIcon("landmark", [
	["path", {
		d: "M10 18v-7",
		key: "wt116b"
	}],
	["path", {
		d: "M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z",
		key: "yxxwt6"
	}],
	["path", {
		d: "M14 18v-7",
		key: "vav6t3"
	}],
	["path", {
		d: "M18 18v-7",
		key: "aexdmj"
	}],
	["path", {
		d: "M3 22h18",
		key: "8prr45"
	}],
	["path", {
		d: "M6 18v-7",
		key: "1ivflk"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MapPin = createLucideIcon("map-pin", [["path", {
	d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
	key: "1r0f0z"
}], ["circle", {
	cx: "12",
	cy: "10",
	r: "3",
	key: "ilqhr7"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageCircle = createLucideIcon("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldCheck = createLucideIcon("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SlidersHorizontal = createLucideIcon("sliders-horizontal", [
	["path", {
		d: "M10 5H3",
		key: "1qgfaw"
	}],
	["path", {
		d: "M12 19H3",
		key: "yhmn1j"
	}],
	["path", {
		d: "M14 3v4",
		key: "1sua03"
	}],
	["path", {
		d: "M16 17v4",
		key: "1q0r14"
	}],
	["path", {
		d: "M21 12h-9",
		key: "1o4lsq"
	}],
	["path", {
		d: "M21 19h-5",
		key: "1rlt1p"
	}],
	["path", {
		d: "M21 5h-7",
		key: "1oszz2"
	}],
	["path", {
		d: "M8 10v4",
		key: "tgpxqk"
	}],
	["path", {
		d: "M8 12H3",
		key: "a7s4jb"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Star = createLucideIcon("star", [["path", {
	d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
	key: "r04s7s"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TicketCheck = createLucideIcon("ticket-check", [["path", {
	d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
	key: "qn84l0"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserRound = createLucideIcon("user-round", [["circle", {
	cx: "12",
	cy: "8",
	r: "5",
	key: "1hypcn"
}], ["path", {
	d: "M20 21a8 8 0 0 0-16 0",
	key: "rfgkzh"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var WalletCards = createLucideIcon("wallet-cards", [
	["path", {
		d: "M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21",
		key: "1vwh6y"
	}],
	["path", {
		d: "M3 7h18",
		key: "1uiuf2"
	}],
	["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}]
]);
//#endregion
//#region app/page.tsx
var import_jsx_runtime = require_jsx_runtime();
var screens = [
	{
		id: "login",
		label: "الدخول",
		hint: "رقم الجوال والتحقق"
	},
	{
		id: "home",
		label: "الرئيسية",
		hint: "حجزك القادم واقتراحات سريعة"
	},
	{
		id: "explore",
		label: "استكشاف",
		hint: "بحث وفلاتر بسيطة"
	},
	{
		id: "studio",
		label: "المركز",
		hint: "ملف المركز والتفاصيل"
	},
	{
		id: "schedule",
		label: "المواعيد",
		hint: "اختيار اليوم والوقت"
	},
	{
		id: "session",
		label: "الجلسة",
		hint: "وقت، مدرب، مستوى، سياسة"
	},
	{
		id: "checkout",
		label: "الملخص",
		hint: "مراجعة قبل الدفع"
	},
	{
		id: "payment",
		label: "الدفع",
		hint: "Apple Pay أو بطاقة"
	},
	{
		id: "success",
		label: "التأكيد",
		hint: "رقم الحجز ورمز الحضور"
	},
	{
		id: "bookings",
		label: "حجوزاتي",
		hint: "القادمة والسابقة"
	},
	{
		id: "account",
		label: "حسابي",
		hint: "الملف والدعم والخصوصية"
	}
];
var sessions = [
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
		image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80"
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
		image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80"
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
		image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1000&q=80"
	}
];
sessions[0], { ...sessions[2] }, { ...sessions[1] };
var studios = [
	{
		name: "NOVA Movement",
		rating: "4.8",
		area: "العليا",
		distance: "2.4 كم",
		tags: "بيلاتس، يوغا، جلسات خاصة",
		price: "يبدأ من 80 ر.س"
	},
	{
		name: "Flow House",
		rating: "4.7",
		area: "الملقا",
		distance: "4.1 كم",
		tags: "يوغا، Vinyasa، جلسات جماعية",
		price: "يبدأ من 90 ر.س"
	},
	{
		name: "Balance Studio",
		rating: "4.6",
		area: "النخيل",
		distance: "5.8 كم",
		tags: "Mat Pilates، بيلاتس للمبتدئين",
		price: "يبدأ من 75 ر.س"
	}
];
function AuraPrototype() {
	const [screen, setScreen] = (0, import_react.useState)("home");
	const [activity, setActivity] = (0, import_react.useState)("الكل");
	const [accepted, setAccepted] = (0, import_react.useState)(false);
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const [bookingTab, setBookingTab] = (0, import_react.useState)("القادمة");
	const selectedSession = sessions[0];
	const currentScreen = (0, import_react.useMemo)(() => screens.find((item) => item.id === screen) ?? screens[1], [screen]);
	function go(nextScreen) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "aura-stage",
		dir: "rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "prototype-panel",
			"aria-label": "لوحة تنقل نموذج Aura",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brand-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-mark",
						children: "A"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Aura prototype"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Aura" })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "prototype-lead",
					children: "نموذج تفاعلي لتطبيق حجوزات مراكز البيلاتس واليوغا. التصميم محايد للجميع، حديث، ويركز على الحجز السريع من الاكتشاف إلى تأكيد الموعد."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "screen-list",
					"aria-label": "شاشات النموذج",
					children: screens.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `screen-jump ${screen === item.id ? "active" : ""}`,
						onClick: () => go(item.id),
						type: "button",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.hint })]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCheck, {
						size: 18,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "مسار التجربة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "الرئيسية، تفاصيل الجلسة، ملخص الحجز، الدفع، ثم رمز الحضور." })] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "phone-wrap",
			"aria-label": "معاينة تطبيق Aura",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "phone-shell",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "phone-status",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "9:41" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Aura" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "app-screen",
						children: [
							screen === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginScreen, { onStart: () => go("home") }),
							screen === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScreen, { onGo: go }),
							screen === "explore" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExploreScreen, {
								activity,
								setActivity,
								onGo: go
							}),
							screen === "studio" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioScreen, { onGo: go }),
							screen === "schedule" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleScreen, { onGo: go }),
							screen === "session" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionScreen, {
								session: selectedSession,
								onGo: go
							}),
							screen === "checkout" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutScreen, {
								accepted,
								setAccepted,
								session: selectedSession,
								onGo: go
							}),
							screen === "payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentScreen, {
								processing,
								payNow
							}),
							screen === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessScreen, {
								session: selectedSession,
								onGo: go
							}),
							screen === "bookings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingsScreen, {
								bookingTab,
								setBookingTab,
								onGo: go
							}),
							screen === "account" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountScreen, {})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {
						current: screen,
						onGo: go
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "screen-caption",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentScreen.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currentScreen.hint })]
			})]
		})]
	});
}
function LoginScreen({ onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen-content login-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hero-photo login-photo",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "brand-mark large",
					children: "A"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "ابدأ مع Aura" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "احجز جلسات البيلاتس واليوغا من مراكز قريبة، وتابع حجزك من مكان واحد." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "field-label",
					htmlFor: "phone",
					children: "رقم الجوال"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "phone-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+966" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "phone",
						inputMode: "tel",
						placeholder: "5X XXX XXXX"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "terms-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						defaultChecked: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "أوافق على الشروط وسياسة الخصوصية" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button full",
					onClick: onStart,
					type: "button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						size: 18,
						"aria-hidden": "true"
					}), "متابعة"]
				})
			]
		})]
	});
}
function HomeScreen({ onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
				title: "مساءك هادئ",
				subtitle: "الرياض، حي العليا",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
					size: 18,
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "home-next-card",
				onClick: () => onGo("bookings"),
				type: "button",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "حجزك القادم" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pilates Reformer" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOVA Movement - اليوم 7:00 مساء" })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
					size: 22,
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "ابدأ بسرعة",
				action: "بحث متقدم",
				onAction: () => onGo("explore")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "quick-intent-grid",
				children: [
					{
						label: "اليوم",
						hint: "جلسات قريبة",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 17 })
					},
					{
						label: "قريب مني",
						hint: "حسب الموقع",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 17 })
					},
					{
						label: "مناسب للجميع",
						hint: "مستوى مريح",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { size: 17 })
					},
					{
						label: "الأكثر حجزا",
						hint: "اختيارات شائعة",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 17 })
					}
				].map((intent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "quick-intent-card",
					onClick: () => onGo("explore"),
					type: "button",
					children: [
						intent.icon,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: intent.label }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: intent.hint })
					]
				}, intent.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "مقترح لك اليوم",
				action: "كل النتائج",
				onAction: () => onGo("explore")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "session-stack",
				children: sessions.slice(0, 2).map((session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCard, {
					session,
					onGo
				}, session.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "مراكز قريبة منك",
				action: "استكشف",
				onAction: () => onGo("explore")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "studio-card",
				onClick: () => onGo("studio"),
				type: "button",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "studio-thumb",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "studio-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "NOVA Movement" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							size: 13,
							fill: "currentColor",
							"aria-hidden": "true"
						}), " 4.8"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "بيلاتس، يوغا، جلسات خاصة" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "العليا - يبدأ من 80 ر.س" })
				] })]
			})
		]
	});
}
function ExploreScreen({ activity, setActivity, onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
				title: "استكشاف",
				subtitle: "ابحث حسب النشاط، الوقت، أو السعر",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
					size: 18,
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "input-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					size: 18,
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"aria-label": "بحث",
					placeholder: "Pilates، Yoga، اسم مركز..."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
				label: "النشاط",
				value: activity,
				options: [
					"الكل",
					"بيلاتس",
					"يوغا"
				],
				onChange: setActivity
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "result-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "8 مراكز" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الأقرب أولاً" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "studio-result-list",
				children: studios.map((studio) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioResultCard, {
					studio,
					onGo
				}, studio.name))
			})
		]
	});
}
function StudioScreen({ onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen-content studio-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "studio-cover",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "icon-button back",
					onClick: () => onGo("home"),
					type: "button",
					"aria-label": "رجوع",
					title: "رجوع",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						size: 18,
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "icon-button",
					type: "button",
					"aria-label": "إضافة للمفضلة",
					title: "إضافة للمفضلة",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
						size: 18,
						"aria-hidden": "true"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "studio-info",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "NOVA Movement" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
					size: 15,
					"aria-hidden": "true"
				}), "العليا - 2.4 كم"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rating-badge",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
						size: 14,
						fill: "currentColor",
						"aria-hidden": "true"
					}), " 4.8"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "studio-copy",
				children: "مركز بوتيك للحركة الواعية، يقدم جلسات بيلاتس ويوغا بمستويات مختلفة ومساحات تدريب محدودة العدد."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "facility-row",
				"aria-label": "المرافق",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مواقف" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "غرف تبديل" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مناشف" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "معلومات الحجز",
				action: "حجز فوري"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "studio-profile-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 16 }),
						label: "7:00 ص - 10:00 م"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { size: 16 }),
						label: "بيلاتس ويوغا"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 16 }),
						label: "6 مدربين"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCheck, { size: 16 }),
						label: "حجز فوري"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "plain-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "عن المركز" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ملف المركز يجمع المعلومات الأساسية قبل الحجز: نوع الجلسات، مستوى التجربة، المرافق، والموقع. اختَر الحجز عندما تكون مستعدًا لاختيار اليوم والوقت." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "primary-button sticky",
				onClick: () => onGo("schedule"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
					size: 18,
					"aria-hidden": "true"
				}), "احجز موعد"]
			})
		]
	});
}
function ScheduleScreen({ onGo }) {
	const [selectedDay, setSelectedDay] = (0, import_react.useState)(0);
	const [selectedTime, setSelectedTime] = (0, import_react.useState)("04:00 م");
	const days = buildScheduleDays();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen-content schedule-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
				title: "تفاصيل الحجز",
				subtitle: "NOVA Movement",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
					size: 18,
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "schedule-studio-summary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pilates Reformer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "جلسة جماعية - 50 دقيقة" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "120 ر.س" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "schedule-prompt",
				children: "متى وقت حجزك؟"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "day-strip",
				"aria-label": "اختيار اليوم",
				children: days.map((day, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: selectedDay === index ? "day-pill selected" : "day-pill",
					onClick: () => setSelectedDay(index),
					type: "button",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: day.weekday }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: day.date }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: day.month })
					]
				}, `${day.weekday}-${day.date}-${day.month}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "time-section-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "الأوقات المتوفرة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
						size: 15,
						"aria-hidden": "true"
					}),
					"خلال ",
					days[selectedDay].weekday
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "time-slot-grid",
				children: [
					{
						value: "04:00 م",
						status: "available"
					},
					{
						value: "04:30 م",
						status: "available"
					},
					{
						value: "05:00 م",
						status: "available"
					},
					{
						value: "05:30 م",
						status: "available"
					},
					{
						value: "06:00 م",
						status: "booked"
					},
					{
						value: "06:30 م",
						status: "available"
					},
					{
						value: "07:00 م",
						status: "available"
					},
					{
						value: "07:30 م",
						status: "available"
					},
					{
						value: "08:00 م",
						status: "booked"
					},
					{
						value: "08:30 م",
						status: "available"
					},
					{
						value: "09:00 م",
						status: "available"
					},
					{
						value: "09:30 م",
						status: "booked"
					},
					{
						value: "10:00 م",
						status: "available"
					},
					{
						value: "10:30 م",
						status: "available"
					},
					{
						value: "11:00 م",
						status: "available"
					}
				].map((time) => {
					const isBooked = time.status === "booked";
					const isSelected = selectedTime === time.value && !isBooked;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `time-slot ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""}`,
						disabled: isBooked,
						onClick: () => setSelectedTime(time.value),
						type: "button",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: time.value }), isBooked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "محجوز" })]
					}, time.value);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "primary-button sticky",
				onClick: () => onGo("checkout"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCheck, {
					size: 18,
					"aria-hidden": "true"
				}), "متابعة الحجز"]
			})
		]
	});
}
function SessionScreen({ session, onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen-content session-detail",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "detail-image",
				style: { backgroundImage: `url(${session.image})` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "icon-button back",
					onClick: () => onGo("studio"),
					type: "button",
					"aria-label": "رجوع",
					title: "رجوع",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						size: 18,
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "image-badge",
					children: [session.seats, " مقاعد متبقية"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "detail-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "kicker",
						children: "جلسة جماعية"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: session.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: session.studio })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [session.price, " ر.س"] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "detail-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 16 }),
						label: session.date
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 16 }),
						label: session.time
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { size: 16 }),
						label: session.level
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 16 }),
						label: session.trainer
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "plain-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "عن الجلسة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "تدريب مركز على القوة، التوازن، والتنفس. مناسب لمن لديه خبرة بسيطة ويريد جلسة دقيقة بدون ازدحام." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "policy-box",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
					size: 18,
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "سياسة الإلغاء" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "إلغاء مجاني حتى 6 ساعات قبل الموعد. بعد ذلك قد يتم احتساب الرسوم." })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "primary-button sticky",
				onClick: () => onGo("checkout"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCheck, {
					size: 18,
					"aria-hidden": "true"
				}), "احجز الآن"]
			})
		]
	});
}
function CheckoutScreen({ session, accepted, setAccepted, onGo }) {
	const vat = Math.round(session.price * .15);
	const total = session.price + vat;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
				title: "ملخص الحجز",
				subtitle: "راجع التفاصيل قبل الدفع",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCheck, {
					size: 18,
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "booking-summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "kicker",
						children: "NOVA Movement"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: session.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
							size: 16,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							session.date,
							" - ",
							session.time
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
							size: 16,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["المدرب: ", session.trainer] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							size: 16,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [session.area, "، الرياض"] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "price-box",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceLine, {
						label: "سعر الجلسة",
						value: `${session.price} ر.س`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceLine, {
						label: "ضريبة القيمة المضافة",
						value: `${vat} ر.س`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceLine, {
						label: "الإجمالي",
						value: `${total} ر.س`,
						strong: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "terms-row boxed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					checked: accepted,
					onChange: (event) => setAccepted(event.target.checked),
					type: "checkbox"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "أوافق على سياسة الإلغاء وشروط الحضور" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "primary-button full",
				disabled: !accepted,
				onClick: () => onGo("payment"),
				type: "button",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
					size: 18,
					"aria-hidden": "true"
				}), "متابعة للدفع"]
			})
		]
	});
}
function PaymentScreen({ processing, payNow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen-content payment-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
				title: "الدفع",
				subtitle: "اختر طريقة الدفع المناسبة",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletCards, {
					size: 18,
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "pay-option selected",
				type: "button",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletCards, {
					size: 18,
					"aria-hidden": "true"
				}), "Apple Pay"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					size: 18,
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "pay-option",
				type: "button",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
					size: 18,
					"aria-hidden": "true"
				}), "مدى أو بطاقة بنكية"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					size: 18,
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-preview",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Aura Pay" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "•••• 4821" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "إجمالي العملية 138 ر.س" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "primary-button full",
				disabled: processing,
				onClick: payNow,
				type: "button",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
					size: 18,
					"aria-hidden": "true"
				}), processing ? "جار معالجة الدفع..." : "ادفع الآن"]
			})
		]
	});
}
function SuccessScreen({ session, onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen-content success-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "success-mark",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					size: 34,
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "تم تأكيد الحجز" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "رقم الحجز AUR-2481" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "confirmed-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: session.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						session.date,
						" - ",
						session.time
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [session.studio, "، العليا"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "qr-box",
				"aria-label": "رمز الحضور",
				children: Array.from({ length: 49 }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: index * 7 % 5 < 2 ? "dark" : "" }, index))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "two-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					type: "button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
						size: 17,
						"aria-hidden": "true"
					}), "التقويم"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					type: "button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						size: 17,
						"aria-hidden": "true"
					}), "الاتجاهات"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "primary-button full",
				onClick: () => onGo("bookings"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCheck, {
					size: 18,
					"aria-hidden": "true"
				}), "عرض حجوزاتي"]
			})
		]
	});
}
function BookingsScreen({ bookingTab, setBookingTab, onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
				title: "حجوزاتي",
				subtitle: "تابع المواعيد والحضور",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
					size: 18,
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "segmented",
				children: ["القادمة", "السابقة"].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: bookingTab === item ? "selected" : "",
					onClick: () => setBookingTab(item),
					type: "button",
					children: item
				}, item))
			}),
			bookingTab === "القادمة" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "booking-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "status-pill",
						children: "مؤكد"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Pilates Reformer" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOVA Movement - اليوم 7:00 مساء" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "booking-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => onGo("success"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCheck, {
								size: 16,
								"aria-hidden": "true"
							}), "رمز الحضور"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "ghost-button",
							type: "button",
							children: "إلغاء"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty-state",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
						size: 28,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "لا توجد حجوزات سابقة" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ستظهر الجلسات المكتملة هنا." })
				]
			})
		]
	});
}
function AccountScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
				title: "حسابي",
				subtitle: "حصة الدويغري",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUserRound, {
					size: 18,
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "profile-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "avatar",
					children: "ح"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "حصة الدويغري" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+966 5X XXX 214" })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "menu-list",
				children: [
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 18 }),
						label: "الملف الشخصي"
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 18 }),
						label: "المفضلة"
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletCards, { size: 18 }),
						label: "طرق الدفع"
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 18 }),
						label: "الإشعارات"
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 18 }),
						label: "الدعم والمساعدة"
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { size: 18 }),
						label: "الشروط والخصوصية"
					}
				].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "menu-row",
					type: "button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [row.icon, row.label] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						size: 17,
						"aria-hidden": "true"
					})]
				}, row.label))
			})
		]
	});
}
function AppHeader({ title, subtitle, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "app-header",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: subtitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "icon-button",
			type: "button",
			"aria-label": title,
			title,
			children: action
		})]
	});
}
function BottomNav({ current, onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "bottom-nav",
		"aria-label": "التنقل الرئيسي",
		children: [
			{
				id: "home",
				label: "الرئيسية",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { size: 18 })
			},
			{
				id: "explore",
				label: "استكشاف",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 })
			},
			{
				id: "bookings",
				label: "حجوزاتي",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCheck, { size: 18 })
			},
			{
				id: "account",
				label: "حسابي",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 18 })
			}
		].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: current === item.id ? "active" : "",
			onClick: () => onGo(item.id),
			type: "button",
			children: [item.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
		}, item.id))
	});
}
function SectionTitle({ title, action, onAction }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "section-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onAction,
			type: "button",
			children: action
		})]
	});
}
function SessionCard({ session, onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "session-card",
		onClick: () => onGo("session"),
		type: "button",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "session-image",
			style: { backgroundImage: `url(${session.image})` },
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "session-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "session-topline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: session.date }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [session.seats, " مقاعد"] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: session.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: session.studio }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "session-meta",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
						size: 14,
						"aria-hidden": "true"
					}), session.time] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [session.price, " ر.س"] })]
				})
			]
		})]
	});
}
function StudioResultCard({ studio, onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "studio-result-card",
		onClick: () => onGo("studio"),
		type: "button",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "studio-result-image",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "studio-result-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "studio-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: studio.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							size: 13,
							fill: "currentColor",
							"aria-hidden": "true"
						}),
						" ",
						studio.rating
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: studio.tags }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "studio-result-meta",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							size: 14,
							"aria-hidden": "true"
						}),
						studio.area,
						" - ",
						studio.distance
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: studio.price })]
				})
			]
		})]
	});
}
function FilterGroup({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "filter-block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "segmented",
			children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: value === option ? "selected" : "",
				onClick: () => onChange(option),
				type: "button",
				children: option
			}, option))
		})]
	});
}
function MiniStat({ icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mini-stat",
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
function PriceLine({ label, value, strong }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: strong ? "price-line total" : "price-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value })]
	});
}
function buildScheduleDays() {
	const weekdayFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", { weekday: "short" });
	const dayFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", { day: "2-digit" });
	const monthFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", { month: "long" });
	return Array.from({ length: 7 }).map((_, index) => {
		const date = /* @__PURE__ */ new Date();
		date.setDate(date.getDate() + index);
		return {
			weekday: weekdayFormatter.format(date),
			date: dayFormatter.format(date),
			month: monthFormatter.format(date)
		};
	});
}
//#endregion
export { AuraPrototype as default };

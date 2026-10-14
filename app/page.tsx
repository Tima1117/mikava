"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { listings, type Lang } from "./data";
import { HeroVideo, WaIcon, type HeroCopy } from "./hero-video";
import { Listings, type ListingsCopy } from "./listings";
import { Services, type ServicesCopy } from "./services";
import { Process, type ProcessCopy } from "./process";
import { WhySection, type WhyCopy } from "./why-section";
import { ReviewsWall, type ReviewsCopy } from "./reviews-wall";
import { ReelsRail, type ReelsCopy } from "./reels-rail";

const phone = "+995599555591";
const phonePretty = "+995 599 55 55 91";
const waNumber = "995511222929";
const waPretty = "+995 511 22 29 29";
const phoneListingsPretty = "+995 522 22 39 49";
const waBase = `https://wa.me/${waNumber}`;
const igUrl = "https://www.instagram.com/mikava.estate/";
const tgUrl = "https://t.me/mikava_estate";
const tgDm = "https://t.me/MIKAVAESTATE";
const fbUrl = "https://www.facebook.com/MIKAVA.estate.Batumi/";
const placeUrl = "https://www.google.com/maps/place/MIKAVA+estate/@41.6469613,41.6422658,17z/data=!3m1!4b1!4m6!3m5!1s0x40678792fd4b8f51:0x157599566dbb6098!8m2!3d41.6469613!4d41.6422658!16s%2Fg%2F11tsxqdfs6";
const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=41.6469613,41.6422658";
const mapEmbed = "https://maps.google.com/maps?q=41.6469613,41.6422658&z=16&output=embed";

const copy = {
  ru: {
    nav: ["Объекты", "Услуги", "О нас", "Как мы работаем", "Отзывы", "Контакты"],
    cta: "Написать",
    hero: {
      eyebrow: "Агентство недвижимости · Батуми · ул. Мазниашвили, 68",
      words: ["MIKAVA", "ESTATE"],
      h1: "Квартиры, дома и аренда в Батуми", h1em: "с командой, которую клиенты зовут по имени",
      sub: "Продажа, долгосрочная аренда и сделки под ключ: от первого сообщения до доверенности, регистрации и переоформления счётчиков. 54 отзыва в Google — все на пять звёзд.",
      rating: "5.0 · 54 отзыва в Google",
      cta: "Написать в WhatsApp", cta2: "Смотреть объекты", hint: "Листайте",
      badges: [["5.0", "рейтинг Google"], ["54", "отзыва"], ["от $35k", "квартиры"], ["10–20", "пн–сб"]],
      chips: [{ t: "Calligraphy Towers", s: "студия · 18 этаж · белый каркас" }, { t: "Bagrationi Residence", s: "2+1 · 74 м² · $170 000" }, { t: "Villa Park, Чакви", s: "вилла 145 м² · $329 000" }],
    } as HeroCopy,
    listings: {
      eyebrow: "ОБЪЕКТЫ", title: "Что продаём и сдаём сейчас",
      lede: "Примеры объектов из Telegram-канала агентства: студии, квартиры 1+1 и 2+1, дома с бассейном и аренда на длительный срок. Актуальность и торг уточним в чате.",
      tabs: { all: "Все", studio: "Студии", flat: "Квартиры", house: "Дома и виллы", rent: "Аренда" },
      area: "м²", ask: "Запросить", more: "Подробнее", less: "Свернуть", photo: "Фото", sort: "Сортировка", sortDefault: "По порядку", sortAsc: "Сначала дешевле", sortDesc: "Сначала дороже",
      perMonth: "/ мес", onRequest: "Цена по запросу", rentTag: "Аренда",
      note: "Нет подходящего? Напишите, что ищете — у нас есть объекты, которых нет в открытой продаже.",
      count: (n: number) => `${n} ${n === 1 ? "объект" : n < 5 ? "объекта" : "объектов"}`,
    } as ListingsCopy,
    services: {
      eyebrow: "УСЛУГИ", title: "Покупка, аренда и всё, что после",
      lede: "Шесть направлений, одна команда. Любой вопрос начинается с сообщения в WhatsApp или Telegram.",
      ask: "Обсудить", note: "Комиссию и порядок оплаты согласуем до начала работы — письменно, в договоре. Многие объекты аренды — без комиссии для арендатора.",
    } as ServicesCopy,
    about: {
      eyebrow: "О НАС", title: "Офис на Мазниашвили, где всю команду знают по имени",
      p1: "MIKAVA estate — агентство Александра Микавы. Работаем в Батуми с 2022 года из офиса на улице Георгия Мазниашвили, 68 — лофт с кирпичными стенами и панорамными окнами на город. Клиенты в отзывах называют агентов по имени: Алиса, Анна, Роберт, Низам, — и пишут про «семейную атмосферу».",
      p2: "Мы не берём количеством объявлений. Каждый объект смотрим сами, честно говорим о минусах и ведём сделку до конца: банковский перевод, доверенность, счётчики. Именно за это нас рекомендуют покупатели из Израиля, США, России и Грузии.",
      facts: ["Офис: ул. Георгия Мазниашвили, 68, Батуми", "Говорим по-русски, по-английски и по-грузински", "Девять застройщиков-партнёров и ипотека в TBC Bank", "Сделки удалённо по доверенности"],
      stats: [["5.0", "рейтинг Google"], ["54", "отзыва"], ["20", "объектов в каталоге"], ["3", "языка"]],
      quote: "«Познакомился со всей командой — все классные, атмосфера почти семейная».", quoteBy: "из отзыва в Google",
      tag: ["Мазниашвили, 68", "Батуми"],
    },
    process: {
      eyebrow: "КАК МЫ РАБОТАЕМ", title: "Шесть шагов от сообщения до ключей",
      lede: "Так проходит типичная покупка с нами. Сроки — ориентир по нашим сделкам, точные зависят от объекта и банка. Аренду закрываем быстрее: в сезон — за часы.",
      facts: [["1–4", "рабочих дня занимает регистрация права в Доме юстиции"], ["2", "языка в договоре: грузинский и русский или английский"], ["0", "предоплаты до подписания договора с агентством"]],
      cta: "Начать с заявки", photoCap: "Ключи выдаём в день регистрации",
    } as ProcessCopy,
    why: {
      eyebrow: "ПОЧЕМУ С НАМИ", title: "Что вы получаете кроме квартиры",
      lede: "Цифры, переписка и проверки — всё как в реальной сделке.",
      stats: [["5.0", "рейтинг Google"], ["54", "отзыва, все на 5 звёзд"], ["$35k", "минимальная цена в канале"], ["3", "языка"]],
      chat: { title: "Так выглядит подбор в WhatsApp", msgs: [{ me: true, t: "Ищу 1+1 до $70 000 рядом с морем, под аренду" }, { t: "Есть три варианта: Згвиспирис 6 (59,5 м², белый каркас), Згвиспирис 1 и студия в Rainbow. Отправляю фото и видео" }, { me: true, t: "Можно посмотреть онлайн? Прилетаю только в мае" }, { t: "Да, завтра в 12:00 покажу по видеосвязи. Договор и задаток оформим по доверенности" }] },
      check: { title: "Проверяем до задатка", items: ["Выписка из публичного реестра", "Обременения, аресты, ипотека", "Долги по коммунальным платежам", "Разрешение и сроки у застройщика", "Договор на двух языках у нотариуса"], foot: "Результат проверки присылаем письменно перед внесением задатка." },
      map: { title: "Где подбираем", sub: "от Махинджаури до Гонио", pins: ["Махинджаури и Чакви", "Новый бульвар", "Старый город", "Руставели и центр", "Гонио и Кахабери"] },
      journal: { title: "Новые объекты", sub: "в Telegram-канале агентства" },
      cta: { title: "Напишите, что ищете", text: "Купить или снять, тип, бюджет, район и сроки. Ответим в рабочее время с 3–5 вариантами.", btn: "Написать в WhatsApp" },
    } as WhyCopy,
    reviews: {
      eyebrow: "ОТЗЫВЫ", title: "Что пишут клиенты",
      lede: "Отзывы с карточек агентства в Google Maps (5.0, 54 отзыва) и Яндекс Картах (4.9). Клиенты называют Алису, Роберта, Анну, Низама и директора Александра по имени — это лучшая проверка агентства.",
      google: "Все 54 отзыва в Google", count: "54 отзыва · 5.0", verified: "Отзывы показаны так, как опубликованы; тексты сокращены, переводы — для удобства.", more: "Показать ещё отзывы", less: "Свернуть",
    } as ReviewsCopy,
    reels: {
      eyebrow: "INSTAGRAM", title: "Объекты в Instagram и Telegram",
      lede: "Команда снимает квартиры и дома сама: без фильтров и «идеальных ракурсов». Лента движется автоматически, нажмите — откроется Instagram.",
      follow: "Подписаться", stats: "Instagram: 576 постов · 1 800 подписчиков · Telegram: канал с объектами · Facebook",
    } as ReelsCopy,
    subscribe: {
      eyebrow: "ПОДБОРКА", title: "Новые объекты — первыми",
      text: "Каждую неделю выкладываем новые квартиры и дома в Telegram-канале. Напишите, что ищете, — пришлём подборку сегодня и будем присылать подходящие объекты по мере появления, без спама.",
      fName: "Ваше имя", fWant: "Что ищете", fWantPh: "например, 1+1 у моря до $70 000", fMsgr: "Куда присылать", send: "Получать подборку", note: "Канал с объектами: t.me/mikava_estate · вопросы по объектам: " + phoneListingsPretty + ".",
      msg: (name: string, want: string) => `Здравствуйте! Хочу получать новые объекты по запросу: ${want || "…"}. Меня зовут ${name || "…"}.`,
    },
    contacts: {
      eyebrow: "КОНТАКТЫ", title: "Заявка на подбор",
      addrLabel: "Офис", addr: "ул. Георгия Мазниашвили, 68, Батуми · лофт с кирпичными стенами",
      phoneLabel: "Телефон", hoursLabel: "Часы", hours: "Пн–сб 10:00–20:00 · вс 10:00–14:00",
      msgLabel: "Мессенджеры", socialLabel: "Соцсети",
      directions: "Маршрут", call: "Позвонить",
      bookTitle: "Что вы ищете?",
      bookText: "Заполните форму — текст откроется в WhatsApp, мы ответим с вариантами в рабочее время.",
      fName: "Ваше имя", fType: "Тип объекта", fBudget: "Бюджет", fComment: "Район, сроки, пожелания (необязательно)",
      types: ["Студия", "Квартира 1+1", "Квартира 2+1 и больше", "Дом или вилла", "Аренда на длительный срок", "Хочу продать или сдать свой объект"],
      budgets: ["до $50 000", "$50 000 – 100 000", "$100 000 – 200 000", "от $200 000", "Аренда до $600 в месяц", "Аренда от $600 в месяц", "Пока не решил(а)"],
      send: "Отправить в WhatsApp",
      bookNote: "Без предоплаты: подбор и показ бесплатны, комиссия обсуждается до подписания договора.",
      waMsg: (type: string, budget: string, name: string, comment: string) => `Здравствуйте! Ищу: ${type}, бюджет ${budget}. Меня зовут ${name || "…"}.${comment ? " " + comment : ""}`,
    },
    waListing: (s: string) => `Здравствуйте! Интересует объект: ${s}. Актуально? Хочу подробности и видео.`,
    waService: (s: string) => `Здравствуйте! Хочу обсудить: ${s}.`,
    foot: "Концепт сайта для MIKAVA estate · Батуми",
    credits: "Фото объектов и офиса: Telegram и Google-карточка агентства · Видео: Mixkit",
  },
  en: {
    nav: ["Properties", "Services", "About", "How it works", "Reviews", "Contacts"],
    cta: "Message",
    hero: {
      eyebrow: "Real estate agency · Batumi · 68 Mazniashvili St",
      words: ["MIKAVA", "ESTATE"],
      h1: "Flats, houses and rentals in Batumi", h1em: "with a team clients know by name",
      sub: "Sales, long-term rentals and turnkey deals: from the first message to the power of attorney, registration and meter transfer. 54 Google reviews, all five stars.",
      rating: "5.0 · 54 Google reviews",
      cta: "Message on WhatsApp", cta2: "See properties", hint: "Scroll",
      badges: [["5.0", "Google rating"], ["54", "reviews"], ["from $35k", "flats"], ["10–20", "Mon–Sat"]],
      chips: [{ t: "Calligraphy Towers", s: "studio · 18th floor · white frame" }, { t: "Bagrationi Residence", s: "2+1 · 74 m² · $170,000" }, { t: "Villa Park, Chakvi", s: "145 m² villa · $329,000" }],
    } as HeroCopy,
    listings: {
      eyebrow: "PROPERTIES", title: "For sale and for rent right now",
      lede: "Sample listings from the agency's Telegram channel: studios, 1+1 and 2+1 flats, houses with pools and long-term rentals. Availability and negotiation confirmed in chat.",
      tabs: { all: "All", studio: "Studios", flat: "Flats", house: "Houses and villas", rent: "Rentals" },
      area: "m²", ask: "Enquire", more: "Details", less: "Hide", photo: "Photo", sort: "Sort", sortDefault: "Default order", sortAsc: "Cheapest first", sortDesc: "Priciest first",
      perMonth: "/ month", onRequest: "Price on request", rentTag: "Rent",
      note: "Nothing suitable? Tell us what you want: we have listings that never reach the open market.",
      count: (n: number) => `${n} ${n === 1 ? "property" : "properties"}`,
    } as ListingsCopy,
    services: {
      eyebrow: "SERVICES", title: "Buying, renting and everything after",
      lede: "Six directions, one team. Every question starts with a message on WhatsApp or Telegram.",
      ask: "Discuss", note: "Fees and payment terms are agreed before we start, in writing, in the contract. Many rentals carry no fee for the tenant.",
    } as ServicesCopy,
    about: {
      eyebrow: "ABOUT", title: "An office on Mazniashvili where the whole team is known by name",
      p1: "MIKAVA estate is Alexander Mikava's agency. Since 2022 it has worked from an office at 68 Giorgi Mazniashvili Street in Batumi, a brick-walled loft with panoramic windows over the city. Clients name the agents in their reviews, Alice, Anna, Robert and Nizam, and write about the family vibe.",
      p2: "We do not compete on the number of listings. We view every property ourselves, are honest about the downsides and run the deal to the end: bank transfer, power of attorney, meters. That is why buyers from Israel, the USA, Russia and Georgia recommend us.",
      facts: ["Office: 68 Giorgi Mazniashvili St, Batumi", "We speak Russian, English and Georgian", "Nine partner developers and TBC Bank mortgages", "Remote deals by power of attorney"],
      stats: [["5.0", "Google rating"], ["54", "reviews"], ["20", "properties listed"], ["3", "languages"]],
      quote: "“Met the whole team and they were all awesome! Kind of family vibes.”", quoteBy: "from a Google review",
      tag: ["68 Mazniashvili", "Batumi"],
    },
    process: {
      eyebrow: "HOW IT WORKS", title: "Six steps from a message to the keys",
      lede: "This is how a typical purchase with us goes. Timings are a guide based on our deals; exact ones depend on the property and the bank. Rentals close faster: within hours in season.",
      facts: [["1–4", "working days for title registration at the House of Justice"], ["2", "languages in the contract: Georgian plus Russian or English"], ["0", "prepayment before the agency contract is signed"]],
      cta: "Start with a request", photoCap: "Keys handed over on registration day",
    } as ProcessCopy,
    why: {
      eyebrow: "WHY US", title: "What you get besides the flat",
      lede: "Numbers, chat and checks, exactly as in a real deal.",
      stats: [["5.0", "Google rating"], ["54", "reviews, all five stars"], ["$35k", "lowest price in the channel"], ["3", "languages"]],
      chat: { title: "This is what a search looks like on WhatsApp", msgs: [{ me: true, t: "Looking for a 1+1 under $70,000 near the sea, to rent out" }, { t: "Three options: Zgvispiri 6 (59.5 m², white frame), Zgvispiri 1 and a studio in Rainbow. Sending photos and videos" }, { me: true, t: "Can I view online? I only fly in in May" }, { t: "Yes, tomorrow at 12:00 by video call. Contract and deposit can be done by power of attorney" }] },
      check: { title: "Checked before the deposit", items: ["Public registry extract", "Encumbrances, arrests, mortgages", "Utility debts", "Developer permits and deadlines", "Bilingual contract at the notary"], foot: "We send the written result of the checks before you pay the deposit." },
      map: { title: "Where we search", sub: "from Makhinjauri to Gonio", pins: ["Makhinjauri and Chakvi", "New Boulevard", "Old Town", "Rustaveli and centre", "Gonio and Kakhaberi"] },
      journal: { title: "New listings", sub: "on the agency's Telegram channel" },
      cta: { title: "Tell us what you want", text: "Buy or rent, type, budget, district and timing. We reply in working hours with 3–5 options.", btn: "Message on WhatsApp" },
    } as WhyCopy,
    reviews: {
      eyebrow: "REVIEWS", title: "What clients say",
      lede: "Reviews from the agency's Google Maps (5.0, 54 reviews) and Yandex Maps (4.9) cards. Clients name Alice, Robert, Anna, Nizam and director Alexander, the best check an agency can get.",
      google: "All 54 reviews on Google", count: "54 reviews · 5.0", verified: "Reviews are shown as published; texts are shortened, translations are for convenience.", more: "Show more reviews", less: "Show less",
    } as ReviewsCopy,
    reels: {
      eyebrow: "INSTAGRAM", title: "Properties on Instagram and Telegram",
      lede: "The team films flats and houses themselves, no filters or perfect angles. The rail moves on its own; click to open Instagram.",
      follow: "Follow", stats: "Instagram: 576 posts · 1,800 followers · Telegram: listings channel · Facebook",
    } as ReelsCopy,
    subscribe: {
      eyebrow: "SELECTION", title: "New listings first",
      text: "Every week we publish new flats and houses on our Telegram channel. Tell us what you want and we will send a selection today and keep sending matching properties as they appear, no spam.",
      fName: "Your name", fWant: "What you want", fWantPh: "e.g. a 1+1 by the sea under $70,000", fMsgr: "Where to send it", send: "Get the selection", note: "Listings channel: t.me/mikava_estate · listing enquiries: " + phoneListingsPretty + ".",
      msg: (name: string, want: string) => `Hello! I would like to receive new listings for: ${want || "…"}. My name is ${name || "…"}.`,
    },
    contacts: {
      eyebrow: "CONTACTS", title: "Request a selection",
      addrLabel: "Office", addr: "68 Giorgi Mazniashvili St, Batumi · brick-walled loft",
      phoneLabel: "Phone", hoursLabel: "Hours", hours: "Mon–Sat 10:00–20:00 · Sun 10:00–14:00",
      msgLabel: "Messengers", socialLabel: "Social",
      directions: "Directions", call: "Call",
      bookTitle: "What are you looking for?",
      bookText: "Fill in the form, the text opens in WhatsApp and we reply with options in working hours.",
      fName: "Your name", fType: "Property type", fBudget: "Budget", fComment: "District, timing, wishes (optional)",
      types: ["Studio", "1+1 flat", "2+1 flat or larger", "House or villa", "Long-term rental", "I want to sell or let my property"],
      budgets: ["under $50,000", "$50,000 – 100,000", "$100,000 – 200,000", "over $200,000", "Rent under $600 a month", "Rent over $600 a month", "Not decided yet"],
      send: "Send to WhatsApp",
      bookNote: "No prepayment: search and viewings are free, the fee is agreed before the contract is signed.",
      waMsg: (type: string, budget: string, name: string, comment: string) => `Hello! I am looking for: ${type}, budget ${budget}. My name is ${name || "…"}.${comment ? " " + comment : ""}`,
    },
    waListing: (s: string) => `Hello! I am interested in: ${s}. Is it still available? I would like details and a video.`,
    waService: (s: string) => `Hello! I would like to discuss: ${s}.`,
    foot: "Website concept for MIKAVA estate · Batumi",
    credits: "Listing and office photos: the agency's Telegram and Google card · Video: Mixkit",
  },
  ka: {
    nav: ["ობიექტები", "სერვისები", "ჩვენ შესახებ", "როგორ ვმუშაობთ", "შეფასებები", "კონტაქტი"],
    cta: "მოწერა",
    hero: {
      eyebrow: "უძრავი ქონების სააგენტო · ბათუმი · მაზნიაშვილის ქ. 68",
      words: ["MIKAVA", "ESTATE"],
      h1: "ბინები, სახლები და ქირა ბათუმში", h1em: "გუნდთან, რომელსაც კლიენტები სახელით იცნობენ",
      sub: "გაყიდვა, გრძელვადიანი ქირა და გარიგება გასაღებამდე: პირველი შეტყობინებიდან მინდობილობამდე, რეგისტრაციამდე და მრიცხველების გადაფორმებამდე. 54 შეფასება Google-ში — ყველა ხუთვარსკვლავიანი.",
      rating: "5.0 · 54 შეფასება Google-ში",
      cta: "მოწერა WhatsApp-ში", cta2: "ობიექტების ნახვა", hint: "დასქროლეთ",
      badges: [["5.0", "Google რეიტინგი"], ["54", "შეფასება"], ["$35k-დან", "ბინები"], ["10–20", "ორშ–შაბ"]],
      chips: [{ t: "Calligraphy Towers", s: "სტუდიო · მე-18 სართული · თეთრი კარკასი" }, { t: "Bagrationi Residence", s: "2+1 · 74 მ² · $170 000" }, { t: "Villa Park, ჩაქვი", s: "ვილა 145 მ² · $329 000" }],
    } as HeroCopy,
    listings: {
      eyebrow: "ობიექტები", title: "რას ვყიდით და ვაქირავებთ ახლა",
      lede: "ობიექტების მაგალითები სააგენტოს Telegram-არხიდან: სტუდიოები, 1+1 და 2+1 ბინები, სახლები აუზით და გრძელვადიანი ქირა. აქტუალობასა და ვაჭრობას ჩატში დავაზუსტებთ.",
      tabs: { all: "ყველა", studio: "სტუდიოები", flat: "ბინები", house: "სახლები და ვილები", rent: "ქირა" },
      area: "მ²", ask: "მოთხოვნა", more: "დეტალები", less: "დახურვა", photo: "ფოტო", sort: "დალაგება", sortDefault: "თანმიმდევრობით", sortAsc: "ჯერ იაფი", sortDesc: "ჯერ ძვირი",
      perMonth: "/ თვე", onRequest: "ფასი მოთხოვნით", rentTag: "ქირა",
      note: "ვერ იპოვეთ შესაფერისი? მოგვწერეთ, რას ეძებთ — გვაქვს ობიექტები, რომლებიც ღია გაყიდვაში არ არის.",
      count: (n: number) => `${n} ობიექტი`,
    } as ListingsCopy,
    services: {
      eyebrow: "სერვისები", title: "ყიდვა, ქირა და ყველაფერი შემდეგ",
      lede: "ექვსი მიმართულება, ერთი გუნდი. ნებისმიერი კითხვა იწყება შეტყობინებით WhatsApp-ში ან Telegram-ში.",
      ask: "განხილვა", note: "საკომისიოსა და გადახდის წესს მუშაობის დაწყებამდე ვათანხმებთ — წერილობით, ხელშეკრულებაში. ბევრი საიჯარო ობიექტი დამქირავებლისთვის საკომისიოს გარეშეა.",
    } as ServicesCopy,
    about: {
      eyebrow: "ჩვენ შესახებ", title: "ოფისი მაზნიაშვილზე, სადაც მთელ გუნდს სახელით იცნობენ",
      p1: "MIKAVA estate ალექსანდრე მიკავას სააგენტოა. 2022 წლიდან ბათუმში გიორგი მაზნიაშვილის ქ. 68-ში მდებარე ოფისიდან ვმუშაობთ — ლოფტი აგურის კედლებითა და პანორამული ფანჯრებით ქალაქზე. კლიენტები შეფასებებში აგენტებს სახელით ასახელებენ: ალისა, ანა, რობერტი, ნიზამი — და „ოჯახურ ატმოსფეროზე“ წერენ.",
      p2: "განცხადებების რაოდენობით არ ვიწონებთ თავს. ყველა ობიექტს თავად ვათვალიერებთ, გულწრფელად ვსაუბრობთ მინუსებზე და გარიგებას ბოლომდე მივყავართ: საბანკო გადარიცხვა, მინდობილობა, მრიცხველები. სწორედ ამისთვის გვირჩევენ მყიდველები ისრაელიდან, აშშ-დან, რუსეთიდან და საქართველოდან.",
      facts: ["ოფისი: გიორგი მაზნიაშვილის ქ. 68, ბათუმი", "ვსაუბრობთ ქართულად, რუსულად და ინგლისურად", "ცხრა პარტნიორი დეველოპერი და იპოთეკა TBC Bank-ში", "დისტანციური გარიგებები მინდობილობით"],
      stats: [["5.0", "Google რეიტინგი"], ["54", "შეფასება"], ["20", "ობიექტი კატალოგში"], ["3", "ენა"]],
      quote: "„მთელ გუნდს გავიცანი — ყველა შესანიშნავია, თითქმის ოჯახური ატმოსფეროა“.", quoteBy: "Google-ის შეფასებიდან",
      tag: ["მაზნიაშვილის 68", "ბათუმი"],
    },
    process: {
      eyebrow: "როგორ ვმუშაობთ", title: "ექვსი ნაბიჯი შეტყობინებიდან გასაღებამდე",
      lede: "ასე მიმდინარეობს ტიპური ყიდვა ჩვენთან. ვადები ჩვენი გარიგებების ორიენტირია, ზუსტი ობიექტსა და ბანკზეა დამოკიდებული. ქირას უფრო სწრაფად ვხურავთ: სეზონზე — საათებში.",
      facts: [["1–4", "სამუშაო დღე სჭირდება უფლების რეგისტრაციას იუსტიციის სახლში"], ["2", "ენა ხელშეკრულებაში: ქართული და რუსული ან ინგლისური"], ["0", "წინასწარი გადახდა სააგენტოსთან ხელშეკრულების ხელმოწერამდე"]],
      cta: "დაიწყეთ განაცხადით", photoCap: "გასაღებს რეგისტრაციის დღესვე გადმოგცემთ",
    } as ProcessCopy,
    why: {
      eyebrow: "რატომ ჩვენთან", title: "რას იღებთ ბინის გარდა",
      lede: "ციფრები, მიმოწერა და შემოწმებები — ყველაფერი როგორც რეალურ გარიგებაში.",
      stats: [["5.0", "Google რეიტინგი"], ["54", "შეფასება, ყველა 5 ვარსკვლავი"], ["$35k", "მინიმალური ფასი არხში"], ["3", "ენა"]],
      chat: { title: "ასე გამოიყურება შერჩევა WhatsApp-ში", msgs: [{ me: true, t: "ვეძებ 1+1-ს $70 000-მდე ზღვასთან, გასაქირავებლად" }, { t: "სამი ვარიანტია: ზღვისპირის 6 (59,5 მ², თეთრი კარკასი), ზღვისპირის 1 და სტუდიო Rainbow-ში. ვგზავნი ფოტოსა და ვიდეოს" }, { me: true, t: "ონლაინ ნახვა შეიძლება? მხოლოდ მაისში ჩამოვფრინდები" }, { t: "კი, ხვალ 12:00-ზე ვიდეოზარით გაჩვენებთ. ხელშეკრულება და ბე მინდობილობით გავაფორმოთ" }] },
      check: { title: "ვამოწმებთ ბემდე", items: ["ამონაწერი საჯარო რეესტრიდან", "დატვირთვები, ყადაღა, იპოთეკა", "კომუნალური დავალიანებები", "დეველოპერის ნებართვა და ვადები", "ორენოვანი ხელშეკრულება ნოტარიუსთან"], foot: "შემოწმების შედეგს წერილობით გიგზავნით ბეს შეტანამდე." },
      map: { title: "სად ვარჩევთ", sub: "მახინჯაურიდან გონიომდე", pins: ["მახინჯაური და ჩაქვი", "ახალი ბულვარი", "ძველი ქალაქი", "რუსთაველი და ცენტრი", "გონიო და კახაბერი"] },
      journal: { title: "ახალი ობიექტები", sub: "სააგენტოს Telegram-არხში" },
      cta: { title: "მოგვწერეთ, რას ეძებთ", text: "ყიდვა თუ ქირა, ტიპი, ბიუჯეტი, უბანი და ვადები. სამუშაო საათებში 3–5 ვარიანტით გიპასუხებთ.", btn: "მოწერა WhatsApp-ში" },
    } as WhyCopy,
    reviews: {
      eyebrow: "შეფასებები", title: "რას წერენ კლიენტები",
      lede: "შეფასებები სააგენტოს Google Maps-ის (5.0, 54 შეფასება) და Yandex Maps-ის (4.9) ბარათებიდან. კლიენტები ალისას, რობერტს, ანას, ნიზამსა და დირექტორ ალექსანდრეს სახელით ასახელებენ — ეს სააგენტოს საუკეთესო შემოწმებაა.",
      google: "ყველა 54 შეფასება Google-ში", count: "54 შეფასება · 5.0", verified: "შეფასებები ნაჩვენებია ისე, როგორც გამოქვეყნდა; ტექსტები შემოკლებულია, თარგმანი — მოხერხებულობისთვის.", more: "მეტი შეფასება", less: "დახურვა",
    } as ReviewsCopy,
    reels: {
      eyebrow: "INSTAGRAM", title: "ობიექტები Instagram-სა და Telegram-ში",
      lede: "გუნდი ბინებსა და სახლებს თავად იღებს: ფილტრებისა და „იდეალური რაკურსების“ გარეშე. ლენტა ავტომატურად მოძრაობს, დააჭირეთ — გაიხსნება Instagram.",
      follow: "გამოწერა", stats: "Instagram: 576 პოსტი · 1 800 გამომწერი · Telegram: ობიექტების არხი · Facebook",
    } as ReelsCopy,
    subscribe: {
      eyebrow: "შერჩევა", title: "ახალი ობიექტები — პირველებმა",
      text: "ყოველ კვირა Telegram-არხში ახალ ბინებსა და სახლებს ვაქვეყნებთ. მოგვწერეთ, რას ეძებთ — დღესვე გამოგიგზავნით შერჩევას და შესაფერის ობიექტებს გამოჩენისთანავე გამოგიგზავნით, სპამის გარეშე.",
      fName: "თქვენი სახელი", fWant: "რას ეძებთ", fWantPh: "მაგ., 1+1 ზღვასთან $70 000-მდე", fMsgr: "სად გამოგიგზავნოთ", send: "შერჩევის მიღება", note: "ობიექტების არხი: t.me/mikava_estate · კითხვები ობიექტებზე: " + phoneListingsPretty + ".",
      msg: (name: string, want: string) => `გამარჯობა! მინდა მივიღო ახალი ობიექტები მოთხოვნით: ${want || "…"}. მე ვარ ${name || "…"}.`,
    },
    contacts: {
      eyebrow: "კონტაქტი", title: "განაცხადი შერჩევაზე",
      addrLabel: "ოფისი", addr: "გიორგი მაზნიაშვილის ქ. 68, ბათუმი · ლოფტი აგურის კედლებით",
      phoneLabel: "ტელეფონი", hoursLabel: "საათები", hours: "ორშ–შაბ 10:00–20:00 · კვ 10:00–14:00",
      msgLabel: "მესენჯერები", socialLabel: "სოცქსელები",
      directions: "მარშრუტი", call: "დარეკვა",
      bookTitle: "რას ეძებთ?",
      bookText: "შეავსეთ ფორმა — ტექსტი WhatsApp-ში გაიხსნება, სამუშაო საათებში ვარიანტებით გიპასუხებთ.",
      fName: "თქვენი სახელი", fType: "ობიექტის ტიპი", fBudget: "ბიუჯეტი", fComment: "უბანი, ვადები, სურვილები (არასავალდებულო)",
      types: ["სტუდიო", "ბინა 1+1", "ბინა 2+1 და მეტი", "სახლი ან ვილა", "გრძელვადიანი ქირა", "მინდა გავყიდო ან გავაქირავო ჩემი ობიექტი"],
      budgets: ["$50 000-მდე", "$50 000 – 100 000", "$100 000 – 200 000", "$200 000-დან", "ქირა $600-მდე თვეში", "ქირა $600-დან თვეში", "ჯერ არ გადამიწყვეტია"],
      send: "გაგზავნა WhatsApp-ში",
      bookNote: "წინასწარი გადახდის გარეშე: შერჩევა და ჩვენება უფასოა, საკომისიო ხელშეკრულების ხელმოწერამდე განიხილება.",
      waMsg: (type: string, budget: string, name: string, comment: string) => `გამარჯობა! ვეძებ: ${type}, ბიუჯეტი ${budget}. მე ვარ ${name || "…"}.${comment ? " " + comment : ""}`,
    },
    waListing: (s: string) => `გამარჯობა! მაინტერესებს ობიექტი: ${s}. აქტუალურია? მინდა დეტალები და ვიდეო.`,
    waService: (s: string) => `გამარჯობა! მინდა განვიხილო: ${s}.`,
    foot: "საიტის კონცეფცია MIKAVA estate-ისთვის · ბათუმი",
    credits: "ობიექტებისა და ოფისის ფოტო: სააგენტოს Telegram და Google-ბარათი · ვიდეო: Mixkit",
  },
};
type Copy = typeof copy.ru;

const wa = (text: string) => `${waBase}?text=${encodeURIComponent(text)}`;
const tg = (text: string) => `${tgDm}?text=${encodeURIComponent(text)}`;

const Ico = {
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2z" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  chat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" /></svg>,
  social: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m5 12 5 5L20 7" /></svg>,
};

const Mark = () => <i aria-hidden><svg viewBox="0 0 64 64"><path d="M14 48V22l9 11 9-11 9 11 9-11v26" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" /><circle cx="32" cy="15" r="4.5" fill="currentColor" /></svg></i>;

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, []);
  return null;
}

function About({ c }: { c: Copy["about"] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [90, -110]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-30, 70]);
  return (
    <section ref={ref} className="about" id="about">
      <div className="container about-grid">
        <div className="about-copy">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="section-title">{c.title}</h2>
          <p className="about-p">{c.p1}</p>
          <p className="about-p">{c.p2}</p>
          <ul className="about-facts">
            {c.facts.map((f, i) => (
              <motion.li key={f} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}>
                <span className="about-check">{Ico.check}</span>{f}
              </motion.li>
            ))}
          </ul>
          <blockquote className="about-quote"><p>{c.quote}</p><cite>{c.quoteBy}</cite></blockquote>
        </div>
        <div className="about-visual" aria-hidden>
          <motion.div className="about-ph about-ph-1" style={{ y: y1 }}><Image src="/images/office-1.webp" alt="" fill sizes="(max-width: 960px) 90vw, 46vw" style={{ objectFit: "cover", objectPosition: "50% 55%" }} /></motion.div>
          <motion.div className="about-ph about-ph-2" style={{ y: y2 }}><Image src="/images/office-3.webp" alt="" fill sizes="30vw" style={{ objectFit: "cover", objectPosition: "50% 40%" }} /></motion.div>
          <motion.div className="about-ph about-ph-3" style={{ y: y3 }}><Image src="/images/office-2.webp" alt="" fill sizes="30vw" style={{ objectFit: "cover", objectPosition: "50% 50%" }} /></motion.div>
          <div className="about-tag"><b>{c.tag[0]}</b><span>{c.tag[1]}</span></div>
        </div>
      </div>
    </section>
  );
}

function Subscribe({ c }: { c: Copy["subscribe"] }) {
  const [name, setName] = useState("");
  const [want, setWant] = useState("");
  const [msgr, setMsgr] = useState<"wa" | "tg">("wa");
  const href = msgr === "wa" ? wa(c.msg(name, want)) : tg(c.msg(name, want));
  return (
    <section className="journal-sec" id="subscribe">
      <div className="journal-bg" aria-hidden><Image src="/images/skyline-sunset.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 40%" }} /></div>
      <div className="container journal-grid">
        <div>
          <p className="eyebrow cream">{c.eyebrow}</p>
          <h2 className="section-title light">{c.title}</h2>
          <p className="journal-text">{c.text}</p>
        </div>
        <form className="journal-form" onSubmit={e => { e.preventDefault(); window.open(href, "_blank", "noopener"); }}>
          <label htmlFor="j-name">{c.fName}</label>
          <input id="j-name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
          <label htmlFor="j-want">{c.fWant}</label>
          <input id="j-want" value={want} onChange={e => setWant(e.target.value)} placeholder={c.fWantPh} />
          <span className="journal-label">{c.fMsgr}</span>
          <div className="journal-msgr" role="radiogroup">
            <button type="button" role="radio" aria-checked={msgr === "wa"} className={msgr === "wa" ? "on" : ""} onClick={() => setMsgr("wa")}><WaIcon />WhatsApp</button>
            <button type="button" role="radio" aria-checked={msgr === "tg"} className={msgr === "tg" ? "on" : ""} onClick={() => setMsgr("tg")}><TgIcon />Telegram</button>
          </div>
          <button className="btn btn-dark" type="submit">{c.send} →</button>
          <p className="journal-note">{c.note}</p>
        </form>
      </div>
    </section>
  );
}

function TgIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M21.9 4.3 18.6 20c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L6 13.5l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.5 3c.9-.3 1.7.2 1.4 1.3z" /></svg>;
}

function Contacts({ c }: { c: Copy["contacts"] }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [comment, setComment] = useState("");
  const msg = c.waMsg(type || c.types[0], budget || c.budgets[c.budgets.length - 1], name, comment);
  return (
    <section className="contacts" id="contacts">
      <div className="container">
        <div className="contacts-grid">
          <div>
            <p className="eyebrow light">{c.eyebrow}</p>
            <h2 className="section-title light" style={{ marginBottom: 28 }}>{c.title}</h2>
            <div className="contact-list">
              <div className="contact-row"><span className="c-ico">{Ico.pin}</span><div><b>{c.addrLabel}</b><a href={placeUrl} target="_blank" rel="noopener noreferrer">{c.addr}</a></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.phone}</span><div><b>{c.phoneLabel}</b><span><a href={`tel:${phone}`}>{phonePretty}</a> · <a href={`tel:+${waNumber}`}>{waPretty}</a></span></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.chat}</span><div><b>{c.msgLabel}</b><span><a href={waBase} target="_blank" rel="noopener noreferrer">WhatsApp {waPretty}</a> · <a href={tgDm} target="_blank" rel="noopener noreferrer">Telegram @MIKAVAESTATE</a></span></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.clock}</span><div><b>{c.hoursLabel}</b><span>{c.hours}</span></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.social}</span><div><b>{c.socialLabel}</b><span><a href={igUrl} target="_blank" rel="noopener noreferrer">Instagram</a> · <a href={tgUrl} target="_blank" rel="noopener noreferrer">Telegram</a> · <a href={fbUrl} target="_blank" rel="noopener noreferrer">Facebook</a></span></div></div>
            </div>
            <div className="contact-actions">
              <a className="btn btn-wa" href={waBase} target="_blank" rel="noopener noreferrer"><WaIcon />WhatsApp</a>
              <a className="btn btn-ghost" href={`tel:${phone}`}>{c.call}</a>
              <a className="btn btn-ghost" href={directionsUrl} target="_blank" rel="noopener noreferrer">{c.directions} ↗</a>
            </div>
          </div>
          <form className="book" onSubmit={e => { e.preventDefault(); window.open(wa(msg), "_blank", "noopener"); }}>
            <h3>{c.bookTitle}</h3>
            <p>{c.bookText}</p>
            <div className="book-grid">
              <div className="field full"><label htmlFor="f-name">{c.fName}</label><input id="f-name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></div>
              <div className="field"><label htmlFor="f-type">{c.fType}</label>
                <select id="f-type" value={type} onChange={e => setType(e.target.value)}>{c.types.map(t => <option key={t} value={t}>{t}</option>)}</select>
              </div>
              <div className="field"><label htmlFor="f-budget">{c.fBudget}</label>
                <select id="f-budget" value={budget} onChange={e => setBudget(e.target.value)}>{c.budgets.map(b => <option key={b} value={b}>{b}</option>)}</select>
              </div>
              <div className="field full"><label htmlFor="f-comment">{c.fComment}</label><input id="f-comment" value={comment} onChange={e => setComment(e.target.value)} /></div>
            </div>
            <button className="btn btn-wa" type="submit"><WaIcon />{c.send}</button>
            <p className="book-note">{c.bookNote}</p>
          </form>
        </div>
      </div>
      <div className="map-wrap" data-lenis-prevent>
        <iframe src={mapEmbed} title="MIKAVA estate on the map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    </section>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("ru");
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const c = copy[lang];
  const navIds = useMemo(() => ["listings", "services", "about", "process", "reviews", "contacts"], []);
  const socialLinks = [{ label: "Instagram", href: igUrl }, { label: "Telegram", href: tgUrl }, { label: "Facebook", href: fbUrl }];

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <SmoothScroll />
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top"><Mark />MIKAVA<em>estate</em></a>
          <nav className={`nav${open ? " open" : ""}`}>
            {c.nav.map((label, i) => <a key={navIds[i]} href={`#${navIds[i]}`} onClick={() => setOpen(false)}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <div className="languages">
              {(["ru", "en", "ka"] as Lang[]).map(l => <button key={l} className={lang === l ? "active" : ""} onClick={() => { setLang(l); setOpen(false); }} aria-pressed={lang === l}>{l === "ka" ? "GE" : l.toUpperCase()}</button>)}
            </div>
            <a className="header-cta" href={waBase} target="_blank" rel="noopener noreferrer"><WaIcon /><span>{c.cta}</span></a>
            <button className="mobile-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
          </div>
        </div>
      </header>

      <main>
        <HeroVideo c={c.hero} wa={wa(c.waService(c.contacts.bookTitle))} />
        <Listings lang={lang} c={c.listings} wa={s => wa(c.waListing(s))} onPhoto={setLightbox} />
        <Services lang={lang} c={c.services} wa={s => wa(c.waService(s))} />
        <About c={c.about} />
        <Process lang={lang} c={c.process} wa={wa(c.waService(c.contacts.bookTitle))} />
        <WhySection c={c.why} lang={lang} wa={wa(c.waService(c.contacts.bookTitle))} />
        <ReviewsWall lang={lang} c={c.reviews} placeUrl={placeUrl} rating="5.0" />
        <ReelsRail lang={lang} c={c.reels} links={socialLinks} />
        <Subscribe c={c.subscribe} />
        <Contacts c={c.contacts} />
      </main>

      <footer>
        <div className="container footer-inner">
          <a className="brand" href="#top"><Mark />MIKAVA<em>estate</em></a>
          <span>{c.foot} · {c.credits}</span>
          <span className="footer-links"><a href={placeUrl} target="_blank" rel="noopener noreferrer">Google Maps ↗</a><a href={igUrl} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={tgUrl} target="_blank" rel="noopener noreferrer">Telegram ↗</a><a href={fbUrl} target="_blank" rel="noopener noreferrer">Facebook ↗</a></span>
        </div>
      </footer>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setLightbox(null)}>
            <motion.div className="lightbox-img" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} transition={{ duration: 0.2 }} onClick={e => e.stopPropagation()}>
              <Image src={lightbox} alt={listings.find(l => l.photo === lightbox)?.complex ?? ""} fill style={{ objectFit: "contain" }} sizes="100vw" />
              <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

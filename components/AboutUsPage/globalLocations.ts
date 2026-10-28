/**
 * Global Presence data – source: https://www.diaelec-hd.co.jp/en/about/base/
 * Company names & addresses are kept in their official English form (same for every language).
 * Country names / UI labels are translated via i18n: about.global.*
 * If `map` is omitted, a Google Maps search link is generated from the address.
 */

export type Region = "japan" | "global" | "affiliate";

export type CountryKey =
  | "japan"
  | "usa"
  | "hungary"
  | "thailand"
  | "china"
  | "india"
  | "vietnam"
  | "korea"
  | "indonesia";

export interface Office {
  name?: string; // e.g. "Head Office", "Tokyo Branch Office"
  address: string;
  tel?: string;
  fax?: string;
  map?: string;
}

export interface CompanyLocation {
  id: string;
  company: string;
  region: Region;
  country: CountryKey;
  website?: string;
  offices: Office[];
}

export const GLOBAL_LOCATIONS: CompanyLocation[] = [
  /* ───────────── Domestic (Japan) ───────────── */
  {
    id: "deh",
    company: "Diamond Electric Holdings Co., Ltd.",
    region: "japan",
    country: "japan",
    offices: [
      {
        address: "1-15-27, Tsukamoto, Yodogawa-ku, Osaka 532-0026, Japan",
        tel: "+81-6-6302-8211",
        fax: "+81-6-6302-8220",
        map: "https://maps.app.goo.gl/3pqMgcmD92Ljm4g18",
      },
    ],
  },
  {
    id: "dze-mfg",
    company: "Diamond & Zebra Electric Mfg. Co., Ltd.",
    region: "japan",
    country: "japan",
    offices: [
      {
        name: "Head Office",
        address: "1-15-27, Tsukamoto, Yodogawa-ku, Osaka 532-0026, Japan",
        tel: "+81-6-6195-5230",
        fax: "+81-6-6195-5260",
        map: "https://maps.app.goo.gl/3pqMgcmD92Ljm4g18",
      },
      {
        name: "Tokyo Branch Office",
        address: "Kinsan Bldg. 6F, 3-18-3 Kanda, Nishiki-cho, Chiyoda-ku, Tokyo 101-0054, Japan",
        tel: "+81-3-5259-6250",
        fax: "+81-3-5259-6251",
        map: "https://maps.app.goo.gl/EQ4ZoF5ebyoe5WLv8",
      },
      {
        name: "DZ-Lab.",
        address: "2-8-7 Tagawa, Yodogawa-ku, Osaka, 532-0027, Japan",
        tel: "+81-6-6195-5230",
        fax: "+81-6-6195-5260",
        map: "https://goo.gl/maps/xLbj55Zt5NV7mpK26",
      },
      {
        name: "Toyota Sales Office",
        address: "Village Toyota Bldg. 3F, 3-14 Kotobuki-cho, Toyota, Aichi 471-0834, Japan",
        tel: "+81-565-42-8201",
        fax: "+81-565-42-3220",
        map: "https://maps.app.goo.gl/uTCmyW1htb72e53c9",
      },
      {
        name: "Hamamatsu Sales Office",
        address: "4740-1 Takatsuka-cho, Chuo-ku, Hamamatsu, Shizuoka 432-8065, Japan",
        tel: "+81-53-415-0071",
        fax: "+81-53-415-0072",
        map: "https://maps.app.goo.gl/KDPEUjXRj11FJzt37",
      },
    ],
  },
  {
    id: "diamond-denshi",
    company: "Diamond Denshi Mfg. Co., Ltd.",
    region: "japan",
    country: "japan",
    website: "http://www.n-diaelec.co.jp/",
    offices: [
      {
        address: "65-4 Kounosu, Yoshida, Tsubame, Niigata 959-0261, Japan",
        tel: "+81-256-92-5101",
        fax: "+81-256-92-7657",
        map: "https://goo.gl/maps/eHTKqsMz3Bupa7sm7",
      },
    ],
  },
  {
    id: "dem-tottori",
    company: "Diamond Electric Mfg. Co., Ltd.",
    region: "japan",
    country: "japan",
    offices: [
      {
        name: "Factory No.1 & No.2",
        address: "18 Nanei-cho, Tottori 689-1192, Japan",
        tel: "+81-857-53-1121",
        fax: "+81-857-53-1104",
        map: "https://maps.app.goo.gl/CYpEfk8KD1ShLX4w6",
      },
      {
        name: "Factory No.3",
        address: "15 Nanei-cho, Tottori 689-1192, Japan",
        tel: "+81-857-51-7350",
        fax: "+81-857-51-7351",
        map: "https://goo.gl/maps/XQJnhsTRu9SN1tQ77",
      },
    ],
  },
  {
    id: "zebra-denshi",
    company: "Zebra Denshi Co., Ltd.",
    region: "japan",
    country: "japan",
    offices: [
      {
        address: "1-1475 Wakakusa, Otawara, Tochigi, 324-0021, Japan",
        tel: "+81-287-22-3885",
        fax: "+81-287-23-6090",
        map: "https://goo.gl/maps/bUBpscaoe1gXBphY6",
      },
    ],
  },
  {
    id: "diamond-craft",
    company: "Diamond Craft Co., Ltd.",
    region: "japan",
    country: "japan",
    website: "http://www.craft-corp.com/",
    offices: [
      {
        address: "75-1 Omonogawamachi Nankata Ezozuka, Yokote-City, Akita 013-0213, Japan",
        tel: "+81-182-22-5633",
        fax: "+81-182-56-2056",
        map: "https://goo.gl/maps/YABF6aLfQZMCEb9h8",
      },
    ],
  },

  /* ───────────── Global bases ───────────── */
  {
    id: "demc-usa",
    company: "Diamond Electric Mfg. Corporation",
    region: "global",
    country: "usa",
    website: "https://diamond-us.com/",
    offices: [
      {
        name: "West Virginia Head Office",
        address: "Eleanor Industrial Parkway, State Route 62, Eleanor, WV, 25070, U.S.A.",
        tel: "+1-304-586-0070",
        fax: "+1-304-586-0075",
        map: "https://goo.gl/maps/pQwu8KGBjdoWMH4z6",
      },
      {
        name: "Michigan Sales Office",
        address: "23065 Commerce Drive, Farmington Hills, MI 48335, U.S.A.",
        tel: "+1-734-887-6607",
        fax: "+1-734-887-6628",
        map: "https://goo.gl/maps/Xnf4c1VpH29zbVCv7",
      },
    ],
  },
  {
    id: "hungary",
    company: "Diamond Electric Hungary Kft.",
    region: "global",
    country: "hungary",
    website: "https://dportal.diaelec.hu/",
    offices: [
      {
        address: "2500 Esztergom Rubik Erno Utca 1. Hungary",
        tel: "+36-33-542-200",
        fax: "+36-33-542-201",
        map: "https://goo.gl/maps/AAP6S3epKLZemZw56",
      },
    ],
  },
  {
    id: "thai-dze",
    company: "Thai Diamond & Zebra Electric Co., Ltd.",
    region: "global",
    country: "thailand",
    offices: [
      {
        address:
          "88 Moo 5 Debaratna Road, Tambol Bangsamuk, Amphur Bangpakong, Chachoengsao 24130 Thailand",
        tel: "+66-38-538-982",
        fax: "+66-38-538-987",
        map: "https://goo.gl/maps/P8CYjhj7RRxHDXmy7",
      },
    ],
  },
  {
    id: "de-asia-pacific",
    company: "Diamond Electric Asia Pacific Co., Ltd.",
    region: "global",
    country: "thailand",
    offices: [
      {
        name: "Factory",
        address:
          "780 Moo 9, Gateway City Industrial Estate Soi 6, Huasamrong, Plaengyao, Chachoengsao 24190 Thailand",
        tel: "+66-38-086-716",
      },
    ],
  },
  {
    id: "de-craft-thailand",
    company: "DE Diamond Craft (Thailand) Co., Ltd.",
    region: "global",
    country: "thailand",
    offices: [
      {
        address: "122/20 Moo 6, Tambon Bang Phriang, Amphoe Bang Bo, Samut Prakarn, 10560 Thailand",
        tel: "+66(0)2-170-8282",
        fax: "+66(0)2-170-9868",
      },
    ],
  },
  {
    id: "dze-shanghai",
    company: "Diamond & Zebra Electric (Shanghai) Co., Ltd.",
    region: "global",
    country: "china",
    offices: [
      {
        address: "Room 202 Building B, No.898 Jiujing Town, Songjiang District, Shanghai, China",
        tel: "+86-21-576-36475",
        fax: "+86-21-576-36852",
        map: "https://goo.gl/maps/RXp93b7nX9p4KxfA7",
      },
    ],
  },
  {
    id: "dem-suzhou",
    company: "Diamond Electric Mfg. (Suzhou) Co., Ltd.",
    region: "global",
    country: "china",
    offices: [
      {
        address: "No.145 YangPu Road, Suzhou Industrial Park 215126 Jiangsu, P.R. China",
        tel: "+86-512-6283-6908",
        fax: "+86-512-6283-6447",
        map: "https://goo.gl/maps/iNTbhc6Pbhhs1dKk6",
      },
    ],
  },
  {
    id: "de-trading-suzhou",
    company: "Diamond Electric International Trading (Suzhou) Co., Ltd.",
    region: "global",
    country: "china",
    offices: [
      {
        address: "No.145 YangPu Road, Suzhou Industrial Park 215126 Jiangsu, P.R. China",
        tel: "+86-512-6818-5150",
        map: "https://goo.gl/maps/d7Lk8nSPiGzjXNZq8",
      },
    ],
  },
  {
    id: "de-india",
    company: "DE Diamond Electric India Pvt. Ltd.",
    region: "global",
    country: "india",
    offices: [
      {
        address:
          "Plot No.38, Sector-5, HSIIDC Growth Centre, Phase-II Bawal, Distt. Rewari, Haryana, India",
        tel: "+91-9053-029816",
        map: "https://goo.gl/maps/CcXMCByMb97rhYVt9",
      },
    ],
  },
  {
    id: "de-craft-mold-india",
    company: "DE Diamond Craft Mold India Pvt. Ltd.",
    region: "global",
    country: "india",
    offices: [
      {
        address:
          "Plot No.116A, 2nd Main Road, Sidco Industrial Estate, Thirumazhisai, Chennai-600124, Tamil Nadu, India",
        tel: "+91-44-2999-3712",
      },
    ],
  },
  {
    id: "dze-vietnam",
    company: "Vietnam Diamond & Zebra Electric Co., Ltd.",
    region: "global",
    country: "vietnam",
    offices: [
      {
        name: "Head Office",
        address:
          "Lot I.3, Dai Dong-Hoan Son Industrial Park, Dai Dong Commune, Bac Ninh Province, Vietnam",
        tel: "+84-2223-847-435",
        fax: "+84-2223-847-437",
        map: "https://goo.gl/maps/PkxXBLDjwqJM3RsP8",
      },
      {
        name: "Hanoi Mini Lab.",
        address: "M Floor, TTC Tower, 19 Duy Tan, Cau Giay Ward, Hanoi City, Vietnam",
        tel: "+84-2432-123-407",
        map: "https://goo.gl/maps/fYYzLJogmFp7F9mU8",
      },
    ],
  },
  {
    id: "de-korea",
    company: "Diamond Electric Korea Co., Ltd.",
    region: "global",
    country: "korea",
    offices: [
      {
        address:
          "Hanshin Intervalley West 1212, Yeoksam-Dong, 322 Teheran-Ro, Gangnam-Gu, Seoul, 06211 Korea",
        tel: "+82-2-2183-1831",
        map: "https://goo.gl/maps/arG1atXYa6k1q1kf8",
      },
    ],
  },
  {
    id: "de-indonesia",
    company: "PT. Diamond Electric Indonesia / PT. Diamond Electric MFG Indonesia",
    region: "global",
    country: "indonesia",
    offices: [
      {
        address:
          "BM Rental Factory, Unit A-2, Jalan Madura Blok L-9, Kawasan Industri MM2100, Ds. Cikedokan, Kec. Cikarang Barat, Kab. Bekasi 17530",
        tel: "+62-21-2214-3052",
        fax: "+62-21-2214-3772",
        map: "https://maps.app.goo.gl/J7Jxm7FMgLkZvcw48",
      },
    ],
  },

  /* ───────────── Affiliated companies ───────────── */
  {
    id: "korea-transformer",
    company: "Korea Transformer Co., Ltd.",
    region: "affiliate",
    country: "korea",
    offices: [
      {
        address: "8th Floor, DDS Building, 415 Siheung-daero, Geumcheon-gu, Seoul, Republic of Korea",
        tel: "+82-2-856-8951",
        fax: "+82-2-864-2456",
        map: "https://goo.gl/maps/4avB5C2gVUnRSF2P8",
      },
    ],
  },
  {
    id: "yantai-dongshan",
    company: "Yantai Dongshan Electric Co., Ltd.",
    region: "affiliate",
    country: "china",
    offices: [
      {
        address: "265323, Qixia Fiber, Yantai City, Shandong Province, China",
        tel: "+86-535-557-3141",
        fax: "+86-535-557-3140",
        map: "https://goo.gl/maps/HoNXtHNdRY9Sab58A",
      },
    ],
  },
  {
    id: "jiangxi-bicai",
    company: "Jiangxi Bicai Zebra Electric Co., Ltd.",
    region: "affiliate",
    country: "china",
    offices: [
      {
        address: "Spring Water Road, Kaipu District, Yichun City, Jiangxi Province, China",
        tel: "+86-795-2170998",
        fax: "+86-795-2170996",
        map: "https://goo.gl/maps/ukR71biRzDAtr79d7",
      },
    ],
  },
];

/** Google Maps link: official link if available, otherwise a search by address */
export const getMapUrl = (office: Office) =>
  office.map ??
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;

/** "+66(0)2-170-8282" -> "+6621708282" */
export const toTelHref = (phone: string) => `tel:${phone.replace("(0)", "").replace(/[^\d+]/g, "")}`;
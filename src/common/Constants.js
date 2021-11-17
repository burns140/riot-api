const URLS = {
    AUTH: "https://auth.riotgames.com/api/v1/authorization",
    ENTITLEMENTS_TOKEN: "https://entitlements.auth.riotgames.com/api/token/v1",
    USER_INFO: "https://auth.riotgames.com/userinfo",
    FETCH_CONTENT: "https://shared.na.a.pvp.net/content-service/v3/content",
    GET_LOADOUT: "https://pd.na.a.pvp.net/personalization/v2/players/puuid/playerloadout",
    GET_STORE: "https://pd.na.a.pvp.net/store/v1/entitlements/puuid",
    GET_ENTITLEMENTS: "https://pd.na.a.pvp.net/store/v1/entitlements/puuid",
    ALL_CONTENT: "https://na.api.riotgames.com/val/content/v1/contents"
};

const CLIENT_VALUES = {
    CLIENT_VERSION: "release-03.09-shipping-13-629826",
    CLIENT_PLATFORM: "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"
}

const HEADER_FIELDS = {
    AUTH: "Authorization",
    ENTITLEMENTS: "X-Riot-Entitlements-JWT",
    CLIENT_VERSION: "X-Riot-ClientVersion",
    CLIENT_PLATFORM: "X-Riot-ClientPlatform",
    RIOT_TOKEN: "X-Riot-Token"
}

const ITEM_TYPE_IDS = {
    AGENTS: "01bb38e1-da47-4e6a-9b3d-945fe4655707",
    CONTRACTS: "f85cb6f7-33e5-4dc8-b609-ec7212301948",
    SPRAYS: "d5f120f8-ff8c-4aac-92ea-f2b5acbe9475",
    BUDDIES: "dd3bf334-87f3-40bd-b043-682a57a8dc3a",
    CARDS: "3f296c07-64c3-494c-923b-fe692a4fa1bd",
    SKINS: "e7c63390-eda7-46e0-bb7a-a6abdacd2433",
    SKIN_VARIANTS: "3ad1b2b2-acdb-4524-852f-954a76ddae0a",
    TITLES: "de7caa6b-adf7-4588-bbd1-143831e786c6"
}

const GUN_IDS = {
    ODIN: "63E6C2B6-4A8E-869C-3D4C-E38355226584",
    ARES: "55D8A0F4-4274-CA67-FE2C-06AB45EFDF58",
    VANDAL: "9C82E19D-4575-0200-1A81-3EACF00CF872",
    BULLDOG: "AE3DE142-4D85-2547-DD26-4E90BED35CF7",
    PHANTOM: "EE8E8D15-496B-07AC-E5F6-8FAE5D4C7B1A",
    JUDGE: "EC845BF4-4F79-DDDA-A3DA-0DB3774B2794",
    BUCKY: "910BE174-449B-C412-AB22-D0873436B21B",
    FRENZY: "44D4E95C-4157-0037-81B2-17841BF2E8E3",
    CLASSIC: "29A0CFAB-485B-F5D5-779A-B59F85E204A8",
    GHOST: "1BAA85B4-4C70-1284-64BB-6481DFC3BB4E",
    SHERIFF: "E336C6B8-418D-9340-D77F-7A9E4CFE0702",
    SHORTY: "42DA8CCC-40D5-AFFC-BEEC-15AA47B42EDA",
    OPERATOR: "A03B24D3-4319-996D-0F8C-94BBFBA1DFC7",
    GUARDIAN: "4ADE7FAA-4CF1-8376-95EF-39884480959B",
    MARSHAL: "C4883E50-4494-202C-3EC3-6B8A9284F00B",
    SPECTRE: "462080D1-4035-2937-7C09-27AA2A5C27A7",
    STINGER: "F7E1B454-4AD4-1063-EC0A-159E56B58941",
    MELEE: "2F59173C-4BED-B6C3-2191-DEA9B58BE9C7"
}

const GUN_NAMES = {
    ODIN: "Odin",
    ARES: "Ares",
    VANDAL: "Vandal",
    BULLDOG: "Bulldog",
    PHANTOM: "Phantom",
    JUDGE: "Judge",
    BUCKY: "Bucky",
    FRENZY: "Frenzy",
    CLASSIC: "Classic",
    GHOST: "Ghost",
    SHERIFF: "Sheriff",
    SHORTY: "Shorty",
    OPERATOR: "Operator",
    GUARDIAN: "Guardian",
    MARSHAL: "Marshal",
    SPECTRE: "Spectre",
    STINGER: "Stinger",
    MELEE: "Melee"
}

const GUN_ID_TO_NAME_MAP = {
    [GUN_IDS.ODIN]: GUN_NAMES.ODIN,
    [GUN_IDS.ARES]: GUN_NAMES.ARES,
    [GUN_IDS.VANDAL]: GUN_NAMES.VANDAL,
    [GUN_IDS.BULLDOG]: GUN_NAMES.BULLDOG,
    [GUN_IDS.PHANTOM]: GUN_NAMES.PHANTOM,
    [GUN_IDS.JUDGE]: GUN_NAMES.JUDGE,
    [GUN_IDS.BUCKY]: GUN_NAMES.BUCKY,
    [GUN_IDS.FRENZY]: GUN_NAMES.FRENZY,
    [GUN_IDS.CLASSIC]: GUN_NAMES.CLASSIC,
    [GUN_IDS.GHOST]: GUN_NAMES.GHOST,
    [GUN_IDS.SHERIFF]: GUN_NAMES.SHERIFF,
    [GUN_IDS.SHORTY]: GUN_NAMES.SHORTY,
    [GUN_IDS.OPERATOR]: GUN_NAMES.OPERATOR,
    [GUN_IDS.GUARDIAN]: GUN_NAMES.GUARDIAN,
    [GUN_IDS.MARSHAL]: GUN_NAMES.MARSHAL,
    [GUN_IDS.SPECTRE]: GUN_NAMES.SPECTRE,
    [GUN_IDS.STINGER]: GUN_NAMES.STINGER,
    [GUN_IDS.MELEE]: GUN_NAMES.MELEE
}

const GUN_NAME_TO_ID_MAP = {
    
}

module.exports.URLS = URLS;
module.exports.CLIENT_VALUES = CLIENT_VALUES;
module.exports.HEADER_FIELDS = HEADER_FIELDS;
module.exports.ITEM_TYPE_IDS = ITEM_TYPE_IDS;
module.exports.GUN_IDS = GUN_IDS;
module.exports.GUN_NAMES = GUN_NAMES;
module.exports.GUN_ID_TO_NAME_MAP = GUN_ID_TO_NAME_MAP;
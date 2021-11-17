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

module.exports.URLS = URLS;
module.exports.CLIENT_VALUES = CLIENT_VALUES;
module.exports.HEADER_FIELDS = HEADER_FIELDS;
module.exports.ITEM_TYPE_IDS = ITEM_TYPE_IDS;
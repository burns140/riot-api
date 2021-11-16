const URLS = {
    AUTH: "https://auth.riotgames.com/api/v1/authorization",
    ENTITLEMENTS: "https://entitlements.auth.riotgames.com/api/token/v1",
    USER_INFO: "https://auth.riotgames.com/userinfo",
    FETCH_CONTENT: "https://shared.na.a.pvp.net/content-service/v3/content",
    GET_LOADOUT: "https://pd.na.a.pvp.net/personalization/v2/players/puuid/playerloadout",
    GET_STORE: "https://pd.na.a.pvp.net/store/v1/entitlements/puuid"
};

const CLIENT_VALUES = {
    CLIENT_VERSION: "release-03.09-shipping-13-629826",
    CLIENT_PLATFORM: "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"
}

const HEADER_FIELDS = {
    AUTH: "Authorization",
    ENTITLEMENTS: "X-Riot-Entitlements-JWT",
    CLIENT_VERSION: "X-Riot-ClientVersion",
    CLIENT_PLATFORM: "X-Riot-ClientPlatform"
}

module.exports.URLS = URLS;
module.exports.CLIENT_VALUES = CLIENT_VALUES;
module.exports.HEADER_FIELDS = HEADER_FIELDS;
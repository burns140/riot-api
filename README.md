# Randomize guns in valorant
Script that will randomize the skins that you have equipped on your guns in valorant. Note that this will only take effect between games and will not be reflected in the 'Collection' screen unless you close and re-open the game.

# How to Use
To run the script, you navigate to the src folder in any terminal and type 'node main.js' and it should run. You must first assign your username and password for the account authentication, which can be done by going into src/classes/singletons/AuthenticationHandler.js and replacing "YOUR_USERNAME_HERE" and "YOUR_PASSWORD_HERE" with the relevant information.

## Randomizing from subsets of skins
To randomize from a subset of skins, go into src/resources/profiles.json (create this file if it doesn't exist) and create profiles for each gun containing the skin names. You can find the skin names in game. Note that you shouldn't put the gun name as well, only the skin. You will have to put the full weapon name for melee weapons, however.
```json
{
    "Classic": ["Radiant Crisis 001", "Spectrum"],
    "Ares": ["Nunca Olvidados", "Magepunk"],
    "Odin": [],
    "Vandal": ["Glitchpop", "Elderflame"],
    "Bulldog": ["Spectrum", "Nunca Olvidados", "Genesis"],
    "Phantom": ["Spectrum", "Radiant Crisis 001", "Singularity", "Oni"],
    "Judge": [],
    "Bucky": ["Radiant Crisis 001"],
    "Frenzy": ["Nunca Olvidados"],
    "Ghost": ["Ruination"],
    "Sheriff": ["Arcane", "Magepunk"],
    "Shorty": ["Genesis"],
    "Operator": ["Genesis", "Spline", "Magepunk"],
    "Guardian": ["Spectrum", "Magepunk"],
    "Marshal": [],
    "Spectre": ["Forsaken", "Radiant Crisis 001"],
    "Stinger": [],
    "Melee": ["Waveform", "Radiant Crisis 001", "Prime//2.0", "Catrina", "Magepunk Shock Gauntlet"]
}
```

## Randomizing only certain weapons
To randomize only certain weapons, go into src/resources/config.json (create this file if it doesn't exist) and create an array containing the weapon names that you want. Valid values are: 
1. "Classic"
2. "Ares"
3. "Odin"
4. "Vandal"
5. "Bulldog"
6. "Phantom"
7. "Judge"
8. "Bucky"
9. "Frenzy"
10. "Ghost"
11. "Sheriff"
12. "Shorty"
13. "Operator"
14. "Guardian"
15. "Marshal"
16. "Spectre"
17. "Stinger"
18. "Melee"

An example is below

```json
{
    "GUNS_TO_RANDOMIZE": ["Vandal", "Ares", "Melee", "Ghost", "Phantom"]
}
```
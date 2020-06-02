// originally got from https://stackoverflow.com/a/2711936
const DMap = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
  21: 21,
  22: 22,
  23: 23,
  24: 24,
  25: 25,
  26: 26,
  27: 27,
  28: 28,
  29: 29,
  30: 30,
  31: 31,
  32: 32,
  33: 33,
  34: 34,
  35: 35,
  36: 36,
  37: 37,
  38: 38,
  39: 39,
  40: 40,
  41: 41,
  42: 42,
  43: 43,
  44: 44,
  45: 45,
  46: 46,
  47: 47,
  48: 48,
  49: 49,
  50: 50,
  51: 51,
  52: 52,
  53: 53,
  54: 54,
  55: 55,
  56: 56,
  57: 57,
  58: 58,
  59: 59,
  60: 60,
  61: 61,
  62: 62,
  63: 63,
  64: 64,
  65: 65,
  66: 66,
  67: 67,
  68: 68,
  69: 69,
  70: 70,
  71: 71,
  72: 72,
  73: 73,
  74: 74,
  75: 75,
  76: 76,
  77: 77,
  78: 78,
  79: 79,
  80: 80,
  81: 81,
  82: 82,
  83: 83,
  84: 84,
  85: 85,
  86: 86,
  87: 87,
  88: 88,
  89: 89,
  90: 90,
  91: 91,
  92: 92,
  93: 93,
  94: 94,
  95: 95,
  96: 96,
  97: 97,
  98: 98,
  99: 99,
  100: 100,
  101: 101,
  102: 102,
  103: 103,
  104: 104,
  105: 105,
  106: 106,
  107: 107,
  108: 108,
  109: 109,
  110: 110,
  111: 111,
  112: 112,
  113: 113,
  114: 114,
  115: 115,
  116: 116,
  117: 117,
  118: 118,
  119: 119,
  120: 120,
  121: 121,
  122: 122,
  123: 123,
  124: 124,
  125: 125,
  126: 126,
  127: 127,
  1027: 129,
  8225: 135,
  1046: 198,
  8222: 132,
  1047: 199,
  1168: 165,
  1048: 200,
  1113: 154,
  1049: 201,
  1045: 197,
  1050: 202,
  1028: 170,
  160: 160,
  1040: 192,
  1051: 203,
  164: 164,
  166: 166,
  167: 167,
  169: 169,
  171: 171,
  172: 172,
  173: 173,
  174: 174,
  1053: 205,
  176: 176,
  177: 177,
  1114: 156,
  181: 181,
  182: 182,
  183: 183,
  8221: 148,
  187: 187,
  1029: 189,
  1056: 208,
  1057: 209,
  1058: 210,
  8364: 136,
  1112: 188,
  1115: 158,
  1059: 211,
  1060: 212,
  1030: 178,
  1061: 213,
  1062: 214,
  1063: 215,
  1116: 157,
  1064: 216,
  1065: 217,
  1031: 175,
  1066: 218,
  1067: 219,
  1068: 220,
  1069: 221,
  1070: 222,
  1032: 163,
  8226: 149,
  1071: 223,
  1072: 224,
  8482: 153,
  1073: 225,
  8240: 137,
  1118: 162,
  1074: 226,
  1110: 179,
  8230: 133,
  1075: 227,
  1033: 138,
  1076: 228,
  1077: 229,
  8211: 150,
  1078: 230,
  1119: 159,
  1079: 231,
  1042: 194,
  1080: 232,
  1034: 140,
  1025: 168,
  1081: 233,
  1082: 234,
  8212: 151,
  1083: 235,
  1169: 180,
  1084: 236,
  1052: 204,
  1085: 237,
  1035: 142,
  1086: 238,
  1087: 239,
  1088: 240,
  1089: 241,
  1090: 242,
  1036: 141,
  1041: 193,
  1091: 243,
  1092: 244,
  8224: 134,
  1093: 245,
  8470: 185,
  1094: 246,
  1054: 206,
  1095: 247,
  1096: 248,
  8249: 139,
  1097: 249,
  1098: 250,
  1044: 196,
  1099: 251,
  1111: 191,
  1055: 207,
  1100: 252,
  1038: 161,
  8220: 147,
  1101: 253,
  8250: 155,
  1102: 254,
  8216: 145,
  1103: 255,
  1043: 195,
  1105: 184,
  1039: 143,
  1026: 128,
  1106: 144,
  8218: 130,
  1107: 131,
  8217: 146,
  1108: 186,
  1109: 190
};

function unicodeToWin1251(s) {
  const output = [];
  for (let i = 0; i < s.length; i++) {
    const ord = s.charCodeAt(i);
    if (!(ord in DMap)) throw new Error(`Character ${s.charAt(i)} isn't supported by win1251!`);
    output.push(`%${DMap[ord].toString(16)}`);
  }
  return output.join('').toUpperCase();
}

module.exports = unicodeToWin1251;

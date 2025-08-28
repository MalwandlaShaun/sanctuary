// ignore_for_file: constant_identifier_names

enum Country {
  ALGERIA,
  ANGOLA,
  BENIN,
  BOTSWANA,
  BURKINA_FASO,
  BURUNDI,
  CABO_VERDE,
  CAMEROON,
  CENTRAL_AFRICAN_REPUBLIC,
  CHAD,
  COMOROS,
  CONGO,
  DEMOCRATIC_REPUBLIC_OF_THE_CONGO,
  DJIBOUTI,
  EGYPT,
  EQUATORIAL_GUINEA,
  ERITREA,
  ESWATINI,
  ETHIOPIA,
  GABON,
  GAMBIA,
  GHANA,
  GUINEA,
  GUINEA_BISSAU,
  IVORY_COAST,
  KENYA,
  LESOTHO,
  LIBERIA,
  LIBYA,
  MADAGASCAR,
  MALAWI,
  MALI,
  MAURITANIA,
  MAURITIUS,
  MOROCCO,
  MOZAMBIQUE,
  NAMIBIA,
  NIGER,
  NIGERIA,
  RWANDA,
  SAO_TOME_AND_PRINCIPE,
  SENEGAL,
  SEYCHELLES,
  SIERRA_LEONE,
  SOMALIA,
  SOUTH_AFRICA,
  SOUTH_SUDAN,
  SUDAN,
  TANZANIA,
  TOGO,
  TUNISIA,
  UGANDA,
  ZAMBIA,
  ZIMBABWE,
}

extension CountryExtension on Country {
  // Convert enum to JSON string
  String toJson() => name; // enum name as string, e.g., "ALGERIA"

  // Convert JSON string to enum
  static Country? fromJson(String? name) {
    if (name == null) return null;
    try {
      return Country.values.firstWhere(
            (c) => c.name.toUpperCase() == name.toUpperCase(),
      );
    } catch (e) {
      return null; // unknown country
    }
  }
}
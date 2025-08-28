package com.sanctuary.model;

public enum Country {

    ALGERIA("DZ"),
    ANGOLA("AO"),
    BENIN("BJ"),
    BOTSWANA("BW"),
    BURKINA_FASO("BF"),
    BURUNDI("BI"),
    CABO_VERDE("CV"),
    CAMEROON("CM"),
    CENTRAL_AFRICAN_REPUBLIC("CF"),
    CHAD("TD"),
    COMOROS("KM"),
    CONGO("CG"),
    DEMOCRATIC_REPUBLIC_OF_THE_CONGO("CD"),
    DJIBOUTI("DJ"),
    EGYPT("EG"),
    EQUATORIAL_GUINEA("GQ"),
    ERITREA("ER"),
    ESWATINI("SZ"),
    ETHIOPIA("ET"),
    GABON("GA"),
    GAMBIA("GM"),
    GHANA("GH"),
    GUINEA("GN"),
    GUINEA_BISSAU("GW"),
    IVORY_COAST("CI"),
    KENYA("KE"),
    LESOTHO("LS"),
    LIBERIA("LR"),
    LIBYA("LY"),
    MADAGASCAR("MG"),
    MALAWI("MW"),
    MALI("ML"),
    MAURITANIA("MR"),
    MAURITIUS("MU"),
    MOROCCO("MA"),
    MOZAMBIQUE("MZ"),
    NAMIBIA("NA"),
    NIGER("NE"),
    NIGERIA("NG"),
    RWANDA("RW"),
    SAO_TOME_AND_PRINCIPE("ST"),
    SENEGAL("SN"),
    SEYCHELLES("SC"),
    SIERRA_LEONE("SL"),
    SOMALIA("SO"),
    SOUTH_AFRICA("ZA"),
    SOUTH_SUDAN("SS"),
    SUDAN("SD"),
    TANZANIA("TZ"),
    TOGO("TG"),
    TUNISIA("TN"),
    UGANDA("UG"),
    ZAMBIA("ZM"),
    ZIMBABWE("ZW");

    private final String isoCode;

    Country(String isoCode) {
        this.isoCode = isoCode;
    }

    public String getIsoCode() {
        return isoCode;
    }

    public static Country fromCode(String code) {
        for (Country c : values()) {
            if (c.isoCode.equalsIgnoreCase(code)) {
                return c;
            }
        }
        throw new IllegalArgumentException("Unknown ISO code: " + code);
    }

    public static Country fromValue(String name) {
        name = name.toUpperCase().replaceAll(" ","_");
        for (Country c : values()) {
            if (c.name().equalsIgnoreCase(name)) {
                return c;
            }
        }
        return null;
    }

}

package com.sanctuary.util;

import java.io.ByteArrayInputStream;
import java.util.Base64;

public class FileUtil {

    public static ByteArrayInputStream convertBase64ToInputStream(String base64Image) {
        byte[] imageBytes = Base64.getDecoder().decode(base64Image);
        return new ByteArrayInputStream(imageBytes);
    }

}

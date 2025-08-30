import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sanctuary/data/models/user_model.dart';

class UserStorage {
  static const _storage = FlutterSecureStorage();
  static const _userKey = 'user';

  static Future<void> saveUser(UserModel user) async {
    final userJson = jsonEncode(user.toJson());
    await _storage.write(key: _userKey, value: userJson);
  }

  static Future<UserModel?> getStoredUser() async {
    final userJson = await _storage.read(key: _userKey);
    if (userJson == null) return null;
    return UserModel.fromJson(jsonDecode(userJson));
  }

  static Future<void> clearUser() async {
    await _storage.delete(key: _userKey);
  }
}
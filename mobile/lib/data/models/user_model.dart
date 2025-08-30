import 'package:sanctuary/data/models/country.dart';

class UserModel {
  final String id;
  final String fullName;
  final String mobileNo;
  final bool mobileNoVerified;
  final String email;
  final bool emailVerified;
  final String? identityNo;
  final String? passportNo;
  final Country? country;

  UserModel({
    required this.id,
    required this.fullName,
    required this.mobileNo,
    this.mobileNoVerified = false,
    required this.email,
    this.emailVerified = false,
    this.identityNo,
    this.passportNo,
    this.country,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] ?? '',
      fullName: json['fullName'] ?? '',
      mobileNo: json['mobileNo'] ?? '',
      mobileNoVerified: json['mobileNoVerified'] ?? false,
      email: json['email'] ?? '',
      emailVerified: json['emailVerified'] ?? false,
      identityNo: json['identityNo'],
      passportNo: json['passportNo'],
      country: json['country'] != null ? CountryExtension.fromJson(json['country']) : null,
    );
  }

  Map<String, dynamic> toJson() => {
    'fullName': fullName,
    'mobileNo': mobileNo,
    'mobileNoVerified': mobileNoVerified,
    'email': email,
    'emailVerified': emailVerified,
    'identityNo': identityNo,
    'passportNo': passportNo,
    'country': country?.toJson(),
  };
}
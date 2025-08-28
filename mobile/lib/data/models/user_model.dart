import 'package:sanctuary/data/models/country.dart';

class UserModel {
  final String firstName;
  final String lastName;
  final String mobileNo;
  final bool mobileNoVerified;
  final String email;
  final bool emailVerified;
  final String? identityNo;
  final String? passportNo;
  final Country? country;

  UserModel({
    required this.firstName,
    required this.lastName,
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
      firstName: json['firstName'] ?? '',
      lastName: json['lastName'] ?? '',
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
    'firstName': firstName,
    'lastName': lastName,
    'mobileNo': mobileNo,
    'mobileNoVerified': mobileNoVerified,
    'email': email,
    'emailVerified': emailVerified,
    'identityNo': identityNo,
    'passportNo': passportNo,
    'country': country?.toJson(),
  };
}
class CustomerRegisterRequest {
  final String fullName;
  final String password;
  final String email;
  final String mobileNo;
  final String? identityNo;
  final String? passportNo;
  final String country;
  final String role;
  final String profilePictureBase64;
  final String idBookPictureBase64;

  CustomerRegisterRequest({
    required this.fullName,
    required this.password,
    required this.email,
    required this.mobileNo,
    this.identityNo,
    this.passportNo,
    required this.country,
    required this.role,
    required this.profilePictureBase64,
    required this.idBookPictureBase64,
  });

  Map<String, dynamic> toJson() {
    return {
      "fullName": fullName,
      "password": password,
      "email": email,
      "mobileNo": mobileNo,
      "identityNo": identityNo,
      "passportNo": passportNo,
      "country": country,
      "role": role,
      "profilePictureBase64": profilePictureBase64,
      "idBookPictureBase64": idBookPictureBase64,
    };
  }
}
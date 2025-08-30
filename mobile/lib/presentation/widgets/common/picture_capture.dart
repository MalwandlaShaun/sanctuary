import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class PictureCapture extends StatefulWidget {
  final Function(String base64Image) onImageCaptured;

  const PictureCapture({Key? key, required this.onImageCaptured})
      : super(key: key);

  @override
  _ProfilePictureCaptureState createState() => _ProfilePictureCaptureState();
}

class _ProfilePictureCaptureState extends State<PictureCapture> {
  File? _imageFile;

  Future<void> _takePicture() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(
      source: ImageSource.camera, // 📸 Only camera
      maxWidth: 600,
    );

    if (pickedFile != null) {
      final imageFile = File(pickedFile.path);
      final bytes = await imageFile.readAsBytes();
      final base64String = base64Encode(bytes);

      setState(() {
        _imageFile = imageFile;
      });

      // ✅ Pass Base64 image back to parent (e.g., your form)
      widget.onImageCaptured(base64String);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CircleAvatar(
          radius: 50,
          backgroundImage: _imageFile != null ? FileImage(_imageFile!) : null,
          child: _imageFile == null ? Icon(Icons.camera_alt, size: 40) : null,
        ),
        const SizedBox(height: 16),
        ElevatedButton.icon(
          icon: const Icon(Icons.camera),
          label: const Text("Take Picture"),
          onPressed: _takePicture,
        ),
      ],
    );
  }
}

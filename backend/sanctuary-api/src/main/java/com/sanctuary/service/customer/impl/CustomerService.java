package com.sanctuary.service.customer.impl;

import com.sanctuary.dto.customer.request.RegisterCustomer;
import com.sanctuary.exception.throwable.NotAllowedException;
import com.sanctuary.exception.throwable.NotFoundException;
import com.sanctuary.model.Client;
import com.sanctuary.model.Customer;
import com.sanctuary.model.User;
import com.sanctuary.repository.CustomerRepository;
import com.sanctuary.repository.UserRepository;
import com.sanctuary.service.aws.s3.IS3Service;
import com.sanctuary.service.customer.ICustomerService;
import com.sanctuary.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService implements ICustomerService {

    private final UserRepository userRepository;

    private final CustomerRepository customerRepository;

    private final IS3Service s3Service;

    private final IUserService userService;

    @Override
    public void registerCustomer(RegisterCustomer registerCustomer) {

        userService.createUser(registerCustomer);

        User user = userRepository.findByEmail(registerCustomer.getEmail()).orElseThrow(()->new NotFoundException("User not found"));

        String profilePicBase64 = registerCustomer.getProfilePictureBase64();
        String idBookBase64 = registerCustomer.getIdBookPictureBase64();

        String profilePicUrl = s3Service.uploadFileToS3(String.format("customer-documents/%s/%s",user.getId(),"profile_pic.jpg"),profilePicBase64);

        String idDocUrl = s3Service.uploadFileToS3(String.format("customer-documents/%s/%s",user.getId(),"id_doc.jpg"),idBookBase64);

        Customer customer = new Customer();
        customer.setUser(user);
        customer.setProfilePictureUrl(profilePicUrl);
        customer.setIdDocumentPictureUrl(idDocUrl);

        customerRepository.save(customer);

    }


}

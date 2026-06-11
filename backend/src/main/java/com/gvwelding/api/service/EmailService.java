package com.gvwelding.api.service;

import com.gvwelding.api.dto.EnquiryRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${business.email.receiver}")
    private String businessEmail;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendEnquiryToAdmin(EnquiryRequest request) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(businessEmail);
        helper.setSubject("New Welding Enquiry - " + request.getName());

        String content = "<h3>New Enquiry Received</h3>" +
                "<p><b>Name:</b> " + request.getName() + "</p>" +
                "<p><b>Phone:</b> " + request.getPhone() + "</p>" +
                "<p><b>Email:</b> " + request.getEmail() + "</p>" +
                "<p><b>Service:</b> " + request.getService() + "</p>" +
                "<p><b>Message:</b> " + request.getMessage() + "</p>";

        helper.setText(content, true);
        mailSender.send(message);
        log.info("Enquiry email sent to admin: {}", businessEmail);
    }

    public void sendAutoResponseToUser(EnquiryRequest request) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(request.getEmail());
        helper.setSubject("Thank you for contacting GV Welding Works");

        String content = "<div style='font-family: Arial, sans-serif; line-height: 1.6;'>" +
                "<h2>Hello " + request.getName() + ",</h2>" +
                "<p><b>Tamil:</b><br>" +
                "நன்றி! உங்கள் கோரிக்கை பெறப்பட்டுள்ளது. எங்கள் குழு விரைவில் உங்களை தொடர்பு கொள்கிறது.</p>" +
                "<p><b>English:</b><br>" +
                "Thank you! Your request has been received. Our engineering team will contact you shortly.</p>" +
                "<br>" +
                "<p>Best Regards,<br><b>GV Welding Works Team</b></p>" +
                "</div>";

        helper.setText(content, true);
        mailSender.send(message);
        log.info("Auto-response email sent to user: {}", request.getEmail());
    }
}

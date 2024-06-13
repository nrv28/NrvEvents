
const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();
const router = express.Router();
const fs = require('fs');

//------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/mail', async (req, res) => {
    try {
      const { userResponse, company } = req.body;
  
      // Extract client details
      const clientName = userResponse.data.name;
      const clientEmail = userResponse.data.email;
      const clientAddress = userResponse.data.address;
      const clientPhone = userResponse.data.phone;
  
      // Extract partner details
      const partnerName = company.name;
      const partnerEmail = company.email;
      const partnerAddress = company.address;
      const partnerPhone = company.phone;
  
      // URL to view orders (example)
      const orderViewUrl = 'https://example.com/orders'; // Replace with your actual URL
  
      // Create transporter object
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'nirjaykumargupta2017@gmail.com', // Your Gmail address
          pass: process.env.SMTP_PASSKEY, // Your Gmail passkey from .env
        },
      });
  
      // Define email content for client
      const clientMailOptions = {
        from: 'nirjaykumargupta2017@gmail.com',
        to: clientEmail,
        subject: 'Order Successful',
        html: `
          <p>Hello ${clientName},</p>
          <p>Your order has been successfully processed.</p>
          <p>Here are your details:</p>
          <ul>
            <li><strong>Name:</strong> ${partnerName}</li>
            <li><strong>Email:</strong> ${partnerEmail}</li>
            <li><strong>Address:</strong> ${partnerAddress}</li>
            <li><strong>Phone:</strong> ${partnerPhone}</li>
          </ul>
          <p>You can view your order details <a href="${orderViewUrl}" target="_blank">here</a>.</p>
          <p>Thank you for choosing our services. If you have any questions or concerns, feel free to contact us.</p>
          <p>Best regards,<br>Our Company Team</p>
        `,
      };
  
      // Define email content for partner
      const partnerMailOptions = {
        from: 'nirjaykumargupta2017@gmail.com',
        to: partnerEmail,
        subject: 'New Order Notification',
        html: `
          <p>Hello ${partnerName},</p>
          <p>You have received a new order.</p>
          <p>Here are the client details:</p>
          <ul>
            <li><strong>Name:</strong> ${clientName}</li>
            <li><strong>Email:</strong> ${clientEmail}</li>
            <li><strong>Address:</strong> ${clientAddress}</li>
            <li><strong>Phone:</strong> ${clientPhone}</li>
          </ul>
          <p>Please review the order details and proceed accordingly. You can view the order details <a href="${orderViewUrl}" target="_blank">here</a>.</p>
          <p>Best regards,<br>Our Company Team</p>
        `,
      };
  
      // Send emails
      await transporter.sendMail(clientMailOptions);
      await transporter.sendMail(partnerMailOptions);
  
      res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).json({ error: 'Failed to send emails' });
    }
  });
  


// router.post('/paymentmail',(req, res) => {
//     const vehicleNumber = req.body.CaughtPlateNumber;
//     const offenceDate = req.body.DateOfOffense;
//     const offenceAt = req.body.ChallanLocation;           
//     const offenceDetail=req.body.Offense;
//     const amount=req.body.FineAmount;
//     const email = req.body.Email;

    
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             host: "smtp.gmail.com",
//             port: 587,
//             secure: false, // true for 465, false for other ports
//             auth: {
//                 user: "nirjaykumargupta2017@gmail.com", // your Gmail address
//                 pass: "lkhsuncficytalsw", // your Gmail passkey from .env
//             },
//         });

//         const mailOptions = {
//             from: {
//                 name: 'Patna Traffic Police',
//                 address: "nirjaykumargupta2017@gmail.com"
//             },
//             to: [email], // replace with the recipient's email address
//             subject: "Traffic Violation Fine Payment Confirmation",
//             text: `
//             Dear Citizen,
        
//             We are pleased to inform you that your payment for the traffic violation fine has been successfully processed. Below are the details of the resolved violation.
        
//             Violation: ${offenceDetail}
//             Date of Violation: ${offenceDate}
//             Location: ${offenceAt}
//             Vehicle Number: ${vehicleNumber}
        
//             Fine Amount: ₹${amount}
        
//             Your issue has been resolved, and no further action is required regarding this violation. Please ensure that you follow traffic rules to avoid future violations.
        
//             Thank you for your cooperation.
        
//             Sincerely,
//             Patna Traffic Police
        
//             `,
//             html: `
//             <p>Dear Citizen,</p>
        
//             <p>We are pleased to inform you that your payment for the traffic violation fine has been successfully processed. Below are the details of the resolved violation.</p>
        
//             <p><strong>Violation: </strong>${offenceDetail}<br>
//             <strong>Date of Violation: </strong>${offenceDate}<br>
//             <strong>Location: </strong>${offenceAt}</p>
//             <strong>Vehicle Number: </strong>${vehicleNumber}</p>

//             <p><strong>Fine Amount:</strong> ₹${amount}</p>
        
//             <p>Your issue has been resolved, and no further action is required regarding this violation. Please ensure that you follow traffic rules to avoid future violations.</p>
        
//             <p>Thank you for your cooperation.</p>
        
//             <p>Sincerely,<br>
//             Patna Traffic Police</p>
        
//             `
//         };

//         // Function to send email
//         const sendMail = async (mailOptions) => {
//             try {
//                 await transporter.sendMail(mailOptions);
//                 console.log("Email sent");
//                 res.json({ status: "ok" });
            
//             } catch (error) {
//                 console.error("Error sending email:", error);
//                 res.status(400).json({ status: "Payment Email not Sent" });
//             }
//         };

//         sendMail(mailOptions);

//   });



module.exports = router;


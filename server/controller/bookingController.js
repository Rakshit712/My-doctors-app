const stripe = require("stripe");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const Slot = require("../models/slotModel");
const getExpiry = require("../util/getExpiry");

require("dotenv").config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const Stripe = stripe(stripeSecretKey);

async function paymemt(req, res) {
  console.log(req.body);
  try {
    const { expiryDate, cardNumber, cvv, doctorId, slotId } = req.body;
    const expirydate = getExpiry(expiryDate);

    const token = await Stripe.tokens.create({
      card: {
        number: req.body.cardNumber,
        exp_month: expirydate.month,
        exp_year: expirydate.year,
        cvc: req.body.cvv,
      },
    });
    const paymentIntent = await Stripe.paymentIntent.create(
      {
        currency: "INR",
        amount: req.body.consultancyPrice * 100,
        payment_method_data: {
          type: "card",
          card: {
            token: token.id,
          },
        },
      }
    );
    const patientId = req.user.payload.userId;
    if (patientId === doctorId) {
      return res.status(403).json({
        status: "Forbidden",
        message: "Not allowed to create payments",
      }
      )
    }
    else {
      const slotData = await Slot.findOne({ _id: slotId })
      if (slotData) {
        let count = slotData.count + 1;
        await Slot.findOneAndUpdate({ _id: slotId }, { count: count })

      }
      const appointmentBody = { doctorId, slotId, patientId }
      const appointment = Appointment.create(appointmentBody)
      res.status(201).json({
        appointmentId: appointment.Id,
        status: "appointment booked sucessfully",
        payment: "payment sucessfull",
      });
    }
  } catch (error) {
    console.log(error.type);
    if (error.type === "StripeCardError") {
      res.status(427).json({
        name: "invalid-cardNumber-field",
        message: "field `cardNumber` is invalid",
        code: 427,
        className: "InvalidFieldError",
        data: {
          cardNumber: req.body.cardNumber,
          expiryDate: req.body.expiryDate,
          cvv: req.body.cvv,
          slotId: req.body.slotsId,
          doctorId: req.body.doctorId,
        },
        errors: {},
      });
    }
  }
}


module.exports = paymemt;


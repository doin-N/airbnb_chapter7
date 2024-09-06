const { default: mongoose } = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // 어떤 유저가 예약했는지
  user: {
    type: mongoose.Schema.ObjecteId,
    ref: 'User',
    required: true,
  },
  // 장소는 어딘지
  place: {
    type: mongoose.Schema.ObjecteId,
    ref: 'Place',
    required: true,
  },
  // 언제 체크인 할지
  checkIn: {
    type: Data,
    required: true,
  },
  // 언제 체크아웃 할지
  checkOut: {
    type: Data,
    required: true,
  },
  // 예약자 이름
  name: {
    type: String,
    required: true,
  },
  // 예약자 연락처
  phone: {
    type: String,
    required: true,
  },
  // 가격
  price: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

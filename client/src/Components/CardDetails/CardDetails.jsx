import React, { useEffect, useState } from 'react';
import { applyApi, getCardApi, getUserBookingAPi } from '../../Network/card.api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function CardDetails() {
  const [getProducts, setgetProducts] = useState([]);
  const [getUserBookingId, setgetUserBookingId] = useState([]);
  const [bookedCards, setBookedCards] = useState([]);

  async function getCard() {
    await getCardApi("product")
      .then((res) => {
        console.log(res);
        setgetProducts(res.data.data);
      })
      .catch((res) => {});
  }

  async function getUserBooking() {
    await getUserBookingAPi()
      .then((res) => {
        console.log(res);
        setgetUserBookingId(res.data.data);
      })
      .catch((res) => {});
  }

  useEffect(() => {
    getCard();
    getUserBooking();
  }, []);

  useEffect(() => {
    const bookedCardIds = getUserBookingId.map(booking => booking.cardId);
    setBookedCards(bookedCardIds);
  }, [getUserBookingId]);

  async function applyNow(id) {
    await applyApi(id)
      .then((res) => {
        console.log(res);
        toast.success("Event Booked Successfully");
      })
      .catch((res) => {});
  }

  function formatDate(dateString) {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); 
  }


  return (
<section>
  <div className="container d-flex justify-content-center flex-column align-items-center">
    {getProducts.map((card) => (
      <article key={card._id} className="card mt-5 w-100" style={{ maxWidth: '500px' }}>
        <img
          className="card__background"
          src="https://i.imgur.com/QYWAcXk.jpeg"
          alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
        />
        <div className="card__content | flow w-100">
          <div className="card__content--container | flow">
            <h2 className="card__title">{card.title}</h2>
            <p className="card__description mb-0">{card.description}</p>
            <p className="card__price mt-1 mb-1">{card.price} $</p>
            <p className="card__city mt-0 mb-">{card.venue}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-0">
            <p className="createdAt">{formatDate(card.date)}</p>
            <button
              onClick={() => applyNow(card._id)}
              className="add-btn"
              disabled={bookedCards.includes(card._id)}
            >
              {bookedCards.includes(card._id) ? "Booked" : "Book now"}
            </button>
          </div>
        </div>
      </article>
    ))}
  </div>
</section>

  )
}

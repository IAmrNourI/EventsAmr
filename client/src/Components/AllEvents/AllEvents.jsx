import React, { useEffect, useState } from 'react'
import { applyApi, getAllEvents, getUserBookingAPi } from '../../Network/card.api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function AllEvents() {
  const [getProducts, setgetProducts] = useState([]);
  const [getUserBookingId, setgetUserBookingId] = useState([]);
  const [bookedCards, setBookedCards] = useState([]);



async function getCard() {
    await getAllEvents("product")
      .then((res) => {
        console.log(res)
        setgetProducts(res.data.data);
      })
      .catch((res) => {
      });
  }

  async function getUserBooking() {
    await getUserBookingAPi()
      .then((res) => {
        console.log(res);
        setgetUserBookingId(res.data.data);
      })
      .catch((res) => {});
  }

async function applyNow(id) {
  console.log("ID :", id)
  try {
    const res = await applyApi(id);
    toast.success("Event Booked Successfully");

    setBookedCards(prev => [...prev, id]);
  } catch (error) {
    toast.error("Booking failed");
    console.log(error)
  }
}

  

  function formatDate(dateString) {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); 
  }

  useEffect(() => {
    getCard();
    getUserBooking();
  }, []);

  useEffect(() => {
    const bookedCardIds = getUserBookingId.map(booking => booking.cardId);
    setBookedCards(bookedCardIds);
  }, [getUserBookingId]);


  return (
<section>
  <div className="container">
    <div className="row">
      {getProducts.map((card) => (
        <div key={card._id} className="col-md-4"> 
            <div className="center">
              <div className="article-card">
                <div className="content">
                  <p className="date">{formatDate(card.date)}</p>
                  <p className="title">{card.title}</p>

          <div className="btns-hero d-flex">


            <Link to="" className="bt bok me-3 text-decoration-none mt-2">
              <button className="bookBtn" onClick={() => applyNow(card._id)}                       
                      disabled={bookedCards.includes(card._id)}>
                      {bookedCards.includes(card._id) ? "Booked" : "Book now"}
                <span></span>
                <span></span>
                </button>
            </Link>
          </div>
                </div>

                <img src="https://images.unsplash.com/photo-1482877346909-048fb6477632?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=958&q=80" alt="article-cover" />
              </div>
            </div>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}

import React, { useEffect, useState } from 'react'
import { getBookingId, getUserBookingAPi } from '../../Network/card.api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';



export default function MyEvents() {

const [bookedCardsDetails, setBookedCardsDetails] = useState([]);

async function getUserBooking() {
  try {
    const res = await getUserBookingAPi();
    const bookings = res.data.data;

    const uniqueCardIds = [...new Set(bookings.map(b => b.cardId))];
    console.log("Unique Card IDs:", uniqueCardIds);

    const detailsPromises = uniqueCardIds.map(async (id) => {
      try {
        const cardRes = await getBookingId(id);
        console.log("Card Details for", id, cardRes);
        return cardRes.data?.data; // ✅ هنا التعديل الصح
      } catch (err) {
        console.error("Error fetching card", id, err);
        return null;
      }
    });

    const cardsDetails = await Promise.all(detailsPromises);
    const filteredDetails = cardsDetails.filter(Boolean); // remove undefined/null
    setBookedCardsDetails(filteredDetails);

    console.log("Final Booked Cards Details:", filteredDetails);
  } catch (err) {
    console.error("Error fetching booked cards", err);
  }

  console.log(bookedCardsDetails)
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

useEffect(() => {
  getUserBooking();
}, []);


  return (
<section>
  <div className="container">
    <div className="row">
      {bookedCardsDetails.map((card) => (
        <div key={card._id} className="col-md-4"> 
            <div class="center">
              <div class="article-card">
                <div class="content">
                  <p class="date">{formatDate(card.date)}</p>
                  <p class="title">{card.title}</p>

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

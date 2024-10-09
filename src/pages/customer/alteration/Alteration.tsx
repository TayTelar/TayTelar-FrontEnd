import { useState, useEffect } from "react";
import "../../../assets/customer/sass/pages/_alteration.scss";
import YourOrders from "../../../components/customer/alteration/YourOrders";
import AvailableDates from "../../../components/customer/alteration/AvailableDates";
import AvailableTime from "../../../components/customer/alteration/AvailableTime";
import AddHomeAddress from "../../../components/customer/alteration/AddHomeAddress";
import AlterationPopUp from "../../../components/customer/alteration/AlterationPopUp";

const Alteration = () => {
  const [isReviewOrder, setIsReviewOrder] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSlotSelected, setIsSlotSelected] = useState(false);
  const [bookedSlotDetails, setBookedSlotDetails] = useState<{
    date: string;
    slot: string;
  } | null>(null);

  const datesWithSlots: { [key: string]: string[] } = {
    "October 06, Sunday": ["10:00 AM", "1:00 PM", "4:00 PM"],
    "October 07, Monday": ["11:00 AM", "2:00 PM", "5:00 PM"],
    "October 09, Wednesday": ["9:00 AM", "12:00 PM", "3:00 PM"],
    "October 10, Thursday": ["10:00 AM", "1:00 PM", "4:00 PM"],
    "October 12, Saturday": ["11:00 AM", "2:00 PM", "5:00 PM"],
    "October 14, Monday": ["9:00 AM", "12:00 PM", "3:00 PM"],
    "October 15, Tuesday": ["10:00 AM", "1:00 PM", "4:00 PM"],
    "October 16, Wednesday": ["11:00 AM", "2:00 PM", "5:00 PM"],
    "October 18, Friday": ["9:00 AM", "12:00 PM", "3:00 PM"],
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setIsSlotSelected(false);
  };

  const handleBookSchedule = () => {
    if (selectedDate && selectedSlot) {
      setBookedSlotDetails({ date: selectedDate, slot: selectedSlot });
      setIsPopupVisible(true);
    }
  };

  const [bookedSlots, _setBookedSlots] = useState<{ [key: string]: string[] }>({
    "October 06, Sunday": ["10:00 AM"],
    "October 10, Thursday": ["1:00 PM"],
    "October 12, Saturday": ["11:00 AM"],
  });

  const handleSelectSlot = (slot: string) => {
    if (selectedDate && bookedSlots[selectedDate]?.includes(slot)) {
      setBookedSlotDetails({ date: selectedDate, slot });
      setIsPopupVisible(true);
    } else {
      setSelectedSlot(slot);
      setIsSlotSelected(true);
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setBookedSlotDetails(null);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 450);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 450);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const alternateSteps = [
    " Review your recent order and identify the formal pants you wish to have altered.",
    "Choose a convenient date and time for your fitting service using our interactive calendar.",
    "Confirm your address and access details for the alteration team. You’ll get a confirmation after selecting a time slot.",
    "On your appointment day, our team will alter your pants. Try them on afterward and request any adjustments if needed.",
  ];

  return (
    <div className="alteration">
      <>
        <p>Guide for the doorstep alteration</p>
        {isSmallScreen ? (
          <ol className="alternate-list visible">
            {alternateSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <ol>
            <li>
              Review your recent order and identify the formal pants you wish to
              have altered.
            </li>
            <li>
              Select a convenient date and time for your fitting service. Our
              interactive calendar will display available time slots based on
              your selected date.
            </li>
            <li>
              Please ensure your address is accurate so the alteration team can
              reach you without any issues. If you live in an apartment building
              or have special access instructions, be sure to include those
              details. After selecting your preferred time slot, you will
              receive a confirmation message.
            </li>
            <li>
              On the day of your appointment, our professional alteration team
              will arrive at your location and will assess the pants and carry
              out the alterations. After the alterations are completed, try on
              the pants to ensure they fit as desired. If any adjustments are
              needed, communicate this to the team, and they’ll make the
              necessary changes.
            </li>
          </ol>
        )}
        <div className="button-container">
          <button onClick={() => setIsReviewOrder(true)}>Review Order</button>
        </div>
      </>
      {isReviewOrder && (
        <YourOrders onCheckAvailability={() => setIsAvailable(true)} />
      )}
      {isAvailable && (
        <AvailableDates
          datesWithSlots={datesWithSlots}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
        />
      )}
      {selectedDate && (
        <AvailableTime
          date={selectedDate}
          slots={datesWithSlots[selectedDate]}
          bookedSlots={bookedSlots[selectedDate] || []}
          selectedSlot={selectedSlot}
          onSelectSlot={handleSelectSlot}
        />
      )}
      {isSlotSelected && <AddHomeAddress onBookSchedule={handleBookSchedule} />}
      {isPopupVisible && bookedSlotDetails && (
        <AlterationPopUp
          date={bookedSlotDetails.date}
          slot={bookedSlotDetails.slot}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default Alteration;

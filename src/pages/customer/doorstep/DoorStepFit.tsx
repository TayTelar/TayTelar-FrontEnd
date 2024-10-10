import "../../../assets/customer/sass/pages/_doorstep.scss";
import { useState, useEffect } from "react";
import SlotAvailable from "../../../components/customer/doorstep/SlotAvailable";
import AvailableTimeSlots from "../../../components/customer/doorstep/AvailableTimeSlots";
import HomeAddress from "../../../components/customer/doorstep/HomeAddress";
import ConfirmationPopup from "../../../components/customer/doorstep/ConfirmationPopup";

const DoorStepFit = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isSlotSelected, setIsSlotSelected] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [bookedSlotDetails, setBookedSlotDetails] = useState<{
    date: string;
    slot: string;
  } | null>(null);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 450);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 450);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const alternateSteps = [
    "Your Pincode is confirmed, and our at-home fitting service is available in your area.",
    "Choose a convenient date and time for your fitting service using our interactive calendar.",
    "On your selected date, our team will visit your home for precise measurements and to showcase our pant designs.",
    "Once you finalize your designs, our skilled tailors will create your custom pants and deliver them right to your doorstep!",
  ];

  return (
    <div className="doorstep__container">
      <>
        <p>The Steps to Your Perfect Fit</p>
        {isSmallScreen ? (
          <ol className="alternate-list visible">
            {alternateSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <ol>
            <li>
              You’ve successfully entered your Pincode, and we’ve confirmed that
              our at-home fitting service is available in your area.
            </li>
            <li>
              Select a convenient date and time for your fitting service. Our
              interactive calendar will display available time slots based on
              your selected date.
            </li>
            <li>
              On your chosen date, our professional team will visit your home to
              take precise measurements and explore our catalog of pant designs.
            </li>
            <li>
              After finalizing your design choices, our skilled tailors will
              create your custom pants, delivered directly to your doorstep!
            </li>
          </ol>
        )}
        <div className="button-container">
          <button onClick={() => setIsAvailable(true)}>
            Check Availability
          </button>
        </div>
      </>
      {isAvailable && (
        <SlotAvailable
          datesWithSlots={datesWithSlots}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
        />
      )}

      {selectedDate && (
        <AvailableTimeSlots
          date={selectedDate}
          slots={datesWithSlots[selectedDate]}
          bookedSlots={bookedSlots[selectedDate] || []}
          selectedSlot={selectedSlot}
          onSelectSlot={handleSelectSlot}
        />
      )}
      {isSlotSelected && <HomeAddress onBookSchedule={handleBookSchedule} />}
      {isPopupVisible && bookedSlotDetails && (
        <ConfirmationPopup
          date={bookedSlotDetails.date}
          slot={bookedSlotDetails.slot}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default DoorStepFit;

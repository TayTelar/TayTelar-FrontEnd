import "../../../assets/customer/sass/pages/_doorstep.scss";
import { useState } from "react";
import SlotAvailable from "./SlotAvailable";
import AvailableTimeSlots from "./AvailableTimeSlots";
import HomeAddress from "./HomeAddress";
import ConfirmationPopup from "./ConfirmationPopup";

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

  return (
    <div className="doorstep__container">
      <>
        <p>The Steps to Your Perfect Fit</p>
        <ol>
          <li>
            You’ve successfully entered your Pincode, and we’ve confirmed that
            our at-home fitting service is available in your area. You’re all
            set to proceed!
          </li>
          <li>
            Select a convenient date and time for your fitting service. Our
            interactive calendar will display available time slots based on your
            selected date, allowing you to choose what works best for you.
          </li>
          <li>
            On your chosen date, our professional team will visit your home to
            take precise measurements and during this visit you’ll have the
            chance to explore our exclusive catalog of pant designs and sample
            fabrics.
          </li>
          <li>
            After taking your measurements and finalizing your design choices,
            our skilled tailors will create your custom pants. Once your pants
            are ready, we’ll deliver them directly to your doorstep, so you can
            enjoy your new look without any hassle!
          </li>
        </ol>
        <button onClick={() => setIsAvailable(true)}>Check Availability</button>
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

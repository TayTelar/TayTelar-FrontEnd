import "../../../assets/customer/sass/components/_timeslots.scss";

interface AvailableTimeSlotsProps {
  date: string;
  slots: string[];
  bookedSlots: string[];
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
}

const AvailableTimeSlots: React.FC<AvailableTimeSlotsProps> = ({
  date,
  slots,
  bookedSlots,
  selectedSlot,
  onSelectSlot,
}) => {
  return (
    <div className="available-time-slots">
      <p>Available Time Slots for {date}</p>
      <ul>
        {slots.map((slot, index) => {
          const isBooked = bookedSlots.includes(slot);
          const isSelected = slot === selectedSlot;
          return (
            <li
              key={index}
              className={`${isBooked ? "booked" : ""} ${
                isSelected ? "selected" : ""
              }`}
              onClick={isBooked ? undefined : () => onSelectSlot(slot)}
            >
              {slot}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AvailableTimeSlots;

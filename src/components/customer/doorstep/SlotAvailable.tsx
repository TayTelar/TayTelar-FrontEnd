import "../../../assets/customer/sass/components/_slots.scss";

interface SlotAvailableProps {
  datesWithSlots: { [key: string]: string[] };
  onDateClick: (date: string) => void;
  selectedDate: string | null;
}

const SlotAvailable: React.FC<SlotAvailableProps> = ({
  datesWithSlots,
  onDateClick,
  selectedDate,
}) => {
  return (
    <div className="slot-available">
      <div className="slot-available-content">
        <p>Next Availability Dates</p>
        <ul>
          {Object.keys(datesWithSlots).map((date) => (
            <li
              key={date}
              onClick={() => onDateClick(date)}
              className={date === selectedDate ? "selected-date" : ""}
            >
              {date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SlotAvailable;

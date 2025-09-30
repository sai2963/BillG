const DateHeader = ({date,billsByDate}) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4 text-blue-600">
        {date} ({billsByDate[date].length} bills)
      </h2>
    </>
  );
};
export default DateHeader;
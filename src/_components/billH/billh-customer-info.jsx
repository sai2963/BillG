const CustomerInfo = ({bill}) => {
  return (
    <>
      {bill.customer && (
        <div className="mb-3">
          <p>
            <strong>Customer:</strong> {bill.customer.name}
          </p>
          <p>
            <strong>Phone:</strong> {bill.customer.mobileNumber}
          </p>
        </div>
      )}
    </>
  );
};
export default CustomerInfo;
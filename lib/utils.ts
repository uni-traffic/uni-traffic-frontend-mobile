const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

const getStatusStyle = (status: string) => {
  const formattedStatus = status.toUpperCase();

  switch (formattedStatus) {
    case "APPROVED":
      return { backgroundColor: "rgb(21,179,57)", color: "#ffffff" };
    case "REJECTED":
      return { backgroundColor: "rgb(255,0,0)", color: "#ffffff" };
    default:
      return { backgroundColor: "rgb(243,182,27)", color: "#ffffff" };
  }
};

const formatStatus = (status: string) => {
  const formattedStatus = status.toUpperCase();

  switch (formattedStatus) {
    case "APPROVED":
      return "Approved";
    case "PENDING_FOR_STICKER":
      return "Pending Sticker";
    case "PENDING_FOR_PAYMENT":
      return "Pending Payment";
    case "PENDING_FOR_SECURITY_APPROVAL":
      return "Pending Approval";
    case "REJECTED":
      return "Rejected";
    default:
      return "Pending";
  }
};

export { formatDate, formatStatus, getStatusStyle };

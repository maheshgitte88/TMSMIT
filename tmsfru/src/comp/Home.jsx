import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import DepartmentTickets from "./DepartmentTickets";
function Home() {
  const [data, setData] = useState([]);
  const [closedCount, setClosedCount] = useState(0);
  const [openCount, setOpenCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Assuming user is a string key for localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Parse the JSON string

  function fetchTicketData() {
    if (user) {
      const dpId = user.DepartmentID;
      const SubDapId = user.SubDepartmentID;
      axios
        .get(`http://localhost:2000/department/${dpId}/${SubDapId}`)
        .then((response) => {
          setData(response.data.tickets);
          console.log(response.data, 16);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }
  useEffect(() => {
    // Count tickets based on their status
    const counts = data.reduce(
      (acc, ticket) => {
        if (ticket.Status === "Closed") {
          acc.closedCount++;
        } else if (ticket.Status === "Open") {
          acc.openCount++;
        } else if (ticket.Status === "Resolve") {
          acc.resolvedCount++;
        }
        return acc;
      },
      { closedCount: 0, openCount: 0, resolvedCount: 0 }
    );
    setClosedCount(counts.closedCount);
    setOpenCount(counts.openCount);
    setResolvedCount(counts.resolvedCount);
  }, [data]);
  useEffect(() => {
    fetchTicketData();
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };
  return (
    <div className="container mx-auto p-1 flex flex-col sm:flex-row text-sm">
      {/* Left Column */}
      <div className="sm:w-1/2">
        {/* <div className="p-1 bg-red-400 font-bold text-center">
          <Link to={"Tickets"}>Me ||</Link> <Link to={"Tickets"}> Tickets</Link>
        </div> */}
        {/* Container 1 with 2 cards */}
        <div className="mb-4">
          <h6 className="font-semibold mb-2">Comman Bucket</h6>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <Link to={"Tickets"}>
              <div className="bg-red-200 p-4 rounded shadow flex justify-around hover:bg-blue-400">
                <div>
                  <strong>Ticket</strong>
                  <h5 className="font-semibold">{openCount}</h5>
                </div>
                <i className="bi bi-postcard text-4xl"></i>
              </div>
            </Link>

            <div className="bg-green-200 p-4 rounded shadow flex justify-around hover:bg-green-400">
              <div>
                <strong>My Feedback</strong>
                <h5 className="font-semibold">{closedCount}</h5>
              </div>
              {/* <i className="bi bi-journal-check text-4xl"></i> */}
            </div>
          </div>
        </div>
        <Outlet></Outlet>
        <div className="mb-4">
        <table className={`min-w-full bg-white border border-gray-300 ${selectedTicket ? 'selected-table' : ''}`}>
  <thead>
    <tr>
      <th className="border-b">T-Type</th>
      <th className="border-b">Status</th>
      <th className="border-b">Description</th>
      {/* <th className="border-b">AttachmentUrl</th> */}
      <th className="border-b">From</th>
      <th className="border-b">Depat</th>
      <th className="border-b">RStatus</th>
      <th className="border-b"> RTimestamp</th>
    </tr>
  </thead>
  <tbody>
    {data.map((ticket) => (
      <tr key={ticket.TicketID} onClick={() => handleTicketClick(ticket)} className={`cursor-pointer ${selectedTicket === ticket ? 'selected-row' : ''}`}>
        <td className="border-b">{ticket.TicketType}</td>
        <td className="border-b">{ticket.Status}</td>
        <td className="border-b">{ticket.Description}</td>
        {/* <td className="border-b">{ticket.AttachmentUrl}</td> */}
        <td className="border-b">{ticket.Employee.EmployeeName}</td>
        <td className="border-b">
          {ticket.Employee.Department.DepartmentName}
        </td>
        <td className="border-b">
          {ticket.TicketResolution
            ? ticket.TicketResolution.ResolutionStatus
            : "-"}
        </td>
        <td className="border-b">
          {ticket.TicketResolution
            ? ticket.TicketResolution.ResolutionTimestamp
            : "-"}
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
        {/* <DepartmentTickets data={data} Tstatus={'Open'} /> */}
        <div className="mb-4">
          <h6 className="font-semibold mb-2">Tickets For Me</h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-green-200 p-4 rounded shadow flex justify-around hover:bg-green-400">
              <div>
                <strong>Resolve</strong>
                <h5 className="font-semibold">{resolvedCount}</h5>
              </div>
              <i className="bi bi-journal-check text-4xl"></i>
            </div>

            <div className="bg-pink-200 p-4 rounded shadow flex justify-around hover:bg-pink-400">
              <div>
                <strong>Closed</strong>
                <h5 className="font-semibold">{closedCount}</h5>
              </div>
              <i className="bi bi-journal-check text-4xl"></i>
            </div>
            <div className="bg-purple-200 p-4 rounded shadow">Card 3</div>
            <div className="bg-orange-200 p-4 rounded shadow">Card 4</div>
            <div className="bg-red-200 p-4 rounded shadow">Card 5</div>
            <div className="bg-indigo-200 p-4 rounded shadow">Card 6</div>
          </div>
        </div>

        <div>
          <h6 className="font-semibold mb-2">Tickets raised by me</h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-teal-200 p-4 rounded shadow">Card 1</div>
            <div className="bg-gray-200 p-4 rounded shadow">Card 2</div>
            <div className="bg-cyan-200 p-4 rounded shadow">Card 3</div>
            <div className="bg-lime-200 p-4 rounded shadow">Card 4</div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="sm:w-1/2">

      {selectedTicket && (
          <div className="p-4 bg-gray-100 border border-gray-300">
            <h2 className="font-bold text-2xl mb-4">Ticket Details:</h2>
            <p><strong>Ticket Type:</strong> {selectedTicket.TicketType}</p>
            <p><strong>Status:</strong> {selectedTicket.Status}</p>
            {/* Add more details as needed */}
            <div className="mt-4">
              <h3 className="font-bold text-xl mb-2">Updates:</h3>
              {/* Display updates related to the selected ticket */}
              {selectedTicket.TicketUpdates.map((update) => (
                <div key={update.UpdateID} className="mb-2">
                  <p><strong>Update Status:</strong> {update.UpdateStatus}</p>
                  <p><strong>Description:</strong> {update.UpdateDescription}</p>
                  {/* Add more details as needed */}
                </div>
              ))}
            </div>
            {/* Add a form or UI for sending updates */}
            {/* ... */}
          </div>
        )}


      </div>
    </div>
  );
}

export default Home;

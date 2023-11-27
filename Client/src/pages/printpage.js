// StatementPage.js

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import Analytics from "../components/Analytics";
import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";

const StatementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        // Extracting query parameters from the URL
        const searchParams = new URLSearchParams(location.search);
        const frequency = searchParams.get("frequency");
        const type = searchParams.get("type");

        // Make an API call to fetch transactions based on the provided parameters
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.post("/transections/get-transection", {
          userid: user._id,
          frequency,
          type,
        });

        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [location.search]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "refrence",
    },
  ];
  const handlePrint = () => {
    const content = document.getElementById("pdf-content");

    if (content) {
      try {
        const input = document.getElementById("pdf-content");

        html2pdf(input, {
          margin: 10,
          filename: "expense_tracker_summary.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        });
      } catch (error) {
        console.error("Error generating PDF", error);
      }
    } else {
      console.error("Content element not found");
    }
  };

  return (
    <div>
      {loading && <p>Loading transactions...</p>}
      <div id="pdf-content">
        <h3>TrackItAll</h3>

        <h5>Your Statement</h5>
        <Table columns={columns} dataSource={transactions} />
        <h5>Your Analysis</h5>
        <Analytics allTransections={transactions} />
      </div>
      <button onClick={() => navigate(-1)} className="btn btn-primary">
        Go Back
      </button>
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={handlePrint}>
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default StatementPage;

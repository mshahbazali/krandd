import React from "react";
import { Table, Button } from "antd";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import { useState } from "react";

export default function App() {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Birth Day",
      dataIndex: "birthdate",
      key: "birthdate",
    },
    {
      title: "Employed",
      dataIndex: "isEmployed",
      key: "isEmployed",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (e)=> e.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
  ];
  

  // Sample data for demonstration purposes
  const dataSource = [
    {
      id: 1,
      name: "John Doe",
      birthdate: "1985-10-15",
      isEmployed: "true",
      salary: 5000.5,
      currency: "USD",
      createdAt: "1985-10-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      birthdate: "1990-07-20",
      isEmployed: "false",
      salary: 0,
      currency: "EUR",
      createdAt: "1985-10-15"
    },
    {
      id: 3,
      name: "Michael Johnson",
      birthdate: "1978-03-05",
      isEmployed: "true",
      salary: 7500.25,
      currency: "GBP",
      createdAt: "1985-10-15"
    },
    {
      id: 4,
      name: "Sarah Williams",
      birthdate: "1992-12-08",
      isEmployed: "true",
      salary: 4000.75,
      currency: "USD",
      createdAt: "1985-10-15"
    },
    {
      id: 5,
      name: "David Brown",
      birthdate: "1989-05-25",
      isEmployed: "false",
      salary: 0,
      currency: "EUR",
      createdAt: "1985-10-15"
    },
    {
      id: 6,
      name: "Emily Davis",
      birthdate: "1995-09-03",
      isEmployed: "true",
      salary: 6000.3,
      currency: "GBP",
      createdAt: "1985-10-15"
    },
    {
      id: 7,
      name: "Matthew Wilson",
      birthdate: "1982-06-18",
      isEmployed: "true",
      salary: 5500.6,
      currency: "USD",
      createdAt: "1985-10-15"
    },
    {
      id: 8,
      name: "Olivia Taylor",
      birthdate: "1987-01-12",
      isEmployed: "true",
      salary: 4800.8,
      currency: "EUR",
      createdAt: "1985-10-15"
    },
    {
      id: 9,
      name: "Daniel Martinez",
      birthdate: "1976-11-27",
      isEmployed: "false",
      salary: 0,
      currency: "GBP",
      createdAt: "1985-10-15"
    },
    {
      id: 10,
      name: "Sophia Anderson",
      birthdate: "1993-04-07",
      isEmployed: "true",
      salary: 7000.4,
      currency: "USD",
      createdAt: "1985-10-15"
    },
    {
      id: 11,
      name: "Jacob Thomas",
      birthdate: "1984-08-31",
      isEmployed: "true",
      salary: 5200.7,
      currency: "EUR",
      createdAt: "1985-10-15"
    },
    {
      id: 12,
      name: "Ava Rodriguez",
      birthdate: "1991-02-19",
      isEmployed: "false",
      salary: 0,
      currency: "GBP",
      createdAt: "1985-10-15"
    },
    {
      id: 13,
      name: "William Martinez",
      birthdate: "1981-07-24",
      isEmployed: "true",
      salary: 6800.95,
      currency: "USD",
      createdAt: "1985-10-15"
    },
    {
      id: 14,
      name: "Mia Clark",
      birthdate: "1988-03-10",
      isEmployed: "true",
      salary: 4400.55,
      currency: "EUR",
      createdAt: "1985-10-15"
    },
    {
      id: 15,
      name: "James Lewis",
      birthdate: "1994-10-05",
      isEmployed: "false",
      salary: 0,
      currency: "GBP",
      createdAt: "1985-10-15"
    },
    {
      id: 16,
      name: "Charlotte Turner",
      birthdate: "1983-05-23",
      isEmployed: "true",
      salary: 5800.2,
      currency: "USD",
      createdAt: "1985-10-15"
    },
    {
      id: 17,
      name: "Benjamin Scott",
      birthdate: "1986-12-13",
      isEmployed: "true",
      salary: 5200.35,
      currency: "EUR",
      createdAt: "1985-10-15"
    },
    {
      id: 18,
      name: "Amelia Hill",
      birthdate: "1979-08-08",
      isEmployed: "false",
      salary: 0,
      currency: "GBP",
      createdAt: "1985-10-15"
    },
    {
      id: 19,
      name: "Alexander Young",
      birthdate: "1996-03-02",
      isEmployed: "true",
      salary: 6300.45,
      currency: "USD",
      createdAt: "1985-10-15"
    },
    {
      id: 20,
      name: "Ella Phillips",
      birthdate: "1980-09-17",
      isEmployed: "true",
      salary: 4700.65,
      currency: "EUR",
      createdAt: "1985-10-15"
    },
  ];

  const handleExportExcel = () => {
    const keysToExport = columns.filter(column => column.dataIndex).map(column => column.dataIndex);
    const dataToExport = data.map(item => {
      const filteredItem = {};
      keysToExport.forEach(key => {
        if (key === "salary") {
          filteredItem[key] = item[key].toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          });
        } else {
          filteredItem[key] = item[key];
        }
      });
      return filteredItem;
    });
  
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(dataBlob, "tableData.xlsx");
  };
  
  const handleExportCSV = () => {
    const keysToExport = columns.filter(column => column.dataIndex).map(column => column.dataIndex);
    const csvData = [];
    csvData.push(keysToExport.join(","));
  
    // Push each row of data
    data.forEach((item) => {
      const row = keysToExport.map((key) => {
        if (key === "salary") {
          return item[key].toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          });
        }
        return item[key];
      });
      csvData.push(row.join(","));
    });
  
    // Create a CSV file and trigger download
    const csvContent = csvData.join("\n");
    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(csvBlob, "tableData.csv");
  };
  
  React.useEffect(() => {
    // Fetch or update your data and store it in the 'data' state
    setData(dataSource);
  }, []);
  return (
    <div style={{margin: 20}}>
      <div style={{marginBottom: 20}}>
      <Button onClick={handleExportExcel}>Export to Excel</Button>
      <Button onClick={handleExportCSV}>Export to CSV</Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

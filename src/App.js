import html2pdf from "html2pdf.js";
import React, { useRef, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const PDFButton = () => {
  const componentRef = useRef();
  const [view, setView] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const generatePDF = async () => {
    const opt = {
      margin: 10,
      filename: "example.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
    };

    const element = componentRef.current;

    html2pdf().set(opt).from(element).save();
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
      {view ? (
        <div>
          <Document
            file="https://jsoncompare.org/LearningContainer/SampleFiles/PDF/sample-pdf-download-10-mb.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      ) : (
        <div>
          {" "}
          <div
            width="90%"
            style={{ padding: "12px" }}
            id="pack"
            ref={componentRef}
          >
            <div>
              {/* <img src={Logo} height="70px" width="90px" /> */}
              <h4 style={{ textAlign: "center" }}>Packing List</h4>
              <Row gutter={24} style={{ marginTop: "10px" }}>
                <Col sm={8}>
                  <div>
                    <strong>Shipped From</strong>
                  </div>
                  <div>Medics</div>
                  <div>Address</div>
                  <div>Karachi, Sindh 72386</div>
                </Col>
                <Col sm={7}></Col>
                <Col sm={8}>
                  <div>
                    <strong>Shipped To</strong>
                  </div>
                  <div>
                    <span>Shahbaz</span> <span>Ali</span>
                  </div>
                  <div>Address</div>
                  <div>Karachi, Sindh 758503</div>
                </Col>
              </Row>
              <Row gutter={24} style={{ marginTop: 40 }}>
                <Col sm={8}>
                  <p>Order Number: 34234124</p>
                  <div>
                    <div>
                      <strong>Ordered By</strong>
                    </div>
                    Clinician: Jhon Dern
                  </div>
                  <div>Address</div>
                  <div>Karachi, Sindh 25325</div>
                </Col>
                <Col sm={7}></Col>
                <Col sm={8}>
                  <p>Number Of Packages: 1</p>
                  <p>Ship Date: 03/05/2021</p>
                  <p>
                    <span>
                      Tracking #:<small>235235124124</small>
                    </span>
                  </p>
                  <div>Customer #: MS Jhon Devre</div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col sm={24}>
                  <Table
                    dataSource={[]}
                    pagination={false}
                    columns={[
                      {
                        title: "Item Number",
                        dataIndex: "msitem",
                        key: "msitem",
                      },
                      {
                        title: "Item Description",
                        dataIndex: "itemdescription",
                        key: "itemdescription",
                      },
                      {
                        title: "UOM",
                        dataIndex: "_id",
                        key: "_id",
                      },
                      {
                        title: "Ordered",
                        dataIndex: "units",
                        key: "units",
                      },
                      {
                        title: "Shipped",
                        dataIndex: "units",
                        key: "hcpcs",
                      },
                    ]}
                    style={{ marginTop: "30px" }}
                  ></Table>
                </Col>
              </Row>

              <p />
              <p />
              <div>
                <p>
                  The products and/or services provided to you are subject to
                  the supplier standards contained in the Federal regulations
                  shown at 42 Code of Federal Regulations Section 424 57(c).
                </p>
                <p>
                  {" "}
                  These standards can be obtained at{" "}
                  <a href="https://www.ecfr.gov"> https://www.ecfr.gov</a>{" "}
                </p>
                <p>
                  {" "}
                  In acknowledgement of the receipt of the products and services
                  provided by my physician, I hereby agree that my insurance
                  benefits be paid directly to my physician. In addition, I
                  authorize the use of any information required to file
                  insurance claims on my behalf from the prescribing physician
                  and to the insurance carriers.
                </p>
              </div>
            </div>
          </div>
          <button onClick={generatePDF}>Download PDF</button>
          <button onClick={() => setView(true)}>View PDF</button>
        </div>
      )}
    </>
  );
};

export default PDFButton;

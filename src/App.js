import React from "react";
import JsPDF from "jspdf";
import { PDFDocument, StandardFonts } from "pdf-lib";

const PDFButton = () => {
  const generatePDF = async () => {
    // Create a new jsPDF instance
    const report = new JsPDF({
      putOnlyUsedFonts: true,
      orientation: "landscape",
    });

    // Generate the PDF from HTML content
    await report.html(document.querySelector("#report"));

    // Load the PDF file from a URL
    const response = await fetch("./assets/report.pdf");
    const pdfBytes = await response.arrayBuffer();
    console.log(response);
    console.log(pdfBytes);
    // Merge the two PDF files
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const reportPages = await PDFDocument.load(report.output("arraybuffer"));
    const copiedPages = await pdfDoc.copyPages(
      reportPages,
      reportPages.getPageIndices()
    );
    for (let i = 0; i < copiedPages.length; i++) {
      pdfDoc.addPage(copiedPages[i]);
    }

    // Download the merged PDF file

    const mergedPdfBytes = await pdfDoc.save();
    console.log(mergedPdfBytes);
    downloadPdf(mergedPdfBytes, "example.pdf");
    // const mergedPdfDataUri = `data:application/pdf;base64,${btoa(
    //   String.fromCharCode(...new Uint8Array(mergedPdfBytes))
    // )}`;

    // console.log(mergedPdfDataUri);
    // const pdfWindow = window.open();
    // pdfWindow.document.write(
    //   '<iframe width="100%" height="100%" src="' +
    //     mergedPdfDataUri +
    //     '"></iframe>'
    // );
  };
  const downloadPdf = (base64PdfString, filename) => {
    const pdfBlob = new Blob([base64PdfString], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div>
        <table style={{ width: "200px", tableLayout: "fixed" }} id="report">
          <thead>
            <tr>
              <th style={{ width: "10%", fontSize: "10px" }}>Company</th>
              <th style={{ width: "10%", fontSize: "10px" }}>Contact</th>
              <th style={{ width: "10%", fontSize: "10px" }}>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "10%", fontSize: "10px" }}>
                Alfreds Futterkiste
              </td>
              <td style={{ width: "10%", fontSize: "10px" }}>Maria Anders</td>
              <td style={{ width: "10%", fontSize: "10px" }}>Germany</td>
            </tr>
            <tr>
              <td style={{ width: "10%", fontSize: "10px" }}>
                Centro comercial Moctezuma
              </td>
              <td style={{ width: "10%", fontSize: "10px" }}>
                Francisco Chang
              </td>
              <td style={{ width: "10%", fontSize: "10px" }}>Mexico</td>
            </tr>
            <tr>
              <td style={{ width: "10%", fontSize: "10px" }}>Ernst Handel</td>
              <td style={{ width: "10%", fontSize: "10px" }}>Roland Mendel</td>
              <td style={{ width: "10%", fontSize: "10px" }}>Austria</td>
            </tr>
            <tr>
              <td style={{ width: "10%", fontSize: "10px" }}>Island Trading</td>
              <td style={{ width: "10%", fontSize: "10px" }}>Helen Bennett</td>
              <td style={{ width: "10%", fontSize: "10px" }}>UK</td>
            </tr>
            <tr>
              <td style={{ width: "10%", fontSize: "10px" }}>
                Laughing Bacchus Winecellars
              </td>
              <td style={{ width: "10%", fontSize: "10px" }}>
                Yoshi Tannamuri
              </td>
              <td style={{ width: "10%", fontSize: "10px" }}>Canada</td>
            </tr>
            <tr>
              <td style={{ width: "10%", fontSize: "10px" }}>
                Magazzini Alimentari Riuniti
              </td>
              <td style={{ width: "10%", fontSize: "10px" }}>
                Giovanni Rovelli
              </td>
              <td style={{ width: "10%", fontSize: "10px" }}>Italy</td>
            </tr>
          </tbody>
        </table>
        <button onClick={generatePDF}>Download PDF</button>
      </div>
    </>
  );
};

export default PDFButton;

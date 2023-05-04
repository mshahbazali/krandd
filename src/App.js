import React from "react";
import JsPDF from "jspdf";

const PDFButton = () => {
  const generatePDF = () => {
    const report = new JsPDF({
      putOnlyUsedFonts: true,
      orientation: "landscape",
    });
    report.html(document.querySelector("#report")).then(() => {
      const pdfDataUri = report.output("datauristring");
      const pdfWindow = window.open();
      pdfWindow.document.write(
        '<iframe width="100%" height="100%" src="' + pdfDataUri + '"></iframe>'
      );
    });
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

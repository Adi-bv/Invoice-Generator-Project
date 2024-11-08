import { useRef } from "react";
import Createinvoice from "./Createinvoice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Print = () => {
  const invoiceRef = useRef();

  const onButtonClick = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Invoice.pdf");
  };

  return (
    <>
      <div className="invoice" ref={invoiceRef}>
        <div>
          <Createinvoice />
        </div>
        <div>
          <button onClick={onButtonClick} className="btn btn-primary print-btn">
            Print
          </button>
        </div>
      </div>
    </>
  );
};

export default Print;



import styles from "./../../style.module.scss";
import QRCode from "qrcode.react";


function Qr({ value, invalidAddress, ProName }) {
  // Concatenate product name with the address value
  const qrValue = `${value}  `;

  return (
    //<div className>
    <QRCode
      className={styles.Qr}
      value={qrValue} 
      bgColor={"#ffffff"} 
      fgColor={invalidAddress ? "#EF233C" : "#000000"} 
      level={"Q"} // Levels Can be L,M,Q,H Default is L
      includeMargin={false}
      renderAs={"svg"}
     
    />
    
    // </div>
  );
}

export default Qr;

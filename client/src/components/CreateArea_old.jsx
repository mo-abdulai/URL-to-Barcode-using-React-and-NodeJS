import React, { useState } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"


function CreateArea(){

const [url, setUrl] = useState('');
const [barcodeImage, setBarcodeImage] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:8080/generateBarcode', {url}, { responseType: 'arraybuffer' }
   );

    const blob = new Blob([response.data], { type: 'image/png' });
    const barcodeUrl = URL.createObjectURL(blob);
    setBarcodeImage(barcodeUrl);
  } catch (error) {
    console.error(error);
  }
  setUrl("")
};

return (
  <div>
 <div className="container text-center">
 <h1>URL to Barcode Converter</h1>
  <form  onSubmit={handleSubmit}>
  
  <div className="mb-3">
    <input
      type="text"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Enter URL..."
    />
    </div>

    <button className="btn btn-primary" type="submit">Generate Barcode</button>
  </form>

  {barcodeImage && <img src={barcodeImage} alt="Barcode" />}

 </div>

 
</div>
)

}

export default CreateArea;
